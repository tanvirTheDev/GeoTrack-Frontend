import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { config } from "../../../config/env";
import { ApiResponse } from "../../../types/common.types";
import {
  ActiveTrackingUser,
  CreateEmergencyRequest,
  EmergencyRequest,
  LocationHistory,
  LocationTracking,
  LocationUpdate,
  TrackingFilters,
  TrackingStats,
  UpdateLocationRequest,
} from "../../../types/tracking.types";

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

export const trackingApi = createApi({
  reducerPath: "trackingApi",
  baseQuery,
  tagTypes: ["Tracking", "Location", "Emergency"],
  endpoints: (builder) => ({
    // Delivery User Routes
    updateLocation: builder.mutation<
      ApiResponse<LocationUpdate>,
      UpdateLocationRequest
    >({
      query: (body) => ({
        url: "/tracking/location/update",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Tracking", "Location"],
    }),

    getCurrentLocation: builder.query<ApiResponse<LocationTracking>, void>({
      query: () => "/tracking/location/current",
      providesTags: ["Location"],
    }),

    getLocationHistory: builder.query<
      ApiResponse<{
        history: LocationHistory[];
        pagination: {
          page: number;
          limit: number;
          total: number;
          pages: number;
        };
      }>,
      TrackingFilters
    >({
      query: (params) => ({
        url: "/tracking/location/history",
        params,
      }),
      providesTags: ["Location"],
    }),

    createEmergencyRequest: builder.mutation<
      ApiResponse<EmergencyRequest>,
      CreateEmergencyRequest
    >({
      query: (body) => ({
        url: "/tracking/emergency",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Emergency"],
    }),

    startTracking: builder.mutation<ApiResponse<LocationTracking>, void>({
      query: () => ({
        url: "/tracking/tracking/start",
        method: "POST",
      }),
      invalidatesTags: ["Tracking"],
    }),

    stopTracking: builder.mutation<ApiResponse, void>({
      query: () => ({
        url: "/tracking/tracking/stop",
        method: "POST",
      }),
      invalidatesTags: ["Tracking"],
    }),

    // Organization Admin Routes
    getActiveLocations: builder.query<ApiResponse<LocationTracking[]>, void>({
      query: () => "/tracking/org/locations/active",
      providesTags: ["Tracking"],
    }),

    getUserLocation: builder.query<ApiResponse<LocationTracking>, string>({
      query: (userId) => `/tracking/org/locations/user/${userId}`,
      providesTags: (result, error, userId) => [
        { type: "Location", id: userId },
      ],
    }),

    getUserLocationHistory: builder.query<
      ApiResponse<{
        history: LocationHistory[];
        pagination: {
          page: number;
          limit: number;
          total: number;
          pages: number;
        };
      }>,
      { userId: string } & TrackingFilters
    >({
      query: ({ userId, ...params }) => ({
        url: `/tracking/org/locations/user/${userId}/history`,
        params,
      }),
      providesTags: ["Location"],
    }),

    getEmergencyRequests: builder.query<
      ApiResponse<{
        requests: EmergencyRequest[];
        pagination: {
          page: number;
          limit: number;
          total: number;
          pages: number;
        };
      }>,
      TrackingFilters
    >({
      query: (params) => ({
        url: "/tracking/org/emergency",
        params,
      }),
      providesTags: ["Emergency"],
    }),

    acknowledgeEmergencyRequest: builder.mutation<
      ApiResponse<EmergencyRequest>,
      string
    >({
      query: (requestId) => ({
        url: `/tracking/org/emergency/${requestId}/acknowledge`,
        method: "PATCH",
      }),
      invalidatesTags: (result, error, requestId) => [
        { type: "Emergency", id: requestId },
        "Emergency",
      ],
    }),

    resolveEmergencyRequest: builder.mutation<
      ApiResponse<EmergencyRequest>,
      string
    >({
      query: (requestId) => ({
        url: `/tracking/org/emergency/${requestId}/resolve`,
        method: "PATCH",
      }),
      invalidatesTags: (result, error, requestId) => [
        { type: "Emergency", id: requestId },
        "Emergency",
      ],
    }),

    getTrackingStats: builder.query<ApiResponse<TrackingStats>, void>({
      query: () => "/tracking/org/stats",
      providesTags: ["Tracking"],
    }),

    // Legacy endpoints for backward compatibility
    getActiveUsers: builder.query<ApiResponse<ActiveTrackingUser[]>, void>({
      query: () => "/tracking/org/locations/active",
      providesTags: ["Tracking"],
    }),

    getEmergencyHistory: builder.query<
      ApiResponse<{
        requests: EmergencyRequest[];
        pagination: {
          page: number;
          limit: number;
          total: number;
          pages: number;
        };
      }>,
      TrackingFilters
    >({
      query: (params) => ({
        url: "/tracking/org/emergency",
        params,
      }),
      providesTags: ["Emergency"],
    }),

    acknowledgeEmergency: builder.mutation<
      ApiResponse<EmergencyRequest>,
      string
    >({
      query: (id) => ({
        url: `/tracking/org/emergency/${id}/acknowledge`,
        method: "PATCH",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Emergency", id },
        "Emergency",
      ],
    }),

    resolveEmergency: builder.mutation<ApiResponse<EmergencyRequest>, string>({
      query: (id) => ({
        url: `/tracking/org/emergency/${id}/resolve`,
        method: "PATCH",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Emergency", id },
        "Emergency",
      ],
    }),
  }),
});

export const {
  // Delivery User hooks
  useUpdateLocationMutation,
  useGetCurrentLocationQuery,
  useGetLocationHistoryQuery,
  useCreateEmergencyRequestMutation,
  useStartTrackingMutation,
  useStopTrackingMutation,

  // Organization Admin hooks
  useGetActiveLocationsQuery,
  useGetUserLocationQuery,
  useGetUserLocationHistoryQuery,
  useGetEmergencyRequestsQuery,
  useAcknowledgeEmergencyRequestMutation,
  useResolveEmergencyRequestMutation,
  useGetTrackingStatsQuery,

  // Legacy hooks for backward compatibility
  useGetActiveUsersQuery,
  useGetEmergencyHistoryQuery,
  useAcknowledgeEmergencyMutation,
  useResolveEmergencyMutation,
} = trackingApi;
