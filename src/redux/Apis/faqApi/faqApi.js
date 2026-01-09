import { baseApi } from "@/redux/store/baseApi";

export const faqApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getFaqData: builder.query({
      query: ({ page = 1, limit = 10 } = {}) => {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
        });

        return {
          url: `/faq?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Faq"],
    }),
    getFaqById: builder.query({
      query: ({ id }) => ({
        url: `/faq/${id}`,
        method: "GET",
      }),
      providesTags: ["Faq"],
    }),
    createFaq: builder.mutation({
      query: (formData) => ({
        url: "/faq/create-faq",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Faq"],
    }),
    updateFaq: builder.mutation({
      query: ({ id, data }) => ({
        url: `/faq/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Faq"],
    }),
    deleteFaq: builder.mutation({
      query: ({ id }) => ({
        url: `/faq/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Faq"],
    }),
  }),
});

export const {
  useGetFaqDataQuery,
  useCreateFaqMutation,
  useUpdateFaqMutation,
  useDeleteFaqMutation,
  useGetFaqByIdQuery,
} = faqApi;
