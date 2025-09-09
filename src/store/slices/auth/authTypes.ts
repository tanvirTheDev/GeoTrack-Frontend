import { User, UserRole } from "../../../types/auth.types";

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  lastActivity: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
  clearError: () => void;
}

export interface Permission {
  resource: string;
  action: string;
  conditions?: Record<string, any>;
}

export interface RolePermissions {
  role: UserRole;
  permissions: Permission[];
}

export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  SUPER_ADMIN: [
    "organizations:read",
    "organizations:create",
    "organizations:update",
    "organizations:delete",
    "users:read",
    "users:create",
    "users:update",
    "users:delete",
    "reports:read",
    "reports:export",
    "packages:read",
    "packages:create",
    "packages:update",
    "packages:delete",
    "payments:read",
    "payments:create",
    "payments:update",
    "tracking:read",
    "tracking:live",
    "emergency:read",
    "emergency:acknowledge",
    "emergency:resolve",
  ],
  ORGANIZATION_ADMIN: [
    "users:read",
    "users:create",
    "users:update",
    "users:delete",
    "tracking:read",
    "tracking:live",
    "emergency:read",
    "emergency:acknowledge",
    "emergency:resolve",
    "reports:read",
    "reports:export",
  ],
  DELIVERY_USER: [
    "tracking:create",
    "tracking:read",
    "emergency:create",
    "emergency:read",
  ],
};

export const hasPermission = (
  userRole: UserRole,
  permission: string
): boolean => {
  return ROLE_PERMISSIONS[userRole]?.includes(permission) || false;
};

export const hasAnyPermission = (
  userRole: UserRole,
  permissions: string[]
): boolean => {
  return permissions.some((permission) => hasPermission(userRole, permission));
};

export const hasAllPermissions = (
  userRole: UserRole,
  permissions: string[]
): boolean => {
  return permissions.every((permission) => hasPermission(userRole, permission));
};
