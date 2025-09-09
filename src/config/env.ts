export const config = {
  // API Configuration
  API_BASE_URL:
    process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api",
  SOCKET_URL: process.env.REACT_APP_SOCKET_URL || "http://localhost:5000",

  // Google Maps API
  GOOGLE_MAPS_API_KEY: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "",

  // App Configuration
  APP_NAME: process.env.REACT_APP_APP_NAME || "GeoTrack",
  VERSION: process.env.REACT_APP_VERSION || "1.0.0",
  ENVIRONMENT: process.env.REACT_APP_ENVIRONMENT || "development",

  // Feature Flags
  ENABLE_REAL_TIME_TRACKING:
    process.env.REACT_APP_ENABLE_REAL_TIME_TRACKING === "true",
  ENABLE_EMERGENCY_FEATURES:
    process.env.REACT_APP_ENABLE_EMERGENCY_FEATURES === "true",
  ENABLE_PAYMENT_INTEGRATION:
    process.env.REACT_APP_ENABLE_PAYMENT_INTEGRATION === "true",

  // SSL Commerce
  SSL_COMMERCE_STORE_ID: process.env.REACT_APP_SSL_COMMERCE_STORE_ID || "",
  SSL_COMMERCE_IS_SANDBOX:
    process.env.REACT_APP_SSL_COMMERCE_IS_SANDBOX === "true",

  // Default values
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
  TOKEN_REFRESH_INTERVAL: 14 * 60 * 1000, // 14 minutes
  SOCKET_RECONNECT_INTERVAL: 5000, // 5 seconds
  MAP_DEFAULT_ZOOM: 13,
  MAP_DEFAULT_CENTER: {
    lat: 23.8103, // Dhaka, Bangladesh
    lng: 90.4125,
  },
} as const;

export default config;
