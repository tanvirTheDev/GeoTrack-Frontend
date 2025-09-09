import { Button } from "@/components/ui/button";
import {
  BarChart3,
  Building2,
  LogOut,
  MapPin,
  Menu,
  Package,
  Settings,
  Shield,
  User,
  Users,
  X,
} from "lucide-react";
import React, { ReactNode, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

interface DashboardLayoutProps {
  children: ReactNode;
}

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  roles: string[];
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Debug logging
  console.log("DashboardLayout - User:", user);
  console.log("DashboardLayout - IsAuthenticated:", isAuthenticated);
  console.log("DashboardLayout - IsLoading:", isLoading);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/auth/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Define navigation items based on user roles
  const navigationItems: NavigationItem[] = [
    {
      name: "Dashboard",
      href:
        user?.role === "SUPER_ADMIN"
          ? "/super-admin/dashboard"
          : "/admin/dashboard",
      icon: BarChart3,
      roles: ["SUPER_ADMIN", "ORGANIZATION_ADMIN", "DELIVERY_USER"],
    },
    {
      name: "Organizations",
      href: "/super-admin/organizations",
      icon: Building2,
      roles: ["SUPER_ADMIN"],
    },
    {
      name: "Organization Admins",
      href: "/super-admin/organization-admins",
      icon: Shield,
      roles: ["SUPER_ADMIN"],
    },
    {
      name: "Users",
      href:
        user?.role === "SUPER_ADMIN" ? "/super-admin/users" : "/admin/users",
      icon: Users,
      roles: ["SUPER_ADMIN", "ORGANIZATION_ADMIN"],
    },
    {
      name: "Live Tracking",
      href: "/admin/live-tracking",
      icon: MapPin,
      roles: ["SUPER_ADMIN", "ORGANIZATION_ADMIN", "DELIVERY_USER"],
    },
    {
      name: "Reports",
      href:
        user?.role === "SUPER_ADMIN"
          ? "/super-admin/reports"
          : "/admin/reports",
      icon: BarChart3,
      roles: ["SUPER_ADMIN", "ORGANIZATION_ADMIN"],
    },
    {
      name: "Packages",
      href: "/super-admin/packages",
      icon: Package,
      roles: ["SUPER_ADMIN"],
    },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: Settings,
      roles: ["SUPER_ADMIN", "ORGANIZATION_ADMIN"],
    },
  ];

  // Filter navigation items based on user role
  const filteredNavigationItems = navigationItems.filter((item) =>
    item.roles.includes(user?.role || "")
  );

  // Show loading state if user data is not available yet
  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case "SUPER_ADMIN":
        return "Super Admin";
      case "ORGANIZATION_ADMIN":
        return "Organization Admin";
      case "DELIVERY_USER":
        return "Delivery User";
      default:
        return "User";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <h1 className="text-xl font-bold text-gray-800">GeoTrack</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <nav className="mt-5 px-2">
          <div className="space-y-1">
            {filteredNavigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? "bg-blue-100 text-blue-700 border-r-2 border-blue-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon
                    className={`mr-3 h-5 w-5 ${
                      isActive
                        ? "text-blue-700"
                        : "text-gray-400 group-hover:text-gray-500"
                    }`}
                  />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between h-16 px-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-gray-400" />
                <div className="text-sm">
                  <span className="text-gray-500">Welcome, </span>
                  <span className="font-medium text-gray-900">
                    {user?.name || "User"}
                  </span>
                  <span className="text-gray-500 ml-1">
                    ({getRoleDisplayName(user?.role || "")})
                  </span>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center space-x-1"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
