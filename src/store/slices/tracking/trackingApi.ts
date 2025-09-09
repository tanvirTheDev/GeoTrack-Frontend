import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { config } from "../../../config/env";
import { ApiResponse, PaginatedResponse } from "../../../types/common.types";
import {
  ActiveTrackingUser,
  CreateEmergencyRequest,
  EmergencyRequest,
  LocationHistory,
  LocationUpdate,
  RouteData,
  TrackingFilters,
  TrackingStats,
  UpdateLocationRequest,
  UserTrackingStats,
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

    getCurrentLocation: builder.query<ApiResponse<LocationUpdate>, void>({
      query: () => "/tracking/location/current",
      providesTags: ["Location"],
    }),

    getLocationHistory: builder.query<
      ApiResponse<PaginatedResponse<LocationHistory>>,
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
        url: "/tracking/emergency/request",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Emergency"],
    }),

    getEmergencyHistory: builder.query<
      ApiResponse<PaginatedResponse<EmergencyRequest>>,
      TrackingFilters
    >({
      query: (params) => ({
        url: "/tracking/emergency/history",
        params,
      }),
      providesTags: ["Emergency"],
    }),

    acknowledgeEmergency: builder.mutation<
      ApiResponse<EmergencyRequest>,
      string
    >({
      query: (id) => ({
        url: `/tracking/emergency/${id}/acknowledge`,
        method: "POST",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Emergency", id },
        "Emergency",
      ],
    }),

    resolveEmergency: builder.mutation<ApiResponse<EmergencyRequest>, string>({
      query: (id) => ({
        url: `/tracking/emergency/${id}/resolve`,
        method: "POST",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Emergency", id },
        "Emergency",
      ],
    }),

    getActiveUsers: builder.query<ApiResponse<ActiveTrackingUser[]>, void>({
      query: () => "/realtime/active-users",
      providesTags: ["Tracking"],
    }),

    getAllActiveUsers: builder.query<ApiResponse<ActiveTrackingUser[]>, void>({
      query: () => "/realtime/all-active-users",
      providesTags: ["Tracking"],
    }),

    getUserLocation: builder.query<ApiResponse<LocationUpdate>, string>({
      query: (userId) => `/realtime/user/${userId}/location`,
      providesTags: (result, error, userId) => [
        { type: "Location", id: userId },
      ],
    }),

    startTracking: builder.mutation<ApiResponse, void>({
      query: () => ({
        url: "/realtime/start-tracking",
        method: "POST",
      }),
      invalidatesTags: ["Tracking"],
    }),

    stopTracking: builder.mutation<ApiResponse, void>({
      query: () => ({
        url: "/realtime/stop-tracking",
        method: "POST",
      }),
      invalidatesTags: ["Tracking"],
    }),

    getTrackingStats: builder.query<ApiResponse<TrackingStats>, void>({
      query: () => "/tracking/stats",
      providesTags: ["Tracking"],
    }),

    getUserTrackingStats: builder.query<
      ApiResponse<UserTrackingStats[]>,
      TrackingFilters
    >({
      query: (params) => ({
        url: "/tracking/user-stats",
        params,
      }),
      providesTags: ["Tracking"],
    }),

    getRouteData: builder.query<
      ApiResponse<RouteData>,
      { userId: string; startDate: string; endDate: string }
    >({
      query: ({ userId, startDate, endDate }) => ({
        url: `/tracking/route/${userId}`,
        params: { startDate, endDate },
      }),
      providesTags: ["Tracking"],
    }),
  }),
});

export const {
  useUpdateLocationMutation,
  useGetCurrentLocationQuery,
  useGetLocationHistoryQuery,
  useCreateEmergencyRequestMutation,
  useGetEmergencyHistoryQuery,
  useAcknowledgeEmergencyMutation,
  useResolveEmergencyMutation,
  useGetActiveUsersQuery,
  useGetAllActiveUsersQuery,
  useGetUserLocationQuery,
  useStartTrackingMutation,
  useStopTrackingMutation,
  useGetTrackingStatsQuery,
  useGetUserTrackingStatsQuery,
  useGetRouteDataQuery,
} = trackingApi;
