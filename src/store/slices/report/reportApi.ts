import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { config } from "../../../config/env";
import { ApiResponse, PaginatedResponse } from "../../../types/common.types";
import {
  DeliveryReport,
  MonthlyReport,
  OrganizationReport,
  ReportFilters,
  ReportSummary,
  UserReport,
} from "../../../types/report.types";

const baseQuery = fetchBaseQuery({
  baseUrl: config.API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    headers.set("content-type", "application/json");
    return headers;
  },
});

export const reportApi = createApi({
  reducerPath: "reportApi",
  baseQuery,
  tagTypes: ["Report"],
  endpoints: (builder) => ({
    getUserReport: builder.query<
      ApiResponse<PaginatedResponse<UserReport>>,
      ReportFilters
    >({
      query: (params) => ({
        url: "/reports/user",
        params,
      }),
      providesTags: ["Report"],
    }),

    getOrganizationReport: builder.query<
      ApiResponse<PaginatedResponse<OrganizationReport>>,
      ReportFilters
    >({
      query: (params) => ({
        url: "/reports/organization",
        params,
      }),
      providesTags: ["Report"],
    }),

    getMonthlyReport: builder.query<
      ApiResponse<PaginatedResponse<MonthlyReport>>,
      ReportFilters
    >({
      query: (params) => ({
        url: "/reports/monthly",
        params,
      }),
      providesTags: ["Report"],
    }),

    getDeliveryReport: builder.query<
      ApiResponse<PaginatedResponse<DeliveryReport>>,
      ReportFilters
    >({
      query: (params) => ({
        url: "/reports/delivery",
        params,
      }),
      providesTags: ["Report"],
    }),

    getReportSummary: builder.query<ApiResponse<ReportSummary>, ReportFilters>({
      query: (params) => ({
        url: "/reports/summary",
        params,
      }),
      providesTags: ["Report"],
    }),

    exportReport: builder.mutation<
      ApiResponse<{ downloadUrl: string }>,
      { type: string; filters: ReportFilters; format: string }
    >({
      query: ({ type, filters, format }) => ({
        url: `/reports/export/${type}`,
        method: "POST",
        body: { filters, format },
      }),
    }),
  }),
});

export const {
  useGetUserReportQuery,
  useGetOrganizationReportQuery,
  useGetMonthlyReportQuery,
  useGetDeliveryReportQuery,
  useGetReportSummaryQuery,
  useExportReportMutation,
} = reportApi;
