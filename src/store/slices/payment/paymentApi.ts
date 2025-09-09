import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { config } from "../../../config/env";
import { ApiResponse, PaginatedResponse } from "../../../types/common.types";
import {
  CreateInvoiceRequest,
  CreatePaymentRequest,
  CreateSubscriptionRequest,
  Invoice,
  Payment,
  PaymentHistory,
  PaymentResponse,
  PaymentStats,
  Subscription,
  SubscriptionStats,
  UpdatePaymentSubscriptionRequest,
  VerifyPaymentRequest,
  VerifyPaymentResponse,
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

export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery,
  tagTypes: ["Payment", "Subscription", "Invoice"],
  endpoints: (builder) => ({
    getPayments: builder.query<ApiResponse<PaginatedResponse<Payment>>, any>({
      query: (params) => ({
        url: "/payments",
        params,
      }),
      providesTags: ["Payment"],
    }),

    getPaymentById: builder.query<ApiResponse<Payment>, string>({
      query: (id) => `/payments/${id}`,
      providesTags: (result, error, id) => [{ type: "Payment", id }],
    }),

    createPayment: builder.mutation<
      ApiResponse<PaymentResponse>,
      CreatePaymentRequest
    >({
      query: (body) => ({
        url: "/payments/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Payment"],
    }),

    verifyPayment: builder.mutation<
      ApiResponse<VerifyPaymentResponse>,
      VerifyPaymentRequest
    >({
      query: (body) => ({
        url: "/payments/verify",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Payment", "Subscription"],
    }),

    getPaymentHistory: builder.query<
      ApiResponse<PaginatedResponse<PaymentHistory>>,
      any
    >({
      query: (params) => ({
        url: "/payments/history",
        params,
      }),
      providesTags: ["Payment"],
    }),

    getPaymentStats: builder.query<ApiResponse<PaymentStats>, void>({
      query: () => "/payments/stats",
      providesTags: ["Payment"],
    }),

    getSubscriptions: builder.query<
      ApiResponse<PaginatedResponse<Subscription>>,
      any
    >({
      query: (params) => ({
        url: "/subscriptions",
        params,
      }),
      providesTags: ["Subscription"],
    }),

    getSubscriptionById: builder.query<ApiResponse<Subscription>, string>({
      query: (id) => `/subscriptions/${id}`,
      providesTags: (result, error, id) => [{ type: "Subscription", id }],
    }),

    createSubscription: builder.mutation<
      ApiResponse<Subscription>,
      CreateSubscriptionRequest
    >({
      query: (body) => ({
        url: "/subscriptions",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Subscription", "Payment"],
    }),

    updateSubscription: builder.mutation<
      ApiResponse<Subscription>,
      { id: string; data: UpdatePaymentSubscriptionRequest }
    >({
      query: ({ id, data }) => ({
        url: `/subscriptions/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Subscription", id },
        "Subscription",
      ],
    }),

    getSubscriptionStats: builder.query<ApiResponse<SubscriptionStats>, void>({
      query: () => "/subscriptions/stats",
      providesTags: ["Subscription"],
    }),

    getInvoices: builder.query<ApiResponse<PaginatedResponse<Invoice>>, any>({
      query: (params) => ({
        url: "/invoices",
        params,
      }),
      providesTags: ["Invoice"],
    }),

    getInvoiceById: builder.query<ApiResponse<Invoice>, string>({
      query: (id) => `/invoices/${id}`,
      providesTags: (result, error, id) => [{ type: "Invoice", id }],
    }),

    createInvoice: builder.mutation<ApiResponse<Invoice>, CreateInvoiceRequest>(
      {
        query: (body) => ({
          url: "/invoices",
          method: "POST",
          body,
        }),
        invalidatesTags: ["Invoice"],
      }
    ),
  }),
});

export const {
  useGetPaymentsQuery,
  useGetPaymentByIdQuery,
  useCreatePaymentMutation,
  useVerifyPaymentMutation,
  useGetPaymentHistoryQuery,
  useGetPaymentStatsQuery,
  useGetSubscriptionsQuery,
  useGetSubscriptionByIdQuery,
  useCreateSubscriptionMutation,
  useUpdateSubscriptionMutation,
  useGetSubscriptionStatsQuery,
  useGetInvoicesQuery,
  useGetInvoiceByIdQuery,
  useCreateInvoiceMutation,
} = paymentApi;
