import React, { createContext, ReactNode, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  useGetProfileQuery,
  useLoginMutation,
  useLogoutMutation,
} from "../store/slices/auth/authApi";
import {
  clearError,
  logout,
  setTokens,
  setUser,
} from "../store/slices/auth/authSlice";
import { LoginRequest, User } from "../types/auth.types";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (
    credentials: LoginRequest
  ) => Promise<{ user: User; dashboardUrl: string } | undefined>;
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, isLoading, error } = useSelector(
    (state: RootState) => state.auth
  );

  const [loginMutation, { isLoading: isLoginLoading }] = useLoginMutation();
  const [logoutMutation] = useLogoutMutation();

  // Get profile if user is authenticated but no user data
  const { data: profileData, isLoading: isProfileLoading } = useGetProfileQuery(
    undefined,
    {
      skip: !isAuthenticated || !!user,
      refetchOnMountOrArgChange: false,
    }
  );

  // Update user data when profile is fetched
  useEffect(() => {
    if (profileData?.data && !user) {
      dispatch(setUser(profileData.data));
    }
  }, [profileData, user, dispatch]);

  const login = async (credentials: LoginRequest) => {
    try {
      const response = await loginMutation(credentials).unwrap();
      if (response.success && response.data) {
        const { user: apiUser, tokens } = response.data;
        const { accessToken, refreshToken } = tokens;

        // Map API user to internal User format
        // Convert role from API format to our enum format
        let mappedRole: "SUPER_ADMIN" | "ORGANIZATION_ADMIN" | "DELIVERY_USER";
        switch (apiUser.role) {
          case "super_admin":
            mappedRole = "SUPER_ADMIN";
            break;
          case "organization_admin":
            mappedRole = "ORGANIZATION_ADMIN";
            break;
          case "delivery_user":
            mappedRole = "DELIVERY_USER";
            break;
          default:
            mappedRole = "DELIVERY_USER"; // Default fallback
        }

        const user: User = {
          _id: apiUser.id,
          name: apiUser.name,
          email: apiUser.email,
          role: mappedRole,
          organizationId: apiUser.organizationId,
          organizationName: apiUser.organizationName,
          isActive: apiUser.isActive ?? true,
          lastLoginAt: apiUser.lastLoginAt,
          profileImage: apiUser.profileImage,
          address: apiUser.address,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        console.log(
          "Mapped user role:",
          mappedRole,
          "from API role:",
          apiUser.role
        );

        dispatch(setUser(user));
        dispatch(setTokens({ accessToken, refreshToken }));

        // Store user in localStorage for SocketContext
        localStorage.setItem("user", JSON.stringify(user));

        console.log("🔑 AuthContext - Tokens stored:", {
          accessToken: accessToken ? "Present" : "Missing",
          refreshToken: refreshToken ? "Present" : "Missing",
        });

        // Return user data and dashboard URL for the component to handle redirect
        return { user, dashboardUrl: response.data.dashboardUrl };
      }
    } catch (error: any) {
      throw new Error(error.data?.message || "Login failed");
    }
  };

  const handleLogout = async () => {
    try {
      await logoutMutation().unwrap();
    } catch (error) {
      // Continue with logout even if API call fails
    } finally {
      // Clear localStorage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");

      dispatch(logout());

      // Redirect to login
      window.location.href = "/login";
    }
  };

  const handleClearError = () => {
    dispatch(clearError());
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading: isLoading || isLoginLoading || isProfileLoading,
    error,
    login,
    logout: handleLogout,
    clearError: handleClearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
