import { baseApi } from "@/redux/store/baseApi";

export const bhaReportApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getBhaReportData: builder.query({
      query: ({ page = 1, limit = 5 } = {}) => {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
        });

        return {
          url: `/task/report?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["BhaReport"],
    }),

    // Get all reports without limit (for View All page)
    getAllBhaReportData: builder.query({
      query: ({ search = "" } = {}) => {
        const params = new URLSearchParams();

        if (search) {
          params.append("searchTerm", search);
        }

        const queryString = params.toString();
        return {
          url: `/task/report${queryString ? `?${queryString}` : ""}`,
          method: "GET",
        };
      },
      providesTags: ["BhaReport"],
    }),

    giveBhaFeedback: builder.mutation({
      query: ({ userId, message }) => ({
        url: `/task/feedback`,
        method: "POST",
        body: { userId, message },
      }),
      invalidatesTags: ["BhaReport"],
    }),

    getBhaFeedback: builder.query({
      query: () => ({
        url: `/task/task-feedback`,
        method: "GET",
      }),
      providesTags: ["BhaReport"],
    }),

    // Get all feedbacks without limit (for View All Feedback page)
    getAllBhaFeedback: builder.query({
      query: ({ search = "" } = {}) => {
        const params = new URLSearchParams();

        if (search) {
          params.append("searchTerm", search);
        }

        const queryString = params.toString();
        return {
          url: `/task/task-feedback${queryString ? `?${queryString}` : ""}`,
          method: "GET",
        };
      },
      providesTags: ["BhaReport"],
    }),
  }),
});

export const {
  useGetBhaReportDataQuery,
  useGetAllBhaReportDataQuery,
  useGetBhaFeedbackQuery,
  useGetAllBhaFeedbackQuery,
  useGiveBhaFeedbackMutation,
} = bhaReportApi;
