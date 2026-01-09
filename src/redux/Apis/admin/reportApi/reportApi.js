import { baseApi } from "@/redux/store/baseApi";

export const reportApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getReportData: builder.query({
      query: ({ page = 1, limit = 10 } = {}) => {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
        });

        return {
          url: `/report?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Report"],
    }),
    solveReport: builder.mutation({
      query: ({ id }) => ({
        url: `/report/solved`,
        method: "POST",
        body: { reportId: id },
      }),
      invalidatesTags: ["Report"],
    }),
  }),
});

export const { useGetReportDataQuery, useSolveReportMutation } = reportApi;
