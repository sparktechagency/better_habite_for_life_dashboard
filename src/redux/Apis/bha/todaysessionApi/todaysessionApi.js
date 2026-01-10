import { baseApi } from "@/redux/store/baseApi";

export const todaysessionApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getTodaysSessionData: builder.query({
      query: ({ date }) => ({
        url: `/doctor-booking/my-booking?date=${date}`,
        method: "GET",
      }),
      providesTags: ["TodaysSession"],
    }),

    // Get all sessions with pagination
    getAllSessionData: builder.query({
      query: ({ page = 1, limit = 10, search = "", status = "" } = {}) => {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
        });

        if (search) {
          params.append("searchTerm", search);
        }

        if (status && status !== "All Status") {
          params.append("status", status.toLowerCase());
        }

        return {
          url: `/doctor-booking/my-booking?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["TodaysSession"],
    }),
  }),
});

export const { useGetTodaysSessionDataQuery, useGetAllSessionDataQuery } =
  todaysessionApi;
