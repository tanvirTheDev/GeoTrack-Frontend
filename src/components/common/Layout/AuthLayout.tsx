import React, { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
            GeoTrack
          </h1>
          <p className="text-white/90 text-sm">
            Real-time Delivery Tracking System
          </p>
        </div>
        {children}
        <div className="text-center mt-8">
          <p className="text-white/70 text-xs">
            &copy; 2024 GeoTrack. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
