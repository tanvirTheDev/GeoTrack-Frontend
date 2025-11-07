export interface OrganizationAdmin {
  _id: string;
  name: string;
  email: string;
  organizationId: {
    _id: string;
    name: string;
    companyName: string;
    id: string;
  };

  status: "active" | "inactive" | "suspended";

  permissions: {
    canManageUsers: boolean;
    canViewReports: boolean;
    canManageSettings: boolean;
    canViewAnalytics: boolean;
    canManageDeliveryUsers: boolean;
    canViewLiveTracking: boolean;
  };

  lastLogin?: string;
  createdBy: {
    _id: string;
    name: string;
    email: string;
    id: string;
  };

  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface CreateOrganizationAdminRequest {
  name: string;
  email: string;
  password: string;
  organizationId: string;
  status?: "active" | "inactive" | "suspended";
  permissions?: {
    canManageUsers?: boolean;
    canViewReports?: boolean;
    canManageSettings?: boolean;
    canViewAnalytics?: boolean;
    canManageDeliveryUsers?: boolean;
    canViewLiveTracking?: boolean;
  };
}

export interface UpdateOrganizationAdminRequest {
  name?: string;
  email?: string;
  status?: "active" | "inactive" | "suspended";
  permissions?: {
    canManageUsers?: boolean;
    canViewReports?: boolean;
    canManageSettings?: boolean;
    canViewAnalytics?: boolean;
    canManageDeliveryUsers?: boolean;
    canViewLiveTracking?: boolean;
  };
}

// Re-export ResetPasswordRequest from auth.types to avoid duplication
export type { ResetPasswordRequest } from "./auth.types";

export interface UpdatePermissionsRequest {
  permissions: {
    canManageUsers?: boolean;
    canViewReports?: boolean;
    canManageSettings?: boolean;
    canViewAnalytics?: boolean;
    canManageDeliveryUsers?: boolean;
    canViewLiveTracking?: boolean;
  };
}

export interface OrganizationAdminStats {
  totalAdmins: number;
  activeAdmins: number;
  inactiveAdmins: number;
  suspendedAdmins: number;
}

export interface OrganizationAdminFilters {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  organizationId?: string;
}

export interface OrganizationAdminResponse {
  success: boolean;
  message: string;
  data?: OrganizationAdmin | OrganizationAdmin[] | OrganizationAdminStats;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface Permission {
  key: keyof OrganizationAdmin["permissions"];
  label: string;
  description: string;
}
