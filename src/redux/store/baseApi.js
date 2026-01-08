import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie } from "@/utils/cookies";
import { baseUrl } from "./baseUrl";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl || process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: (headers, { endpoint, type }) => {
      // Get all tokens from cookies
      const accessToken = getCookie("accessToken");
      const token = getCookie("token");
      const verifyToken = getCookie("verifyToken");
      const forgetToken = getCookie("forgetToken");
      const resetPassToken = getCookie("resetPassToken");

      // Set Authorization header with accessToken (for authenticated requests)
      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }

      // Set token header for specific auth endpoints
      // resendOtp and verifyEmail use forgetToken
      if (endpoint === "resendOtp" || endpoint === "verifyEmail") {
        if (forgetToken) {
          headers.set("token", forgetToken);
        }
      }

      // resetPassword uses resetPassToken
      if (endpoint === "resetPassword") {
        if (resetPassToken) {
          headers.set("token", resetPassToken);
        }
      }

      // Legacy token support (if needed)
      if (token && !accessToken) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      // Legacy verifyToken support (if needed)
      if (verifyToken) {
        headers.set("resettoken", verifyToken);
      }

      // RTK Query automatically handles FormData and won't set Content-Type for it
      // Only set Content-Type for JSON requests (not for FormData)
      // Check if this is updateMyProfile mutation - it uses FormData
      const isUpdateMyProfile =
        endpoint === "updateMyProfile" && type === "mutation";

      // Set Content-Type only if not already set (FormData will have its own)
      // For updateMyProfile, we'll let RTK Query handle it automatically
      if (!isUpdateMyProfile && !headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
      }

      return headers;
    },
  }),
  tagTypes: ["Auth", "Profile", "Dashboard"],
  endpoints: () => ({}),
});
