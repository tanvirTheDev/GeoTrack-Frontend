import { config } from "./env";

export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: "/auth/login",
    REFRESH_TOKEN: "/auth/refresh-token",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
    CHANGE_PASSWORD: "/auth/change-password",
    LOGOUT: "/auth/logout",
    LOGOUT_ALL: "/auth/logout-all",
    PROFILE: "/auth/profile",
    VALIDATE: "/auth/validate",
    DASHBOARD: "/auth/dashboard",
  },

  // Organizations (Super Admin)
  ORGANIZATIONS: {
    BASE: "/organizations",
    BY_ID: (id: string) => `/organizations/${id}`,
    SUSPEND: (id: string) => `/organizations/${id}/suspend`,
    ACTIVATE: (id: string) => `/organizations/${id}/activate`,
    STATS: (id: string) => `/organizations/${id}/stats`,
    EXPIRING: "/organizations/expiring",
    SUBSCRIPTION: (id: string) => `/organizations/${id}/subscription`,
  },

  // Admin (User Management)
  ADMIN: {
    USERS: "/admin/users",
    USER_BY_ID: (id: string) => `/admin/users/${id}`,
    SUSPEND_USER: (id: string) => `/admin/users/${id}/suspend`,
    ACTIVATE_USER: (id: string) => `/admin/users/${id}/activate`,
    RESET_PASSWORD: (id: string) => `/admin/users/${id}/reset-password`,
    USER_STATS: "/admin/users/stats",
    USERS_BY_ORG: (orgId: string) => `/admin/organizations/${orgId}/users`,
  },

  // Organization Admins
  ORG_ADMINS: {
    BASE: "/organization-admins",
    BY_ID: (id: string) => `/organization-admins/${id}`,
    BY_ORG: (orgId: string) => `/organization-admins/organization/${orgId}`,
  },

  // Tracking
  TRACKING: {
    UPDATE_LOCATION: "/tracking/location/update",
    CURRENT_LOCATION: "/tracking/location/current",
    LOCATION_HISTORY: "/tracking/location/history",
    EMERGENCY_REQUEST: "/tracking/emergency/request",
    EMERGENCY_HISTORY: "/tracking/emergency/history",
    EMERGENCY_ACKNOWLEDGE: (id: string) =>
      `/tracking/emergency/${id}/acknowledge`,
    EMERGENCY_RESOLVE: (id: string) => `/tracking/emergency/${id}/resolve`,
  },

  // Real-time Tracking
  REALTIME: {
    ACTIVE_USERS: "/realtime/active-users",
    ALL_ACTIVE_USERS: "/realtime/all-active-users",
    USER_LOCATION: (userId: string) => `/realtime/user/${userId}/location`,
    START_TRACKING: "/realtime/start-tracking",
    STOP_TRACKING: "/realtime/stop-tracking",
  },

  // Reports
  REPORTS: {
    USER_REPORT: "/reports/user",
    ORGANIZATION_REPORT: "/reports/organization",
    MONTHLY_REPORT: "/reports/monthly",
    DELIVERY_REPORT: "/reports/delivery",
  },

  // Packages
  PACKAGES: {
    BASE: "/packages",
    BY_ID: (id: string) => `/packages/${id}`,
    PURCHASE: "/packages/purchase",
  },

  // Payments
  PAYMENTS: {
    BASE: "/payments",
    CREATE_PAYMENT: "/payments/create",
    VERIFY_PAYMENT: "/payments/verify",
    PAYMENT_HISTORY: "/payments/history",
  },
} as const;

export const API_BASE_URL = config.API_BASE_URL;

export const getFullUrl = (endpoint: string): string => {
  return `${API_BASE_URL}${endpoint}`;
};
