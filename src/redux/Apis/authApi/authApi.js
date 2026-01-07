import { baseApi } from "@/redux/store/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/forgot-password-otp",
        method: "POST",
        body: data,
      }),
    }),
    verifyEmail: builder.mutation({
      query: (data) => ({
        url: "/auth/forgot-password-otp-match",
        method: "PATCH",
        body: data,
      }),
    }),
    resendOtp: builder.mutation({
      query: () => ({
        url: "/otp/resend-otp",
        method: "PATCH",
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/forgot-password-reset",
        method: "PATCH",
        body: data,
      }),
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useVerifyEmailMutation,
  useResendOtpMutation,
  useResetPasswordMutation,
} = authApi;
