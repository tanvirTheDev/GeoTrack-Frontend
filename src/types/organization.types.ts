export interface Organization {
  _id: string;
  name: string;
  companyName: string;
  email: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
  status: "active" | "inactive" | "suspended";
  packageType: "basic" | "premium" | "platinum";
  maxUsers: number;
  currentUsers: number;
  subscriptionStartDate: string;
  subscriptionEndDate: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  userCount?: number;
  isSubscriptionActive?: boolean;
}

export interface CreateOrganizationRequest {
  name: string;
  companyName: string;
  email: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
  packageType: "basic" | "premium" | "platinum";
  maxUsers: number;
  subscriptionEndDate: string;
}

export interface UpdateOrganizationRequest {
  name?: string;
  companyName?: string;
  email?: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
  status?: "active" | "inactive" | "suspended";
  packageType?: "basic" | "premium" | "platinum";
  maxUsers?: number;
  subscriptionEndDate?: string;
}

export interface UpdateSubscriptionRequest {
  packageType: "basic" | "premium" | "platinum";
  maxUsers: number;
  endDate: string;
}

export interface OrganizationStats {
  _id: string;
  name: string;
  companyName: string;
  email: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
  status: "active" | "inactive" | "suspended";
  packageType: "basic" | "premium" | "platinum";
  maxUsers: number;
  currentUsers: number;
  subscriptionStartDate: string;
  subscriptionEndDate: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  userStats: {
    totalUsers: number;
    activeUsers: number;
    adminUsers: number;
    deliveryUsers: number;
  };
}

export interface OrganizationFilters {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  packageType?: string;
}

export interface OrganizationResponse {
  success: boolean;
  message: string;
  data?: Organization | Organization[] | OrganizationStats;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface PackageInfo {
  type: "basic" | "premium" | "platinum";
  name: string;
  description: string;
  maxUsers: number;
  features: string[];
  price: number;
  color: string;
}
