import { createApi } from "@reduxjs/toolkit/query/react";
import { API_ENDPOINTS } from "../../../config/api";
import {
  CreateOrganizationRequest,
  OrganizationFilters,
  OrganizationResponse,
  UpdateOrganizationRequest,
  UpdateSubscriptionRequest,
} from "../../../types/organization.types";
import { baseQueryWithReauth } from "../../baseQuery";

export const organizationApi = createApi({
  reducerPath: "organizationApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Organization", "OrganizationStats"],
  endpoints: (builder) => ({
    // Get all organizations with filters
    getOrganizations: builder.query<OrganizationResponse, OrganizationFilters>({
      query: (filters) => {
        const params = new URLSearchParams();
        if (filters.page) params.append("page", filters.page.toString());
        if (filters.limit) params.append("limit", filters.limit.toString());
        if (filters.search) params.append("search", filters.search);
        if (filters.status) params.append("status", filters.status);
        if (filters.packageType)
          params.append("packageType", filters.packageType);

        return `${API_ENDPOINTS.ORGANIZATIONS.BASE}?${params.toString()}`;
      },
      providesTags: ["Organization"],
    }),

    // Get organization by ID
    getOrganizationById: builder.query<OrganizationResponse, string>({
      query: (organizationId) =>
        API_ENDPOINTS.ORGANIZATIONS.BY_ID(organizationId),
      providesTags: (result, error, organizationId) => [
        { type: "Organization", id: organizationId },
      ],
    }),

    // Get organization statistics
    getOrganizationStats: builder.query<OrganizationResponse, string>({
      query: (organizationId) =>
        API_ENDPOINTS.ORGANIZATIONS.STATS(organizationId),
      providesTags: (result, error, organizationId) => [
        { type: "OrganizationStats", id: organizationId },
      ],
    }),

    // Get expiring organizations
    getExpiringOrganizations: builder.query<
      OrganizationResponse,
      { days?: number }
    >({
      query: ({ days = 7 }) =>
        `${API_ENDPOINTS.ORGANIZATIONS.EXPIRING}?days=${days}`,
      providesTags: ["Organization"],
    }),

    // Create organization
    createOrganization: builder.mutation<
      OrganizationResponse,
      CreateOrganizationRequest
    >({
      query: (organizationData) => {
        console.log("🚀 Sending organization data to API:", organizationData);
        return {
          url: API_ENDPOINTS.ORGANIZATIONS.BASE,
          method: "POST",
          body: organizationData,
        };
      },
      invalidatesTags: ["Organization"],
    }),

    // Update organization
    updateOrganization: builder.mutation<
      OrganizationResponse,
      { organizationId: string; data: UpdateOrganizationRequest }
    >({
      query: ({ organizationId, data }) => ({
        url: API_ENDPOINTS.ORGANIZATIONS.BY_ID(organizationId),
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { organizationId }) => [
        "Organization",
        { type: "Organization", id: organizationId },
        { type: "OrganizationStats", id: organizationId },
      ],
    }),

    // Delete organization
    deleteOrganization: builder.mutation<OrganizationResponse, string>({
      query: (organizationId) => ({
        url: API_ENDPOINTS.ORGANIZATIONS.BY_ID(organizationId),
        method: "DELETE",
      }),
      invalidatesTags: ["Organization"],
    }),

    // Suspend organization
    suspendOrganization: builder.mutation<OrganizationResponse, string>({
      query: (organizationId) => ({
        url: API_ENDPOINTS.ORGANIZATIONS.SUSPEND(organizationId),
        method: "POST",
      }),
      invalidatesTags: (result, error, organizationId) => [
        "Organization",
        { type: "Organization", id: organizationId },
        { type: "OrganizationStats", id: organizationId },
      ],
    }),

    // Activate organization
    activateOrganization: builder.mutation<OrganizationResponse, string>({
      query: (organizationId) => ({
        url: API_ENDPOINTS.ORGANIZATIONS.ACTIVATE(organizationId),
        method: "POST",
      }),
      invalidatesTags: (result, error, organizationId) => [
        "Organization",
        { type: "Organization", id: organizationId },
        { type: "OrganizationStats", id: organizationId },
      ],
    }),

    // Update organization subscription
    updateSubscription: builder.mutation<
      OrganizationResponse,
      { organizationId: string; data: UpdateSubscriptionRequest }
    >({
      query: ({ organizationId, data }) => ({
        url: API_ENDPOINTS.ORGANIZATIONS.SUBSCRIPTION(organizationId),
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { organizationId }) => [
        "Organization",
        { type: "Organization", id: organizationId },
        { type: "OrganizationStats", id: organizationId },
      ],
    }),
  }),
});

export const {
  useGetOrganizationsQuery,
  useGetOrganizationByIdQuery,
  useGetOrganizationStatsQuery,
  useGetExpiringOrganizationsQuery,
  useCreateOrganizationMutation,
  useUpdateOrganizationMutation,
  useDeleteOrganizationMutation,
  useSuspendOrganizationMutation,
  useActivateOrganizationMutation,
  useUpdateSubscriptionMutation,
} = organizationApi;
