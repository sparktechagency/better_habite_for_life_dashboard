import { baseApi } from "@/redux/store/baseApi";

export const taskMonitorApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAllTask: builder.query({
      query: (params = {}) => {
        const { page = 1, limit = 10, status, search } = params;
        let url = `/task?page=${page}&limit=${limit}`;

        if (status && status !== 'all') {
          url += `&status=${status}`;
        }

        if (search) {
          url += `&search=${search}`;
        }

        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["task"],
    }),

    getSingleTask: builder.query({
      query: (id) => {
        return {
          url: `/task/client/${id}`,
          method: "GET",
        };
      },
      providesTags: ["task"],
    }),

    taskReminder: builder.mutation({
      query: (data) => {
        return {
          url: `/task/reminder`,
          method: "POST",
          body: data
        };
      },
      invalidatesTags: ["task"],
    }),

  }),
});

export const {
  useGetAllTaskQuery,
  useGetSingleTaskQuery,
  useTaskReminderMutation,
  useLazyGetAllTaskQuery
} = taskMonitorApi;