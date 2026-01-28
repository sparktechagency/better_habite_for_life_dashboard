import { baseApi } from "@/redux/store/baseApi";

export const policyApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getTermsAndConditions: builder.query({
      query: () => ({
        url: `/setting?termsOfService`,
        method: "GET",
      }),
      providesTags: ["Policy"],
    }),
    getPrivacyPolicy: builder.query({
      query: () => ({
        url: `/setting?privacyPolicy`,
        method: "GET",
      }),
      providesTags: ["Policy"],
    }),

    updatePolicy: builder.mutation({
      query: (formData) => ({
        url: `/setting`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["Policy"],
    }),
  }),
});

export const {
  useGetTermsAndConditionsQuery,
  useGetPrivacyPolicyQuery,
  useUpdatePolicyMutation,
} = policyApi;
