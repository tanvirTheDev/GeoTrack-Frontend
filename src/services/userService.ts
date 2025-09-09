import {
  CreateUserRequest,
  UpdateUserRequest,
  User,
} from "../types/user.types";
import api from "./api";

export const userService = {
  // Get all users (Super Admin)
  getAllUsers: async (): Promise<User[]> => {
    const response = await api.get("/admin/users");
    return response.data;
  },

  // Get users by organization
  getUsersByOrganization: async (organizationId: string): Promise<User[]> => {
    const response = await api.get(
      `/organization-admin/users?organizationId=${organizationId}`
    );
    return response.data;
  },

  // Get user by ID
  getUserById: async (id: string): Promise<User> => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  // Create user
  createUser: async (data: CreateUserRequest): Promise<User> => {
    const response = await api.post("/users", data);
    return response.data;
  },

  // Update user
  updateUser: async (id: string, data: UpdateUserRequest): Promise<User> => {
    const response = await api.put(`/users/${id}`, data);
    return response.data;
  },

  // Delete user
  deleteUser: async (id: string): Promise<{ message: string }> => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },

  // Suspend user
  suspendUser: async (id: string): Promise<{ message: string }> => {
    const response = await api.post(`/users/${id}/suspend`);
    return response.data;
  },

  // Activate user
  activateUser: async (id: string): Promise<{ message: string }> => {
    const response = await api.post(`/users/${id}/activate`);
    return response.data;
  },

  // Get user statistics
  getUserStats: async (id: string): Promise<any> => {
    const response = await api.get(`/users/${id}/stats`);
    return response.data;
  },

  // Search users
  searchUsers: async (
    query: string,
    organizationId?: string
  ): Promise<User[]> => {
    const params = new URLSearchParams({ q: query });
    if (organizationId) params.append("organizationId", organizationId);

    const response = await api.get(`/users/search?${params.toString()}`);
    return response.data;
  },
};
