import { baseApi } from "@/redux/store/baseApi";
import { getCookie } from "@/utils/cookies";

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyProfile: builder.query({
      query: () => ({
        url: "/users/my-profile",
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),
    updateMyProfile: builder.mutation({
      query: (formData) => ({
        url: "/users/update-my-profile",
        method: "PATCH",
        body: formData,
        headers: {
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
});

export const { useGetMyProfileQuery, useUpdateMyProfileMutation } = baseApi;
