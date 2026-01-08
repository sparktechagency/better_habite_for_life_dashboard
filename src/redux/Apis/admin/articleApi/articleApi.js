import { baseApi } from "@/redux/store/baseApi";

export const articleApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getArticleData: builder.query({
      query: ({ page = 1, limit = 10, searchText = "" } = {}) => {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
        });

        // Add search term if provided
        if (searchText) {
          params.append("searchTerm", searchText);
        }

        return {
          url: `/article?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Article"],
    }),
    getArticleById: builder.query({
      query: ({ id }) => ({
        url: `/article/${id}`,
        method: "GET",
      }),
      providesTags: ["Article"],
    }),

    createArticle: builder.mutation({
      query: (formData) => ({
        url: "/article/create-article",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Article"],
    }),
    updateArticle: builder.mutation({
      query: ({ id, formData }) => {
        // Debug log
        console.log("updateArticle mutation - id:", id);
        console.log("updateArticle mutation - formData:", formData);
        if (formData instanceof FormData) {
          console.log("FormData entries in mutation:");
          for (const [key, value] of formData.entries()) {
            console.log(
              "  ",
              key,
              ":",
              value instanceof File ? `File(${value.name})` : value
            );
          }
        }
        return {
          url: `/article/${id}`,
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: ["Article"],
    }),
    deleteArticle: builder.mutation({
      query: ({ id }) => ({
        url: `/article/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Article"],
    }),
  }),
});

export const {
  useGetArticleDataQuery,
  useGetArticleByIdQuery,
  useCreateArticleMutation,
  useUpdateArticleMutation,
  useDeleteArticleMutation,
} = articleApi;
