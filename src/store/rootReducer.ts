import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./slices/auth/authSlice";
import organizationSlice from "./slices/organization/organizationSlice";
import packageSlice from "./slices/package/packageSlice";
import paymentSlice from "./slices/payment/paymentSlice";
import reportSlice from "./slices/report/reportSlice";
import trackingSlice from "./slices/tracking/trackingSlice";
import userSlice from "./slices/user/userSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  organization: organizationSlice,
  user: userSlice,
  tracking: trackingSlice,
  report: reportSlice,
  package: packageSlice,
  payment: paymentSlice,
});

export default rootReducer;
