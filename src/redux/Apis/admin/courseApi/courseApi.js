import { baseApi } from "@/redux/store/baseApi";

export const courseApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getCourseData: builder.query({
      query: ({ page = 1, limit = 10 } = {}) => ({
        url: `/course?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["Course"],
    }),
    getCourseById: builder.query({
      query: ({ id }) => ({
        url: `/course/${id}`,
        method: "GET",
      }),
      providesTags: ["Course"],
    }),
    createCourse: builder.mutation({
      query: (formData) => ({
        url: "/course/create-course",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Course"],
    }),
    updateCourse: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/course/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["Course"],
    }),
    deleteCourse: builder.mutation({
      query: ({ id }) => ({
        url: `/course/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Course"],
    }),
  }),
});

export const {
  useGetCourseDataQuery,
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
  useGetCourseByIdQuery,
} = courseApi;
