import { User } from "./auth.types";
import { UserRole } from "./common.types";
// Re-export User from auth.types to avoid duplication
export type { User } from "./auth.types";

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role: UserRole;
  organizationId?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  phone?: string;
  role?: UserRole;
  isActive?: boolean;
  address?: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
  preferences?: {
    notifications: boolean;
    theme: "light" | "dark" | "system";
    language: string;
  };
}

export interface UserFilters {
  organizationId?: string;
  role?: UserRole;
  isActive?: boolean;
  search?: string;
  page?: number;
  limit?: number;
}

export interface UserStats {
  userId: string;
  totalDeliveries: number;
  totalDistance: number;
  averageSpeed: number;
  emergencyRequests: number;
  lastActiveDate: string;
  performanceScore: number;
}

export interface UserSearchResult {
  users: User[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}
