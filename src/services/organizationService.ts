import {
  CreateOrganizationRequest,
  Organization,
  UpdateOrganizationRequest,
} from "../types/organization.types";
import api from "./api";

export const organizationService = {
  // Get all organizations (Super Admin)
  getAllOrganizations: async (): Promise<Organization[]> => {
    const response = await api.get("/organizations");
    return response.data;
  },

  // Get organization by ID
  getOrganizationById: async (id: string): Promise<Organization> => {
    const response = await api.get(`/organizations/${id}`);
    return response.data;
  },

  // Create organization (Super Admin)
  createOrganization: async (
    data: CreateOrganizationRequest
  ): Promise<Organization> => {
    const response = await api.post("/organizations", data);
    return response.data;
  },

  // Update organization
  updateOrganization: async (
    id: string,
    data: UpdateOrganizationRequest
  ): Promise<Organization> => {
    const response = await api.put(`/organizations/${id}`, data);
    return response.data;
  },

  // Delete organization (Super Admin)
  deleteOrganization: async (id: string): Promise<{ message: string }> => {
    const response = await api.delete(`/organizations/${id}`);
    return response.data;
  },

  // Suspend organization (Super Admin)
  suspendOrganization: async (id: string): Promise<{ message: string }> => {
    const response = await api.post(`/organizations/${id}/suspend`);
    return response.data;
  },

  // Activate organization (Super Admin)
  activateOrganization: async (id: string): Promise<{ message: string }> => {
    const response = await api.post(`/organizations/${id}/activate`);
    return response.data;
  },

  // Update subscription (Super Admin)
  updateSubscription: async (
    id: string,
    subscriptionData: any
  ): Promise<{ message: string }> => {
    const response = await api.post(
      `/organizations/${id}/subscription`,
      subscriptionData
    );
    return response.data;
  },

  // Get organization statistics
  getOrganizationStats: async (id: string): Promise<any> => {
    const response = await api.get(`/organizations/${id}/stats`);
    return response.data;
  },
};
