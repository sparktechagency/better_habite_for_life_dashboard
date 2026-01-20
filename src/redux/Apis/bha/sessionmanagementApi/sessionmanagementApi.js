import { baseApi } from "@/redux/store/baseApi";

export const sessionmanagementApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getSessionManagementData: builder.query({
      query: ({
        page = 1,
        limit = 10,
        search = "",
        status = "All Status",
        date = "",
      } = {}) => {
        // Build query parameters
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
        });

        // Add search term if provided
        if (search) {
          params.append("searchTerm", search);
        }

        // Add status filter only if not "All Status"
        if (status && status !== "All Status") {
          params.append("status", status.toLowerCase());
        }

        // Add date filter if provided
        if (date) {
          params.append("date", date);
        }

        return {
          url: `/doctor-booking/my-booking?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["SessionManagement"],
    }),
    getSessionManagementDataById: builder.query({
      query: ({ id }) => ({
        url: `/doctor-booking/${id}`,
        method: "GET",
      }),
      providesTags: ["SessionManagement"],
    }),
  }),
});

export const {
  useGetSessionManagementDataQuery,
  useGetSessionManagementDataByIdQuery,
} = sessionmanagementApi;
