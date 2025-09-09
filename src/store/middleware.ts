import { createListenerMiddleware } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "./index";

// Create the middleware instance
export const listenerMiddleware = createListenerMiddleware<
  RootState,
  AppDispatch
>();

// Basic middleware setup - can be extended later
// For now, we'll keep it simple to avoid build issues

export default listenerMiddleware;
