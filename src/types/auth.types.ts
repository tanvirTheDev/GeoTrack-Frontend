import { BaseEntity, UserRole } from "./common.types";

// Re-export UserRole for convenience
export type { UserRole };

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
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
  organizationId?: string;
  role: UserRole;
}

export interface ApiUser {
  id: string;
  name: string;
  email: string;
  role: "super_admin" | "organization_admin" | "delivery_user"; // API role format
  organizationId?: string;
  organizationName?: string;
  isActive?: boolean;
  lastLoginAt?: string;
  profileImage?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
}

export interface LoginResponse {
  user: ApiUser;
  tokens: {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  };
  dashboardUrl: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  lastActivity: string | null;
}

export interface AuthContextType {
  authState: AuthState;
  login: (credentials: LoginRequest) => Promise<void>;
  logout: () => void;
  logoutAll: () => Promise<void>;
  refreshToken: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (data: ResetPasswordRequest) => Promise<void>;
  changePassword: (data: ChangePasswordRequest) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  clearError: () => void;
}

export interface JwtPayload {
  userId: string;
  email: string;
  role: UserRole;
  organizationId?: string;
  iat: number;
  exp: number;
}

export interface TokenValidationResponse {
  valid: boolean;
  user?: User;
  expiresIn?: number;
}

export interface DashboardUrlResponse {
  url: string;
  role: UserRole;
}
