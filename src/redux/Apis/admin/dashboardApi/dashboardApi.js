import { baseApi } from "@/redux/store/baseApi";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardData: builder.query({
      query: () => ({
        url: "/payment/overview-all",
        method: "GET",
      }),
      providesTags: ["Dashboard"],
    }),
  }),
});

export const { useGetDashboardDataQuery } = dashboardApi;
