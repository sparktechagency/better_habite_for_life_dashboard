import { baseApi } from "@/redux/store/baseApi";

export const categoryApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getCategoryData: builder.query({
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
          url: `/category?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Category"],
    }),
    createCategory: builder.mutation({
      query: (formData) => ({
        url: "/category/create-category",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Category"],
    }),
    updateCategory: builder.mutation({
      query: ({ id, formData }) => {
        // Debug log
        console.log("updateCategory mutation - id:", id);
        console.log("updateCategory mutation - formData:", formData);
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
          url: `/category/${id}`,
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: ["Category"],
    }),
    deleteCategory: builder.mutation({
      query: ({ id }) => ({
        url: `/category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useGetCategoryDataQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
