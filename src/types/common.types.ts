// Common types used across the application

export interface BaseEntity {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  errors?: Record<string, string[]>;
}

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface TableColumn<T = any> {
  key: keyof T | string;
  title: string;
  dataIndex?: keyof T | string;
  render?: (value: any, record: T, index: number) => React.ReactNode;
  sorter?: boolean;
  filterable?: boolean;
  width?: string | number;
  align?: "left" | "center" | "right";
  fixed?: "left" | "right";
}

export interface FilterOption {
  key: string;
  label: string;
  type: "text" | "select" | "date" | "dateRange" | "number";
  options?: SelectOption[];
  placeholder?: string;
}

export interface DateRange {
  startDate: string;
  endDate: string;
}

// Re-export Location from tracking.types to avoid duplication
export type { Location } from "./tracking.types";

export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  coordinates?: Location;
}

export interface DeviceInfo {
  model?: string;
  os?: string;
  appVersion?: string;
  batteryLevel?: number;
  networkType?: "wifi" | "4g" | "5g" | "3g" | "2g" | "unknown";
}

export interface NotificationData {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

export interface BreadcrumbItem {
  title: string;
  path?: string;
  active?: boolean;
}

export interface MenuItem {
  key: string;
  title: string;
  icon?: string;
  path?: string;
  children?: MenuItem[];
  permission?: string;
  badge?: number;
  disabled?: boolean;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
  }[];
}

export interface ExportOptions {
  format: "csv" | "excel" | "pdf";
  filename?: string;
  includeHeaders?: boolean;
  dateRange?: DateRange;
}

export type LoadingState = "idle" | "loading" | "succeeded" | "failed";

export type UserRole = "SUPER_ADMIN" | "ORGANIZATION_ADMIN" | "DELIVERY_USER";

export type OrganizationStatus = "active" | "inactive" | "suspended";

export type PackageType = "basic" | "premium" | "platinum";

export type EmergencyPriority = "low" | "medium" | "high" | "critical";

export type EmergencyStatus = "pending" | "acknowledged" | "resolved";

export type TrackingStatus = "active" | "inactive" | "paused";

export type PaymentStatus =
  | "pending"
  | "completed"
  | "failed"
  | "cancelled"
  | "refunded";
