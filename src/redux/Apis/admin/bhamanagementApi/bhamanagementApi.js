import { baseApi } from "@/redux/store/baseApi";

export const bhaManagementApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getBhaManagementDataQuery: builder.query({
      query: ({
        page = 1,
        limit = 10,
        search = "",
        status = "All Status",
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

        // Add isActive filter only if status is not "All Status"
        if (status !== "All Status") {
          const isActive = status === "Active" ? "true" : "false";
          params.append("isActive", isActive);
        }

        return {
          url: `/users/all-users?role=doctor&${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["BhaManagement"],
    }),
    usersByDoctorId: builder.query({
      query: ({ id }) => ({
        url: `/doctor/users-by-doctor/${id}`,
        method: "GET",
      }),
      providesTags: ["BhaManagement"],
    }),
    createBha: builder.mutation({
      query: (data) => ({
        url: `/users/create-doctor-assistant`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["BhaManagement"],
    }),
    blockBha: builder.mutation({
      query: ({ id }) => ({
        url: `/users/blocked/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["BhaManagement", "Dashboard"],
    }),
  }),
});

export const {
  useGetBhaManagementDataQueryQuery,
  useUsersByDoctorIdQuery,
  useBlockBhaMutation,
  useCreateBhaMutation,
} = bhaManagementApi;
