import React from "react";
import { Route, Routes } from "react-router-dom";

import DashboardLayout from "../components/common/Layout/DashboardLayout";
import Profile from "../pages/shared/Profile/Profile";
import Settings from "../pages/shared/Settings/Settings";
import AllUsers from "../pages/superAdmin/AllUsers/AllUsers";
import SuperAdminDashboard from "../pages/superAdmin/Dashboard/Dashboard";
import OrganizationAdmins from "../pages/superAdmin/OrganizationAdmins/OrganizationAdmins";
import Organizations from "../pages/superAdmin/Organizations/Organizations";
import SuperAdminReports from "../pages/superAdmin/Reports/Reports";

const SuperAdminRoutes: React.FC = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<SuperAdminDashboard />} />
        <Route path="/dashboard" element={<SuperAdminDashboard />} />
        <Route path="/organizations" element={<Organizations />} />
        <Route path="/organization-admins" element={<OrganizationAdmins />} />
        <Route path="/users" element={<AllUsers />} />
        <Route path="/reports" element={<SuperAdminReports />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </DashboardLayout>
  );
};

export default SuperAdminRoutes;
