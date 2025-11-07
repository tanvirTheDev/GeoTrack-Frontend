import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import NotFound from "../pages/shared/NotFound/NotFound";
import AdminRoutes from "./AdminRoutes";
import AuthRoutes from "./AuthRoutes";
import SuperAdminRoutes from "./SuperAdminRoutes";

const AppRoutes: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <AuthRoutes />;
  }

  // Determine which dashboard to show based on user role
  const getDefaultRoute = () => {
    console.log("User role in routing:", user?.role);
    if (user?.role === "SUPER_ADMIN") {
      console.log("Redirecting to Super Admin dashboard");
      return "/super-admin/dashboard";
    } else if (user?.role === "ORGANIZATION_ADMIN") {
      console.log("Redirecting to Organization Admin dashboard");
      return "/organization-admin/dashboard";
    } else {
      console.log("Redirecting to default admin dashboard");
      return "/delivery-user/dashboard"; // Default for delivery users
    }
  };

  return (
    <Routes>
      <Route path="/auth/*" element={<AuthRoutes />} />
      <Route path="/super-admin/*" element={<SuperAdminRoutes />} />
      <Route path="/organization-admin/*" element={<AdminRoutes />} />
      <Route path="/" element={<Navigate to={getDefaultRoute()} replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
