import {
  CreateDeliveryUserData,
  DeliveryUserFilters,
  DeliveryUserResponse,
  DeliveryUserStats,
  ResetPasswordData,
  UpdateDeliveryUserData,
} from "../types/deliveryUser.types";
import api from "./api";

export const deliveryUserService = {
  // Get all delivery users
  getAllDeliveryUsers: async (
    filters: DeliveryUserFilters = {}
  ): Promise<DeliveryUserResponse> => {
    const params = new URLSearchParams();

    if (filters.page) params.append("page", filters.page.toString());
    if (filters.limit) params.append("limit", filters.limit.toString());
    if (filters.search) params.append("search", filters.search);
    if (filters.status) params.append("status", filters.status);
    if (filters.vehicleType) params.append("vehicleType", filters.vehicleType);

    const response = await api.get(
      `/organization-admins/delivery-users?${params.toString()}`
    );
    return response.data;
  },

  // Get delivery user by ID
  getDeliveryUserById: async (
    userId: string
  ): Promise<DeliveryUserResponse> => {
    const response = await api.get(
      `/organization-admins/delivery-users/${userId}`
    );
    return response.data;
  },

  // Create delivery user
  createDeliveryUser: async (
    data: CreateDeliveryUserData
  ): Promise<DeliveryUserResponse> => {
    const response = await api.post(
      "/organization-admins/delivery-users",
      data
    );
    return response.data;
  },

  // Update delivery user
  updateDeliveryUser: async (
    userId: string,
    data: UpdateDeliveryUserData
  ): Promise<DeliveryUserResponse> => {
    const response = await api.put(
      `/organization-admins/delivery-users/${userId}`,
      data
    );
    return response.data;
  },

  // Delete delivery user
  deleteDeliveryUser: async (userId: string): Promise<DeliveryUserResponse> => {
    const response = await api.delete(
      `/organization-admins/delivery-users/${userId}`
    );
    return response.data;
  },

  // Update delivery user status
  updateDeliveryUserStatus: async (
    userId: string,
    status: "active" | "inactive" | "suspended"
  ): Promise<DeliveryUserResponse> => {
    const response = await api.patch(
      `/organization-admins/delivery-users/${userId}/status`,
      { status }
    );
    return response.data;
  },

  // Reset delivery user password
  resetDeliveryUserPassword: async (
    userId: string,
    data: ResetPasswordData
  ): Promise<DeliveryUserResponse> => {
    const response = await api.patch(
      `/organization-admins/delivery-users/${userId}/reset-password`,
      data
    );
    return response.data;
  },

  // Get delivery user statistics
  getDeliveryUserStats: async (): Promise<{
    success: boolean;
    data: DeliveryUserStats;
  }> => {
    const response = await api.get("/organization-admins/delivery-users/stats");
    return response.data;
  },
};
