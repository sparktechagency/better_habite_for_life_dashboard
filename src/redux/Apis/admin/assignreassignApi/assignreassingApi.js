import { baseApi } from "@/redux/store/baseApi";

export const assignreassingApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAllrequestForAssignReassign: builder.query({
      query: ({
        page = 1,
        limit = 10,
        search = "",
        status = "All Status",
      } = {}) => {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
        });

        if (search) {
          params.append("searchTerm", search);
        }

        if (status !== "All Status") {
          const isActive = status === "Active" ? "true" : "false";
          params.append("isActive", isActive);
        }

        return {
          url: `/bha-bhaa-reassign-request?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["AssignReassign"],
    }),

    getAllUsersForAssignReassign: builder.query({
      query: ({
        page = 1,
        limit = 10,
        search = "",
        status = "All Status",
        role = "",
      } = {}) => {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
        });

        if (search) {
          params.append("searchTerm", search);
        }

        if (status !== "All Status") {
          const isActive = status === "Active" ? "true" : "false";
          params.append("isActive", isActive);
        }

        if (role !== "All Role") {
          params.append("role", role);
        }

        return {
          url: `/users/all-users?role=${role}&${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["AssignReassign"],
    }),

    getRequestForAssignReassignById: builder.query({
      query: ({ id }) => ({
        url: `/bha-bhaa-reassign-request/${id}`,
        method: "GET",
      }),
      providesTags: ["AssignReassign"],
    }),
    approveRequestForAssignReassign: builder.mutation({
      query: ({ id, assignId }) => ({
        url: `/bha-bhaa-reassign-request/assign/${id}`,
        method: "PATCH",
        body: { assignId },
      }),
      invalidatesTags: ["AssignReassign"],
    }),
  }),
});

export const {
  useGetAllrequestForAssignReassignQuery,
  useGetAllUsersForAssignReassignQuery,
  useGetRequestForAssignReassignByIdQuery,
  useApproveRequestForAssignReassignMutation,
} = assignreassingApi;
