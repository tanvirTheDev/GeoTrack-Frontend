import {
  EmergencyRequest,
  LocationUpdate,
  TrackingHistory,
} from "../types/tracking.types";
import api from "./api";

export const trackingService = {
  // Update location
  updateLocation: async (
    locationData: LocationUpdate
  ): Promise<{ message: string }> => {
    const response = await api.post("/tracking/location", locationData);
    return response.data;
  },

  // Send emergency request
  sendEmergencyRequest: async (
    emergencyData: EmergencyRequest
  ): Promise<{ message: string }> => {
    const response = await api.post("/tracking/emergency", emergencyData);
    return response.data;
  },

  // Get tracking history
  getTrackingHistory: async (
    userId?: string,
    startDate?: string,
    endDate?: string
  ): Promise<TrackingHistory[]> => {
    const params = new URLSearchParams();
    if (userId) params.append("userId", userId);
    if (startDate) params.append("startDate", startDate);
    if (endDate) params.append("endDate", endDate);

    const response = await api.get(`/tracking/history?${params.toString()}`);
    return response.data;
  },

  // Get active tracking users
  getActiveUsers: async (organizationId?: string): Promise<any[]> => {
    const params = organizationId ? `?organizationId=${organizationId}` : "";
    const response = await api.get(`/realtime-tracking/active${params}`);
    return response.data;
  },

  // Get all active users (Super Admin)
  getAllActiveUsers: async (): Promise<any[]> => {
    const response = await api.get("/realtime-tracking/active/all");
    return response.data;
  },

  // Get emergency requests
  getEmergencyRequests: async (organizationId?: string): Promise<any[]> => {
    const params = organizationId ? `?organizationId=${organizationId}` : "";
    const response = await api.get(`/tracking/emergency-requests${params}`);
    return response.data;
  },

  // Respond to emergency request
  respondToEmergency: async (
    requestId: string,
    response: string
  ): Promise<{ message: string }> => {
    const apiResponse = await api.post(
      `/tracking/emergency-requests/${requestId}/respond`,
      {
        response,
      }
    );
    return apiResponse.data;
  },
};
