import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { config } from "../config/env";
import { RefreshTokenResponse } from "../types/auth.types";

const baseQuery = fetchBaseQuery({
  baseUrl: config.API_BASE_URL,
  prepareHeaders: (headers, { endpoint }) => {
    // Skip auth for login and refresh token endpoints
    if (endpoint === "login" || endpoint === "refreshToken") {
      headers.set("content-type", "application/json");
      return headers;
    }

    const token = localStorage.getItem("accessToken");
    console.log(
      "🔑 Token for endpoint:",
      endpoint,
      ":",
      token ? "Present" : "Missing"
    );
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    headers.set("content-type", "application/json");
    return headers;
  },
});

export const baseQueryWithReauth = async (
  args: any,
  api: any,
  extraOptions: any
) => {
  let result = await baseQuery(args, api, extraOptions);

  // Log errors for debugging
  if (result.error) {
    console.error("🚨 API Error:", {
      status: result.error.status,
      data: result.error.data,
      endpoint: args.url,
      method: args.method,
    });
  }

  if (result.error && result.error.status === 401) {
    console.log("🚨 401 Unauthorized error, attempting token refresh...");
    // Try to get a new token
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      console.log("🔄 Attempting to refresh token...");
      const refreshResult = await baseQuery(
        {
          url: "/auth/refresh-token",
          method: "POST",
          body: { refreshToken },
        },
        api,
        extraOptions
      );

      if (refreshResult.data) {
        console.log(
          "✅ Token refresh successful, retrying original request..."
        );
        const { accessToken, refreshToken: newRefreshToken } =
          refreshResult.data as RefreshTokenResponse;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        // Retry the original query with new token
        result = await baseQuery(args, api, extraOptions);
      } else {
        console.log("❌ Token refresh failed, logging out user...");
        // Refresh failed, logout user
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
        api.dispatch({ type: "auth/logout" });
        // Redirect to login
        window.location.href = "/login";
      }
    } else {
      console.log("❌ No refresh token available, logging out user...");
      // No refresh token, logout user
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      api.dispatch({ type: "auth/logout" });
      window.location.href = "/login";
    }
  }

  return result;
};
