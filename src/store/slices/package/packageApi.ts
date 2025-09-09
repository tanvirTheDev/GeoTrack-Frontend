import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { config } from "../../../config/env";
import { ApiResponse, PaginatedResponse } from "../../../types/common.types";
import {
  CreateSubscriptionRequest,
  Package,
} from "../../../types/payment.types";

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

export const packageApi = createApi({
  reducerPath: "packageApi",
  baseQuery,
  tagTypes: ["Package"],
  endpoints: (builder) => ({
    getPackages: builder.query<ApiResponse<PaginatedResponse<Package>>, any>({
      query: (params) => ({
        url: "/packages",
        params,
      }),
      providesTags: ["Package"],
    }),

    getPackageById: builder.query<ApiResponse<Package>, string>({
      query: (id) => `/packages/${id}`,
      providesTags: (result, error, id) => [{ type: "Package", id }],
    }),

    createPackage: builder.mutation<ApiResponse<Package>, any>({
      query: (body) => ({
        url: "/packages",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Package"],
    }),

    updatePackage: builder.mutation<
      ApiResponse<Package>,
      { id: string; data: any }
    >({
      query: ({ id, data }) => ({
        url: `/packages/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Package", id },
        "Package",
      ],
    }),

    deletePackage: builder.mutation<ApiResponse, string>({
      query: (id) => ({
        url: `/packages/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Package"],
    }),

    purchasePackage: builder.mutation<
      ApiResponse<any>,
      CreateSubscriptionRequest
    >({
      query: (body) => ({
        url: "/packages/purchase",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Package"],
    }),
  }),
});

export const {
  useGetPackagesQuery,
  useGetPackageByIdQuery,
  useCreatePackageMutation,
  useUpdatePackageMutation,
  useDeletePackageMutation,
  usePurchasePackageMutation,
} = packageApi;
