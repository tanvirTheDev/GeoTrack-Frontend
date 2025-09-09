import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "../components/common/Layout/AuthLayout";
import ForgotPassword from "../pages/auth/ForgotPassword/ForgotPassword";
import Login from "../pages/auth/Login/Login";

const AuthRoutes: React.FC = () => {
  return (
    <AuthLayout>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </AuthLayout>
  );
};

export default AuthRoutes;
