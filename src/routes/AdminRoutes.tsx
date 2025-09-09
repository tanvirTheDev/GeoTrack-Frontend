import React from "react";
import { Route, Routes } from "react-router-dom";
import DashboardLayout from "../components/common/Layout/DashboardLayout";
import Dashboard from "../pages/admin/Dashboard/Dashboard";
import DeliveryUsers from "../pages/admin/DeliveryUsers/DeliveryUsers";
import EmergencyRequests from "../pages/admin/EmergencyRequests/EmergencyRequests";
import LiveTracking from "../pages/admin/LiveTracking/LiveTracking";
import Reports from "../pages/admin/Reports/Reports";
import TrackingHistory from "../pages/admin/TrackingHistory/TrackingHistory";
import Profile from "../pages/shared/Profile/Profile";
import Settings from "../pages/shared/Settings/Settings";

const AdminRoutes: React.FC = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/delivery-users" element={<DeliveryUsers />} />
        <Route path="/live-tracking" element={<LiveTracking />} />
        <Route path="/tracking-history" element={<TrackingHistory />} />
        <Route path="/emergency-requests" element={<EmergencyRequests />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </DashboardLayout>
  );
};

export default AdminRoutes;
