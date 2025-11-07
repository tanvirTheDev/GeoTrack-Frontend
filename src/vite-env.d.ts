/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_SOCKET_URL: string;
  readonly VITE_GOOGLE_MAPS_API_KEY: string;
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_VERSION: string;
  readonly VITE_APP_ENVIRONMENT: string;
  readonly VITE_ENABLE_REAL_TIME_TRACKING: string;
  readonly VITE_ENABLE_EMERGENCY_FEATURES: string;
  readonly VITE_ENABLE_PAYMENT_INTEGRATION: string;
  readonly VITE_SSL_COMMERCE_STORE_ID: string;
  readonly VITE_SSL_COMMERCE_IS_SANDBOX: string;
  // add other variables here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
