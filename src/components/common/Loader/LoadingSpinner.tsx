import React from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  fullScreen?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  text = "Loading...",
  fullScreen = false,
}) => {
  const containerClass = fullScreen
    ? "fixed inset-0 flex items-center justify-center bg-white bg-opacity-90 z-50"
    : "flex items-center justify-center p-8";

  const sizeClasses = {
    sm: "h-5 w-5",
    md: "h-10 w-10",
    lg: "h-15 w-15",
  };

  return (
    <div className={containerClass}>
      <div className="flex flex-col items-center gap-4">
        <div
          className={`animate-spin rounded-full border-3 border-gray-300 border-t-blue-600 ${sizeClasses[size]}`}
        ></div>
        {text && <p className="text-sm text-gray-500 text-center">{text}</p>}
      </div>
    </div>
  );
};

export default LoadingSpinner;
