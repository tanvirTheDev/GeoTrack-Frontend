import React from "react";
import { ButtonProps } from "./Button.types";

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  isLoading = false,
  loadingText = "Loading...",
  leftIcon,
  rightIcon,
  fullWidth = false,
  rounded = false,
  children,
  className = "",
  disabled,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center font-medium text-center text-decoration-none vertical-align-middle cursor-pointer user-select-none border border-transparent transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-65 disabled:cursor-not-allowed";

  const variantClasses = {
    primary:
      "text-white bg-blue-600 border-blue-600 hover:bg-blue-700 hover:border-blue-700 focus:ring-blue-500",
    secondary:
      "text-white bg-gray-600 border-gray-600 hover:bg-gray-700 hover:border-gray-700 focus:ring-gray-500",
    success:
      "text-white bg-green-600 border-green-600 hover:bg-green-700 hover:border-green-700 focus:ring-green-500",
    warning:
      "text-black bg-yellow-400 border-yellow-400 hover:bg-yellow-500 hover:border-yellow-500 focus:ring-yellow-500",
    danger:
      "text-white bg-red-600 border-red-600 hover:bg-red-700 hover:border-red-700 focus:ring-red-500",
    info: "text-black bg-cyan-400 border-cyan-400 hover:bg-cyan-500 hover:border-cyan-500 focus:ring-cyan-500",
    light:
      "text-black bg-gray-100 border-gray-100 hover:bg-gray-200 hover:border-gray-200 focus:ring-gray-500",
    dark: "text-white bg-gray-800 border-gray-800 hover:bg-gray-900 hover:border-gray-900 focus:ring-gray-500",
    "outline-primary":
      "text-blue-600 border-blue-600 bg-transparent hover:bg-blue-600 hover:text-white focus:ring-blue-500",
    "outline-secondary":
      "text-gray-600 border-gray-600 bg-transparent hover:bg-gray-600 hover:text-white focus:ring-gray-500",
    "outline-success":
      "text-green-600 border-green-600 bg-transparent hover:bg-green-600 hover:text-white focus:ring-green-500",
    "outline-warning":
      "text-yellow-600 border-yellow-600 bg-transparent hover:bg-yellow-600 hover:text-black focus:ring-yellow-500",
    "outline-danger":
      "text-red-600 border-red-600 bg-transparent hover:bg-red-600 hover:text-white focus:ring-red-500",
    "outline-info":
      "text-cyan-600 border-cyan-600 bg-transparent hover:bg-cyan-600 hover:text-black focus:ring-cyan-500",
    "outline-light":
      "text-gray-100 border-gray-100 bg-transparent hover:bg-gray-100 hover:text-black focus:ring-gray-500",
    "outline-dark":
      "text-gray-800 border-gray-800 bg-transparent hover:bg-gray-800 hover:text-white focus:ring-gray-500",
  };

  const sizeClasses = {
    sm: "px-2 py-1 text-sm rounded",
    md: "px-3 py-2 text-base rounded-md",
    lg: "px-4 py-3 text-lg rounded-lg",
  };

  const widthClass = fullWidth ? "w-full" : "";
  const roundedClass = rounded ? "rounded-full" : "";
  const disabledClass =
    disabled || isLoading ? "opacity-65 cursor-not-allowed" : "";

  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    widthClass,
    roundedClass,
    disabledClass,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classes} disabled={disabled || isLoading} {...props}>
      {isLoading ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          {loadingText}
        </>
      ) : (
        <>
          {leftIcon && <span className="mr-2">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="ml-2">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};

export default Button;
