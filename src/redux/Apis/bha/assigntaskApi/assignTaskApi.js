import { baseApi } from "@/redux/store/baseApi";

export const assignTaskApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAssignTaskData: builder.query({
      query: ({ id }) => ({
        url: `/task/schedule/${id}`,
        method: "GET",
      }),
      providesTags: ["AssignTask"],
    }),
    createTask: builder.mutation({
      query: (formData) => ({
        url: "/task/create-task",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["AssignTask"],
    }),
    // updateTask: builder.mutation({
    //   query: ({ id, formData }) => ({
    //     url: `/task/update-task/${id}`,
    //     method: "PATCH",
    //     body: formData,
    //   }),
    //   invalidatesTags: ["AssignTask"],
    // }),
    deleteTask: builder.mutation({
      query: ({ id }) => ({
        url: `/task/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AssignTask"],
    }),
  }),
});

export const {
  useGetAssignTaskDataQuery,
  useCreateTaskMutation,
  useDeleteTaskMutation,
} = assignTaskApi;
