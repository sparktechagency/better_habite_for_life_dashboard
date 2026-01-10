import { baseApi } from "@/redux/store/baseApi";

export const bhaaOverViewApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getBhaaOverview: builder.query({
      query: () => {
        return {
          url: `/task/overview`,
          method: "GET",
        };
      },
      providesTags: ["BHaaOverview"],
    }),
  }),
});

export const { useGetBhaaOverviewQuery } = bhaaOverViewApi;
