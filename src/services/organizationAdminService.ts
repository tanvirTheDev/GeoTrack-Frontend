import {
  CreateOrganizationAdminRequest,
  OrganizationAdminFilters,
  OrganizationAdminResponse,
  ResetPasswordRequest,
  UpdateOrganizationAdminRequest,
  UpdatePermissionsRequest,
} from "../types/organizationAdmin.types";
import api from "./api";

export const organizationAdminService = {
  // Get all organization admins with pagination and filters
  getAllOrganizationAdmins: async (
    filters: OrganizationAdminFilters = {}
  ): Promise<OrganizationAdminResponse> => {
    const params = new URLSearchParams();

    if (filters.page) params.append("page", filters.page.toString());
    if (filters.limit) params.append("limit", filters.limit.toString());
    if (filters.search) params.append("search", filters.search);
    if (filters.status) params.append("status", filters.status);
    if (filters.organizationId)
      params.append("organizationId", filters.organizationId);

    const response = await api.get(`/organization-admins?${params.toString()}`);
    return response.data;
  },

  // Get organization admin by ID
  getOrganizationAdminById: async (
    adminId: string
  ): Promise<OrganizationAdminResponse> => {
    const response = await api.get(`/organization-admins/${adminId}`);
    return response.data;
  },

  // Create organization admin
  createOrganizationAdmin: async (
    data: CreateOrganizationAdminRequest
  ): Promise<OrganizationAdminResponse> => {
    const response = await api.post("/organization-admins", data);
    return response.data;
  },

  // Update organization admin
  updateOrganizationAdmin: async (
    adminId: string,
    data: UpdateOrganizationAdminRequest
  ): Promise<OrganizationAdminResponse> => {
    const response = await api.put(`/organization-admins/${adminId}`, data);
    return response.data;
  },

  // Delete organization admin
  deleteOrganizationAdmin: async (
    adminId: string
  ): Promise<OrganizationAdminResponse> => {
    const response = await api.delete(`/organization-admins/${adminId}`);
    return response.data;
  },

  // Suspend organization admin
  suspendOrganizationAdmin: async (
    adminId: string
  ): Promise<OrganizationAdminResponse> => {
    const response = await api.post(`/organization-admins/${adminId}/suspend`);
    return response.data;
  },

  // Activate organization admin
  activateOrganizationAdmin: async (
    adminId: string
  ): Promise<OrganizationAdminResponse> => {
    const response = await api.post(`/organization-admins/${adminId}/activate`);
    return response.data;
  },

  // Reset organization admin password
  resetOrganizationAdminPassword: async (
    adminId: string,
    data: ResetPasswordRequest
  ): Promise<OrganizationAdminResponse> => {
    const response = await api.post(
      `/organization-admins/${adminId}/reset-password`,
      data
    );
    return response.data;
  },

  // Update organization admin permissions
  updateOrganizationAdminPermissions: async (
    adminId: string,
    data: UpdatePermissionsRequest
  ): Promise<OrganizationAdminResponse> => {
    const response = await api.put(
      `/organization-admins/${adminId}/permissions`,
      data
    );
    return response.data;
  },

  // Get organization admins by organization
  getOrganizationAdminsByOrganization: async (
    organizationId: string,
    filters: Omit<OrganizationAdminFilters, "organizationId"> = {}
  ): Promise<OrganizationAdminResponse> => {
    const params = new URLSearchParams();

    if (filters.page) params.append("page", filters.page.toString());
    if (filters.limit) params.append("limit", filters.limit.toString());
    if (filters.search) params.append("search", filters.search);
    if (filters.status) params.append("status", filters.status);

    const response = await api.get(
      `/organization-admins/organization/${organizationId}?${params.toString()}`
    );
    return response.data;
  },

  // Get organization admin statistics
  getOrganizationAdminStats: async (
    organizationId?: string
  ): Promise<OrganizationAdminResponse> => {
    const params = new URLSearchParams();
    if (organizationId) params.append("organizationId", organizationId);

    const response = await api.get(
      `/organization-admins/stats?${params.toString()}`
    );
    return response.data;
  },
};
