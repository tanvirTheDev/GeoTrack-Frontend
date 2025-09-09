import { ApiResponse, PaginatedResponse } from "./common.types";

// Generic API response types
export type ApiSuccessResponse<T = any> = ApiResponse<T> & {
  success: true;
  data: T;
};

export type ApiErrorResponse = ApiResponse & {
  success: false;
  error: string;
  errors?: Record<string, string[]>;
};

export type ApiPaginatedSuccessResponse<T = any> = ApiSuccessResponse<
  PaginatedResponse<T>
>;

// HTTP Status codes
export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,
  TOO_MANY_REQUESTS = 429,
  INTERNAL_SERVER_ERROR = 500,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
}

// API Error types
export interface ApiError {
  status: number;
  message: string;
  code?: string;
  details?: any;
  timestamp: string;
  path: string;
}

export interface ValidationError {
  field: string;
  message: string;
  value?: any;
}

export interface ApiErrorDetails {
  errors: ValidationError[];
  timestamp: string;
  path: string;
  method: string;
}

// Request/Response interceptors
export interface RequestConfig {
  headers?: Record<string, string>;
  timeout?: number;
  retries?: number;
  retryDelay?: number;
}

export interface ResponseConfig {
  timeout?: number;
  retries?: number;
  retryDelay?: number;
}

// Socket events
export interface SocketEvents {
  // Connection events
  connect: () => void;
  disconnect: (reason: string) => void;
  reconnect: (attemptNumber: number) => void;
  reconnect_error: (error: Error) => void;
  reconnect_failed: () => void;

  // Tracking events
  location_update: (data: any) => void;
  emergency_request: (data: any) => void;
  emergency_acknowledged: (data: any) => void;
  emergency_resolved: (data: any) => void;
  tracking_started: (data: any) => void;
  tracking_stopped: (data: any) => void;

  // User events
  user_online: (data: any) => void;
  user_offline: (data: any) => void;
  user_joined: (data: any) => void;
  user_left: (data: any) => void;

  // Notification events
  notification: (data: any) => void;
  alert: (data: any) => void;
  message: (data: any) => void;

  // System events
  system_maintenance: (data: any) => void;
  system_update: (data: any) => void;
}

// API Client configuration
export interface ApiClientConfig {
  baseURL: string;
  timeout: number;
  retries: number;
  retryDelay: number;
  headers: Record<string, string>;
  interceptors: {
    request: Array<(config: any) => any>;
    response: Array<(response: any) => any>;
    error: Array<(error: any) => any>;
  };
}

// File upload types
export interface FileUploadConfig {
  maxSize: number; // in bytes
  allowedTypes: string[];
  multiple: boolean;
  compress: boolean;
  quality: number; // 0-1 for image compression
}

export interface UploadedFile {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  thumbnailUrl?: string;
  uploadedAt: string;
}

export interface FileUploadResponse {
  files: UploadedFile[];
  totalSize: number;
  uploadTime: number;
}

// Export/Download types
export interface ExportConfig {
  format: "csv" | "excel" | "pdf" | "json";
  filename?: string;
  includeHeaders?: boolean;
  dateRange?: {
    startDate: string;
    endDate: string;
  };
  filters?: Record<string, any>;
}

export interface ExportResponse {
  downloadUrl: string;
  filename: string;
  expiresAt: string;
  fileSize: number;
}

// Search and filter types
export interface SearchConfig {
  query: string;
  fields: string[];
  fuzzy?: boolean;
  caseSensitive?: boolean;
  limit?: number;
  offset?: number;
}

export interface FilterConfig {
  field: string;
  operator:
    | "eq"
    | "ne"
    | "gt"
    | "gte"
    | "lt"
    | "lte"
    | "in"
    | "nin"
    | "contains"
    | "startsWith"
    | "endsWith";
  value: any;
}

export interface SortConfig {
  field: string;
  direction: "asc" | "desc";
}

export interface QueryConfig {
  search?: SearchConfig;
  filters?: FilterConfig[];
  sort?: SortConfig[];
  pagination?: {
    page: number;
    limit: number;
  };
}

// Real-time data types
export interface RealtimeConfig {
  enabled: boolean;
  interval: number; // in milliseconds
  maxRetries: number;
  retryDelay: number;
}

export interface RealtimeData<T = any> {
  type: string;
  data: T;
  timestamp: string;
  userId?: string;
  organizationId?: string;
}

// Webhook types
export interface WebhookConfig {
  url: string;
  events: string[];
  secret?: string;
  isActive: boolean;
  retryCount: number;
  timeout: number;
}

export interface WebhookPayload {
  event: string;
  data: any;
  timestamp: string;
  signature?: string;
}

// Rate limiting
export interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
  skipSuccessfulRequests: boolean;
  skipFailedRequests: boolean;
}

export interface RateLimitInfo {
  limit: number;
  remaining: number;
  reset: number;
  retryAfter?: number;
}
