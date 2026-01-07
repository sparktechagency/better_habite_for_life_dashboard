import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const changePasswordApi = createApi({
  reducerPath: "changePasswordApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
  endpoints: (builder) => ({
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/api/v1/auth/change-password",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useChangePasswordMutation } = changePasswordApi;
