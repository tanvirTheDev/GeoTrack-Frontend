import { PaginationParams } from "./common.types";

export interface ReportFilters extends PaginationParams {
  organizationId?: string;
  userId?: string;
  startDate?: string;
  endDate?: string;
  packageType?: string;
  status?: string;
}

export interface DeliveryReport {
  id: string;
  userId: string;
  userName: string;
  organizationId: string;
  organizationName: string;
  deliveryDate: string;
  startLocation: {
    latitude: number;
    longitude: number;
    address: string;
  };
  endLocation: {
    latitude: number;
    longitude: number;
    address: string;
  };
  distance: number; // in kilometers
  duration: number; // in minutes
  status: "completed" | "in_progress" | "cancelled";
  emergencyRequests: number;
  averageSpeed: number; // km/h
  createdAt: string;
}

export interface MonthlyReport {
  month: string;
  year: number;
  organizationId: string;
  organizationName: string;
  totalDeliveries: number;
  totalDistance: number;
  totalDuration: number;
  averageSpeed: number;
  emergencyRequests: number;
  completedDeliveries: number;
  cancelledDeliveries: number;
  revenue: number;
  packageType: string;
  maxUsers: number;
  currentUsers: number;
}

export interface UserReport {
  userId: string;
  userName: string;
  organizationId: string;
  organizationName: string;
  totalDeliveries: number;
  totalDistance: number;
  totalDuration: number;
  averageSpeed: number;
  emergencyRequests: number;
  completedDeliveries: number;
  cancelledDeliveries: number;
  lastActiveDate: string;
  isActive: boolean;
  performanceScore: number; // 0-100
  createdAt: string;
}

export interface OrganizationReport {
  organizationId: string;
  organizationName: string;
  packageType: string;
  totalUsers: number;
  activeUsers: number;
  totalDeliveries: number;
  totalDistance: number;
  totalDuration: number;
  averageSpeed: number;
  emergencyRequests: number;
  revenue: number;
  subscriptionStartDate: string;
  subscriptionEndDate: string;
  isExpiring: boolean;
  daysUntilExpiry?: number;
}

export interface ReportSummary {
  totalOrganizations: number;
  totalUsers: number;
  totalDeliveries: number;
  totalDistance: number;
  totalDuration: number;
  averageSpeed: number;
  totalEmergencyRequests: number;
  totalRevenue: number;
  period: {
    startDate: string;
    endDate: string;
  };
}

export interface ReportChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
    fill?: boolean;
  }[];
}

export interface DeliveryChartData {
  dailyDeliveries: ReportChartData;
  monthlyDeliveries: ReportChartData;
  distanceDistribution: ReportChartData;
  speedDistribution: ReportChartData;
  emergencyTrends: ReportChartData;
  userActivity: ReportChartData;
}

export interface ReportExportOptions {
  format: "csv" | "excel" | "pdf";
  filename?: string;
  includeCharts?: boolean;
  dateRange?: {
    startDate: string;
    endDate: string;
  };
  organizationIds?: string[];
  userIds?: string[];
}

export interface ReportGenerationStatus {
  id: string;
  status: "pending" | "processing" | "completed" | "failed";
  progress: number; // 0-100
  downloadUrl?: string;
  error?: string;
  createdAt: string;
  completedAt?: string;
}

export interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  type: "delivery" | "user" | "organization" | "monthly";
  filters: ReportFilters;
  columns: string[];
  isDefault: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReportSchedule {
  id: string;
  name: string;
  templateId: string;
  frequency: "daily" | "weekly" | "monthly";
  dayOfWeek?: number; // 0-6 for weekly
  dayOfMonth?: number; // 1-31 for monthly
  time: string; // HH:MM format
  recipients: string[];
  isActive: boolean;
  lastRun?: string;
  nextRun: string;
  createdAt: string;
  updatedAt: string;
}
