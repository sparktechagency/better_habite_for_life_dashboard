import { baseApi } from "@/redux/store/baseApi";

export const bhadashboardApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getBhaDashboardData: builder.query({
      query: () => {
        return {
          url: `/task/overview`,
          method: "GET",
        };
      },
      providesTags: ["BHaDashboard"],
    }),
  }),
});

export const { useGetBhaDashboardDataQuery } = bhadashboardApi;
