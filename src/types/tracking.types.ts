export interface Location {
  latitude: number;
  longitude: number;
  accuracy?: number;
  altitude?: number;
  speed?: number;
  heading?: number;
  timestamp: Date;
}

export interface LocationTracking {
  _id: string;
  userId:
    | string
    | {
        _id: string;
        name: string;
        email: string;
        role?: string;
      };
  organizationId:
    | string
    | {
        _id: string;
        name: string;
        companyName?: string;
      };
  location: Location;
  isActive: boolean;
  batteryLevel?: number;
  networkType?: "wifi" | "4g" | "5g" | "3g" | "2g" | "unknown";
  deviceInfo?: {
    model?: string;
    os?: string;
    appVersion?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface LocationHistory {
  _id: string;
  userId:
    | string
    | {
        _id: string;
        name: string;
        email: string;
      };
  organizationId:
    | string
    | {
        _id: string;
        name: string;
        companyName?: string;
      };
  locations: Location[];
  date: Date;
  totalDistance?: number;
  totalTime?: number;
  averageSpeed?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface EmergencyRequest {
  _id: string;
  userId:
    | string
    | {
        _id: string;
        name: string;
        email: string;
        phone?: string;
      };
  organizationId: string;
  location: Location;
  message?: string;
  status: "pending" | "acknowledged" | "resolved";
  priority: "low" | "medium" | "high" | "critical";
  createdAt: Date;
  acknowledgedAt?: Date;
  resolvedAt?: Date;
  acknowledgedBy?:
    | string
    | {
        _id: string;
        name: string;
        email: string;
      };
  resolvedBy?:
    | string
    | {
        _id: string;
        name: string;
        email: string;
      };
}

export interface TrackingStats {
  totalUsers: number;
  activeTracking: number;
  totalEmergencyRequests: number;
  pendingEmergencyRequests: number;
  resolvedEmergencyRequests: number;
  trackingPercentage: number;
  emergencyResolutionRate: number;
}

export interface TrackingFilters {
  startDate?: string;
  endDate?: string;
  userId?: string;
  status?: "pending" | "acknowledged" | "resolved";
  priority?: "low" | "medium" | "high" | "critical";
  page?: number;
  limit?: number;
}

// Legacy types for backward compatibility
export interface TrackingData extends LocationTracking {}
export interface ActiveTrackingUser extends LocationTracking {}

// Request/Response types
export interface UpdateLocationRequest {
  latitude: number;
  longitude: number;
  accuracy?: number;
  altitude?: number;
  speed?: number;
  heading?: number;
  batteryLevel?: number;
  networkType?: "wifi" | "4g" | "5g" | "3g" | "2g" | "unknown";
  deviceInfo?: {
    model?: string;
    os?: string;
    appVersion?: string;
  };
}

export interface CreateEmergencyRequest {
  latitude: number;
  longitude: number;
  accuracy?: number;
  message?: string;
  priority?: "low" | "medium" | "high" | "critical";
}

export interface LocationUpdate extends LocationTracking {}

export interface UserTrackingStats {
  userId: string;
  userName: string;
  totalLocations: number;
  totalDistance: number;
  averageSpeed: number;
  lastSeen: Date;
  isActive: boolean;
}

export interface RouteData {
  userId: string;
  userName: string;
  locations: Location[];
  totalDistance: number;
  totalTime: number;
  averageSpeed: number;
  startTime: Date;
  endTime: Date;
}
