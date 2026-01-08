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
  }),
});

export const { useGetCourseDataQuery } = courseApi;
