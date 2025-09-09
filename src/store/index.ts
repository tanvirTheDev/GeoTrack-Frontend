import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "./slices/auth/authApi";
import authSlice from "./slices/auth/authSlice";
import { organizationApi } from "./slices/organization/organizationApi";
import organizationSlice from "./slices/organization/organizationSlice";
import { organizationAdminApi } from "./slices/organizationAdmin/organizationAdminApi";
import organizationAdminSlice from "./slices/organizationAdmin/organizationAdminSlice";
import { packageApi } from "./slices/package/packageApi";
import packageSlice from "./slices/package/packageSlice";
import { paymentApi } from "./slices/payment/paymentApi";
import paymentSlice from "./slices/payment/paymentSlice";
import { reportApi } from "./slices/report/reportApi";
import reportSlice from "./slices/report/reportSlice";
import { trackingApi } from "./slices/tracking/trackingApi";
import trackingSlice from "./slices/tracking/trackingSlice";
import { userApi } from "./slices/user/userApi";
import userSlice from "./slices/user/userSlice";

export const store = configureStore({
  reducer: {
    // Slices
    auth: authSlice,
    organization: organizationSlice,
    organizationAdmin: organizationAdminSlice,
    user: userSlice,
    tracking: trackingSlice,
    report: reportSlice,
    package: packageSlice,
    payment: paymentSlice,

    // RTK Query APIs
    [authApi.reducerPath]: authApi.reducer,
    [organizationApi.reducerPath]: organizationApi.reducer,
    [organizationAdminApi.reducerPath]: organizationAdminApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [trackingApi.reducerPath]: trackingApi.reducer,
    [reportApi.reducerPath]: reportApi.reducer,
    [packageApi.reducerPath]: packageApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/PURGE",
          "persist/REGISTER",
        ],
      },
    })
      .concat(authApi.middleware)
      .concat(organizationApi.middleware)
      .concat(organizationAdminApi.middleware)
      .concat(userApi.middleware)
      .concat(trackingApi.middleware)
      .concat(reportApi.middleware)
      .concat(packageApi.middleware)
      .concat(paymentApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

// Setup listeners for RTK Query
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export store for use in components
export default store;
