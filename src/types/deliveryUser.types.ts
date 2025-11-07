export interface DeliveryUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  vehicleType: "bike" | "motorcycle" | "car" | "van" | "truck";
  licenseNumber: string;
  status: "active" | "inactive" | "suspended";
  organizationId:
    | string
    | {
        _id: string;
        name: string;
        companyName: string;
      };
  lastLocation?: {
    latitude: number;
    longitude: number;
    address: string;
    timestamp: Date;
  };
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface DeliveryUserFilters {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  vehicleType?: string;
}

export interface DeliveryUserStats {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  suspendedUsers: number;
  onlineUsers: number;
  offlineUsers: number;
}

export interface CreateDeliveryUserData {
  name: string;
  email: string;
  password: string;
  phone: string;
  vehicleType: "bike" | "motorcycle" | "car" | "van" | "truck";
  licenseNumber: string;
  status?: "active" | "inactive" | "suspended";
}

export interface UpdateDeliveryUserData {
  name?: string;
  email?: string;
  phone?: string;
  vehicleType?: "bike" | "motorcycle" | "car" | "van" | "truck";
  licenseNumber?: string;
  status?: "active" | "inactive" | "suspended";
}

export interface ResetPasswordData {
  password: string;
  confirmPassword: string;
}

export interface DeliveryUserResponse {
  success: boolean;
  message: string;
  data?: {
    users: DeliveryUser[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}
