import { createApi } from "@reduxjs/toolkit/query/react";
import {
  ChangePasswordRequest,
  DashboardUrlResponse,
  ForgotPasswordRequest,
  LoginRequest,
  LoginResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  ResetPasswordRequest,
  TokenValidationResponse,
  User,
} from "../../../types/auth.types";
import { ApiResponse } from "../../../types/common.types";
import { baseQueryWithReauth } from "../../baseQuery";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User", "Auth"],
  endpoints: (builder) => ({
    login: builder.mutation<ApiResponse<LoginResponse>, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User", "Auth"],
    }),

    refreshToken: builder.mutation<
      ApiResponse<RefreshTokenResponse>,
      RefreshTokenRequest
    >({
      query: (body) => ({
        url: "/auth/refresh-token",
        method: "POST",
        body,
      }),
    }),

    forgotPassword: builder.mutation<ApiResponse, ForgotPasswordRequest>({
      query: (body) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body,
      }),
    }),

    resetPassword: builder.mutation<ApiResponse, ResetPasswordRequest>({
      query: (body) => ({
        url: "/auth/reset-password",
        method: "POST",
        body,
      }),
    }),

    changePassword: builder.mutation<ApiResponse, ChangePasswordRequest>({
      query: (body) => ({
        url: "/auth/change-password",
        method: "POST",
        body,
      }),
    }),

    logout: builder.mutation<ApiResponse, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["User", "Auth"],
    }),

    logoutAll: builder.mutation<ApiResponse, void>({
      query: () => ({
        url: "/auth/logout-all",
        method: "POST",
      }),
      invalidatesTags: ["User", "Auth"],
    }),

    getProfile: builder.query<ApiResponse<User>, void>({
      query: () => "/auth/profile",
      providesTags: ["User"],
    }),

    validateToken: builder.query<ApiResponse<TokenValidationResponse>, void>({
      query: () => "/auth/validate",
      providesTags: ["Auth"],
    }),

    getDashboardUrl: builder.query<ApiResponse<DashboardUrlResponse>, void>({
      query: () => "/auth/dashboard",
      providesTags: ["Auth"],
    }),

    updateProfile: builder.mutation<ApiResponse<User>, Partial<User>>({
      query: (body) => ({
        url: "/auth/profile",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRefreshTokenMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useLogoutMutation,
  useLogoutAllMutation,
  useGetProfileQuery,
  useValidateTokenQuery,
  useGetDashboardUrlQuery,
  useUpdateProfileMutation,
} = authApi;
