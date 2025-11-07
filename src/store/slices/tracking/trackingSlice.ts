import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ActiveTrackingUser,
  EmergencyRequest,
  LocationUpdate,
  TrackingStats,
} from "../../../types/tracking.types";

interface TrackingState {
  activeUsers: ActiveTrackingUser[];
  locationHistory: LocationUpdate[];
  emergencyRequests: EmergencyRequest[];
  currentLocation: LocationUpdate | null;
  stats: TrackingStats | null;
  isLoading: boolean;
  error: string | null;
  isTracking: boolean;
  selectedUserId: string | null;
  mapCenter: { lat: number; lng: number };
  mapZoom: number;
}

const initialState: TrackingState = {
  activeUsers: [],
  locationHistory: [],
  emergencyRequests: [],
  currentLocation: null,
  stats: null,
  isLoading: false,
  error: null,
  isTracking: false,
  selectedUserId: null,
  mapCenter: { lat: 23.8103, lng: 90.4125 }, // Dhaka, Bangladesh
  mapZoom: 13,
};

const trackingSlice = createSlice({
  name: "tracking",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    setActiveUsers: (state, action: PayloadAction<ActiveTrackingUser[]>) => {
      state.activeUsers = action.payload;
    },
    updateUserLocation: (state, action: PayloadAction<LocationUpdate>) => {
      const userIndex = state.activeUsers.findIndex(
        (user) => user.userId === action.payload.userId
      );
      if (userIndex !== -1) {
        state.activeUsers[userIndex] = {
          ...state.activeUsers[userIndex],
          location: action.payload.location,
          updatedAt: action.payload.updatedAt,
          batteryLevel: action.payload.batteryLevel,
          networkType: action.payload.networkType,
        };
      }
    },
    setLocationHistory: (state, action: PayloadAction<LocationUpdate[]>) => {
      state.locationHistory = action.payload;
    },
    addLocationHistory: (state, action: PayloadAction<LocationUpdate>) => {
      state.locationHistory.unshift(action.payload);
    },
    setEmergencyRequests: (
      state,
      action: PayloadAction<EmergencyRequest[]>
    ) => {
      state.emergencyRequests = action.payload;
    },
    addEmergencyRequest: (state, action: PayloadAction<EmergencyRequest>) => {
      state.emergencyRequests.unshift(action.payload);
    },
    updateEmergencyRequest: (
      state,
      action: PayloadAction<EmergencyRequest>
    ) => {
      const index = state.emergencyRequests.findIndex(
        (req) => req._id === action.payload._id
      );
      if (index !== -1) {
        state.emergencyRequests[index] = action.payload;
      }
    },
    setCurrentLocation: (
      state,
      action: PayloadAction<LocationUpdate | null>
    ) => {
      state.currentLocation = action.payload;
    },
    setStats: (state, action: PayloadAction<TrackingStats>) => {
      state.stats = action.payload;
    },
    setIsTracking: (state, action: PayloadAction<boolean>) => {
      state.isTracking = action.payload;
    },
    setSelectedUserId: (state, action: PayloadAction<string | null>) => {
      state.selectedUserId = action.payload;
    },
    setMapCenter: (
      state,
      action: PayloadAction<{ lat: number; lng: number }>
    ) => {
      state.mapCenter = action.payload;
    },
    setMapZoom: (state, action: PayloadAction<number>) => {
      state.mapZoom = action.payload;
    },
    resetTracking: (state) => {
      return { ...initialState };
    },
  },
});

export const {
  setLoading,
  setError,
  clearError,
  setActiveUsers,
  updateUserLocation,
  setLocationHistory,
  addLocationHistory,
  setEmergencyRequests,
  addEmergencyRequest,
  updateEmergencyRequest,
  setCurrentLocation,
  setStats,
  setIsTracking,
  setSelectedUserId,
  setMapCenter,
  setMapZoom,
  resetTracking,
} = trackingSlice.actions;

export default trackingSlice.reducer;
