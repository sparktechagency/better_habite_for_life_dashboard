import { baseApi } from "@/redux/store/baseApi";

export const postApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getPostData: builder.query({
      query: ({ page = 1, limit = 10, filter = "popular" } = {}) => {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
        });

        // Add filter params based on selected filter
        if (filter === "popular") {
          params.append("popular", "true");
        } else if (filter === "highlights") {
          params.append("highlight", "true");
        } else if (filter === "recent") {
          params.append("recent", "true");
        }

        return {
          url: `/post?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Post"],
    }),
    getPostById: builder.query({
      query: ({ id }) => ({
        url: `/post/${id}`,
        method: "GET",
      }),
      providesTags: ["Post"],
    }),
    createPost: builder.mutation({
      query: (formData) => ({
        url: "/post/create-post",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Post"],
    }),
    highlightPost: builder.mutation({
      query: ({ postId }) => ({
        url: `/post/highlight/${postId}`,
        method: "POST",
      }),
      invalidatesTags: ["Post"],
    }),
    updateCourse: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/post/view-count/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["Post"],
    }),
    deletePost: builder.mutation({
      query: ({ id }) => ({
        url: `/post/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});

export const {
  useGetPostDataQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useGetPostByIdQuery,
  useHighlightPostMutation,
} = postApi;
