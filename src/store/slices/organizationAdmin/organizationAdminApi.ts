import { API_ENDPOINTS } from "@/config/api";
import { createApi } from "@reduxjs/toolkit/query/react";
import {
  CreateOrganizationAdminRequest,
  OrganizationAdminFilters,
  OrganizationAdminResponse,
  ResetPasswordRequest,
  UpdateOrganizationAdminRequest,
  UpdatePermissionsRequest,
} from "../../../types/organizationAdmin.types";
import { baseQueryWithReauth } from "../../baseQuery";
export const organizationAdminApi = createApi({
  reducerPath: "organizationAdminApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["OrganizationAdmin", "OrganizationAdminStats"],
  endpoints: (builder) => ({
    // Get all organization admins with filters
    getOrganizationAdmins: builder.query<
      OrganizationAdminResponse,
      OrganizationAdminFilters
    >({
      query: (filters) => {
        const params = new URLSearchParams();
        if (filters.page) params.append("page", filters.page.toString());
        if (filters.limit) params.append("limit", filters.limit.toString());
        if (filters.search) params.append("search", filters.search);
        if (filters.status) params.append("status", filters.status);
        if (filters.organizationId)
          params.append("organizationId", filters.organizationId);

        return `${API_ENDPOINTS.ORG_ADMINS.BASE}?${params.toString()}`;
      },
      providesTags: ["OrganizationAdmin"],
    }),

    // Get organization admin by ID
    getOrganizationAdminById: builder.query<OrganizationAdminResponse, string>({
      query: (adminId) => `/${adminId}`,
      providesTags: (result, error, adminId) => [
        { type: "OrganizationAdmin", id: adminId },
      ],
    }),

    // Get organization admins by organization
    getOrganizationAdminsByOrganization: builder.query<
      OrganizationAdminResponse,
      {
        organizationId: string;
        page?: number;
        limit?: number;
        search?: string;
        status?: string;
      }
    >({
      query: ({ organizationId, page, limit, search, status }) => {
        const params = new URLSearchParams();
        if (page) params.append("page", page.toString());
        if (limit) params.append("limit", limit.toString());
        if (search) params.append("search", search);
        if (status) params.append("status", status);

        return `${
          API_ENDPOINTS.ORG_ADMINS.BASE
        }/${organizationId}?${params.toString()}`;
      },
      providesTags: (result, error, { organizationId }) => [
        { type: "OrganizationAdmin", id: `org-${organizationId}` },
      ],
    }),

    // Get organization admin statistics
    getOrganizationAdminStats: builder.query<
      OrganizationAdminResponse,
      { organizationId?: string }
    >({
      query: ({ organizationId }) => {
        const params = new URLSearchParams();
        if (organizationId) params.append("organizationId", organizationId);
        return `${API_ENDPOINTS.ORG_ADMINS.BASE}/stats?${params.toString()}`;
      },
      providesTags: ["OrganizationAdminStats"],
    }),

    // Create organization admin
    createOrganizationAdmin: builder.mutation<
      OrganizationAdminResponse,
      CreateOrganizationAdminRequest
    >({
      query: (adminData) => ({
        url: `${API_ENDPOINTS.ORG_ADMINS.BASE}`,
        method: "POST",
        body: adminData,
      }),
      invalidatesTags: ["OrganizationAdmin", "OrganizationAdminStats"],
    }),

    // Update organization admin
    updateOrganizationAdmin: builder.mutation<
      OrganizationAdminResponse,
      { adminId: string; data: UpdateOrganizationAdminRequest }
    >({
      query: ({ adminId, data }) => ({
        url: `${API_ENDPOINTS.ORG_ADMINS.BASE}/${adminId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { adminId }) => [
        "OrganizationAdmin",
        { type: "OrganizationAdmin", id: adminId },
        "OrganizationAdminStats",
      ],
    }),

    // Delete organization admin
    deleteOrganizationAdmin: builder.mutation<
      OrganizationAdminResponse,
      string
    >({
      query: (adminId) => ({
        url: `${API_ENDPOINTS.ORG_ADMINS.BASE}/${adminId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["OrganizationAdmin", "OrganizationAdminStats"],
    }),

    // Suspend organization admin
    suspendOrganizationAdmin: builder.mutation<
      OrganizationAdminResponse,
      string
    >({
      query: (adminId) => ({
        url: `${API_ENDPOINTS.ORG_ADMINS.BASE}/${adminId}/suspend`,
        method: "POST",
      }),
      invalidatesTags: (result, error, adminId) => [
        "OrganizationAdmin",
        { type: "OrganizationAdmin", id: adminId },
        "OrganizationAdminStats",
      ],
    }),

    // Activate organization admin
    activateOrganizationAdmin: builder.mutation<
      OrganizationAdminResponse,
      string
    >({
      query: (adminId) => ({
        url: `${API_ENDPOINTS.ORG_ADMINS.BASE}/${adminId}/activate`,
        method: "POST",
      }),
      invalidatesTags: (result, error, adminId) => [
        "OrganizationAdmin",
        { type: "OrganizationAdmin", id: adminId },
        "OrganizationAdminStats",
      ],
    }),

    // Reset organization admin password
    resetOrganizationAdminPassword: builder.mutation<
      OrganizationAdminResponse,
      { adminId: string; data: ResetPasswordRequest }
    >({
      query: ({ adminId, data }) => ({
        url: `${API_ENDPOINTS.ORG_ADMINS.BASE}/${adminId}/reset-password`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, { adminId }) => [
        { type: "OrganizationAdmin", id: adminId },
      ],
    }),

    // Update organization admin permissions
    updateOrganizationAdminPermissions: builder.mutation<
      OrganizationAdminResponse,
      { adminId: string; data: UpdatePermissionsRequest }
    >({
      query: ({ adminId, data }) => ({
        url: `${API_ENDPOINTS.ORG_ADMINS.BASE}/${adminId}/permissions`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { adminId }) => [
        "OrganizationAdmin",
        { type: "OrganizationAdmin", id: adminId },
      ],
    }),
  }),
});

export const {
  useGetOrganizationAdminsQuery,
  useGetOrganizationAdminByIdQuery,
  useGetOrganizationAdminsByOrganizationQuery,
  useGetOrganizationAdminStatsQuery,
  useCreateOrganizationAdminMutation,
  useUpdateOrganizationAdminMutation,
  useDeleteOrganizationAdminMutation,
  useSuspendOrganizationAdminMutation,
  useActivateOrganizationAdminMutation,
  useResetOrganizationAdminPasswordMutation,
  useUpdateOrganizationAdminPermissionsMutation,
} = organizationAdminApi;
