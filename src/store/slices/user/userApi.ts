import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { config } from "../../../config/env";
import { User } from "../../../types/auth.types";
import { ApiResponse, PaginatedResponse } from "../../../types/common.types";

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

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUsers: builder.query<ApiResponse<PaginatedResponse<User>>, any>({
      query: (params) => ({
        url: "/admin/users",
        params,
      }),
      providesTags: ["User"],
    }),

    getUserById: builder.query<ApiResponse<User>, string>({
      query: (id) => `/admin/users/${id}`,
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),

    createUser: builder.mutation<ApiResponse<User>, any>({
      query: (body) => ({
        url: "/admin/users",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),

    updateUser: builder.mutation<ApiResponse<User>, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `/admin/users/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "User", id },
        "User",
      ],
    }),

    deleteUser: builder.mutation<ApiResponse, string>({
      query: (id) => ({
        url: `/admin/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),

    suspendUser: builder.mutation<ApiResponse, string>({
      query: (id) => ({
        url: `/admin/users/${id}/suspend`,
        method: "POST",
      }),
      invalidatesTags: (result, error, id) => [{ type: "User", id }, "User"],
    }),

    activateUser: builder.mutation<ApiResponse, string>({
      query: (id) => ({
        url: `/admin/users/${id}/activate`,
        method: "POST",
      }),
      invalidatesTags: (result, error, id) => [{ type: "User", id }, "User"],
    }),

    resetUserPassword: builder.mutation<ApiResponse, string>({
      query: (id) => ({
        url: `/admin/users/${id}/reset-password`,
        method: "POST",
      }),
      invalidatesTags: (result, error, id) => [{ type: "User", id }],
    }),

    getUserStats: builder.query<ApiResponse<any>, void>({
      query: () => "/admin/users/stats",
      providesTags: ["User"],
    }),

    getUsersByOrganization: builder.query<
      ApiResponse<PaginatedResponse<User>>,
      string
    >({
      query: (organizationId) => `/admin/organizations/${organizationId}/users`,
      providesTags: ["User"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useSuspendUserMutation,
  useActivateUserMutation,
  useResetUserPasswordMutation,
  useGetUserStatsQuery,
  useGetUsersByOrganizationQuery,
} = userApi;
