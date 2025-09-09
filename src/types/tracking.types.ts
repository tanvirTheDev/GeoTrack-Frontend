import {
  BaseEntity,
  DeviceInfo,
  EmergencyPriority,
  EmergencyStatus,
  Location,
  TrackingStatus,
} from "./common.types";

export interface LocationUpdate extends BaseEntity {
  userId: string;
  userName: string;
  organizationId: string;
  organizationName: string;
  location: Location;
  deviceInfo?: DeviceInfo;
  isActive: boolean;
  batteryLevel?: number;
  networkType?: string;
  accuracy?: number;
  speed?: number;
  heading?: number;
  altitude?: number;
}

export interface LocationHistory extends BaseEntity {
  userId: string;
  userName: string;
  organizationId: string;
  organizationName: string;
  location: Location;
  deviceInfo?: DeviceInfo;
  timestamp: string;
  batteryLevel?: number;
  networkType?: string;
  accuracy?: number;
  speed?: number;
  heading?: number;
  altitude?: number;
}

export interface TrackingHistory extends BaseEntity {
  userId: string;
  userName: string;
  organizationId: string;
  organizationName: string;
  startTime: string;
  endTime?: string;
  totalDistance: number;
  averageSpeed: number;
  locations: LocationHistory[];
  emergencyRequests: EmergencyRequest[];
  status: "completed" | "in_progress" | "cancelled";
}

export interface EmergencyRequest extends BaseEntity {
  userId: string;
  userName: string;
  organizationId: string;
  organizationName: string;
  location: Location;
  message?: string;
  priority: EmergencyPriority;
  status: EmergencyStatus;
  acknowledgedBy?: string;
  acknowledgedAt?: string;
  resolvedBy?: string;
  resolvedAt?: string;
  deviceInfo?: DeviceInfo;
  responseTime?: number; // in seconds
}

export interface CreateEmergencyRequest {
  location: Location;
  message?: string;
  priority?: EmergencyPriority;
  deviceInfo?: DeviceInfo;
}

export interface UpdateLocationRequest {
  location: Location;
  deviceInfo?: DeviceInfo;
}

export interface TrackingFilters {
  userId?: string;
  organizationId?: string;
  startDate?: string;
  endDate?: string;
  status?: TrackingStatus;
  priority?: EmergencyPriority;
  page?: number;
  limit?: number;
}

export interface ActiveTrackingUser {
  userId: string;
  userName: string;
  organizationId: string;
  organizationName: string;
  currentLocation: Location;
  lastUpdate: string;
  isActive: boolean;
  batteryLevel?: number;
  networkType?: string;
  deviceInfo?: DeviceInfo;
  trackingStartedAt: string;
  totalDistance?: number;
  averageSpeed?: number;
}

export interface TrackingStats {
  totalActiveUsers: number;
  totalDistance: number;
  averageSpeed: number;
  emergencyRequests: number;
  pendingEmergencies: number;
  resolvedEmergencies: number;
  averageResponseTime: number;
}

export interface UserTrackingStats {
  userId: string;
  userName: string;
  totalDistance: number;
  averageSpeed: number;
  totalTime: number;
  emergencyRequests: number;
  lastActive: string;
  isCurrentlyActive: boolean;
}

export interface RouteData {
  userId: string;
  userName: string;
  startTime: string;
  endTime: string;
  totalDistance: number;
  averageSpeed: number;
  locations: LocationHistory[];
  emergencyRequests: EmergencyRequest[];
}

export interface RealtimeLocationUpdate {
  userId: string;
  userName: string;
  organizationId: string;
  organizationName: string;
  location: Location;
  timestamp: string;
  isActive: boolean;
  batteryLevel?: number;
  networkType?: string;
  deviceInfo?: DeviceInfo;
}

export interface TrackingSession {
  sessionId: string;
  userId: string;
  userName: string;
  organizationId: string;
  startTime: string;
  endTime?: string;
  isActive: boolean;
  totalDistance: number;
  averageSpeed: number;
  locations: LocationHistory[];
  emergencyRequests: EmergencyRequest[];
}

export interface MapBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}

export interface TrackingHeatmapData {
  location: Location;
  intensity: number;
  timestamp: string;
  userId: string;
}

export interface Geofence {
  id: string;
  name: string;
  center: Location;
  radius: number; // in meters
  isActive: boolean;
  organizationId: string;
  alertOnEnter: boolean;
  alertOnExit: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GeofenceAlert {
  id: string;
  geofenceId: string;
  userId: string;
  userName: string;
  type: "enter" | "exit";
  location: Location;
  timestamp: string;
  isRead: boolean;
}
