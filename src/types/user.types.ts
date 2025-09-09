import { BaseEntity, UserRole } from "./common.types";

export interface User extends BaseEntity {
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  organizationId?: string;
  organizationName?: string;
  isActive: boolean;
  lastLoginAt?: string;
  profileImage?: string;
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
