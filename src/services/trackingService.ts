import {
  EmergencyRequest,
  LocationHistory,
  LocationTracking,
  TrackingFilters,
  TrackingStats,
} from "../types/tracking.types";
import api from "./api";

export const trackingService = {
  // Get active locations
  getActiveLocations: async (): Promise<{
    success: boolean;
    message: string;
    data: LocationTracking[];
  }> => {
    const response = await api.get("/tracking/org/locations/active");
    return response.data;
  },

  // Get user location
  getUserLocation: async (
    userId: string
  ): Promise<{
    success: boolean;
    message: string;
    data: LocationTracking;
  }> => {
    const response = await api.get(`/tracking/org/locations/user/${userId}`);
    return response.data;
  },

  // Get user location history
  getUserLocationHistory: async (
    userId: string,
    filters: TrackingFilters = {}
  ): Promise<{
    success: boolean;
    message: string;
    data: {
      history: LocationHistory[];
      pagination: {
        page: number;
        limit: number;
        total: number;
        pages: number;
      };
    };
  }> => {
    const params = new URLSearchParams();

    if (filters.startDate) params.append("startDate", filters.startDate);
    if (filters.endDate) params.append("endDate", filters.endDate);
    if (filters.page) params.append("page", filters.page.toString());
    if (filters.limit) params.append("limit", filters.limit.toString());

    const response = await api.get(
      `/tracking/org/locations/user/${userId}/history?${params.toString()}`
    );
    return response.data;
  },

  // Get emergency requests
  getEmergencyRequests: async (
    filters: TrackingFilters = {}
  ): Promise<{
    success: boolean;
    message: string;
    data: {
      requests: EmergencyRequest[];
      pagination: {
        page: number;
        limit: number;
        total: number;
        pages: number;
      };
    };
  }> => {
    const params = new URLSearchParams();

    if (filters.status) params.append("status", filters.status);
    if (filters.priority) params.append("priority", filters.priority);
    if (filters.page) params.append("page", filters.page.toString());
    if (filters.limit) params.append("limit", filters.limit.toString());

    const response = await api.get(
      `/tracking/org/emergency?${params.toString()}`
    );
    return response.data;
  },

  // Acknowledge emergency request
  acknowledgeEmergencyRequest: async (
    requestId: string
  ): Promise<{
    success: boolean;
    message: string;
    data: EmergencyRequest;
  }> => {
    const response = await api.patch(
      `/tracking/org/emergency/${requestId}/acknowledge`
    );
    return response.data;
  },

  // Resolve emergency request
  resolveEmergencyRequest: async (
    requestId: string
  ): Promise<{
    success: boolean;
    message: string;
    data: EmergencyRequest;
  }> => {
    const response = await api.patch(
      `/tracking/org/emergency/${requestId}/resolve`
    );
    return response.data;
  },

  // Get tracking statistics
  getTrackingStats: async (): Promise<{
    success: boolean;
    message: string;
    data: TrackingStats;
  }> => {
    const response = await api.get("/tracking/org/stats");
    return response.data;
  },
};
