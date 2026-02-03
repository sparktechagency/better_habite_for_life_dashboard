import { baseApi } from "@/redux/store/baseApi";

export const targetdomainApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getTargetDomainData: builder.query({
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
          url: `/targeted-domain?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["TargetDomain"],
    }),
    // Get all categories without pagination limit (for dropdowns)
    getAllTargetDomains: builder.query({
      query: () => ({
        url: `/targeted-domain?limit=1000`,
        method: "GET",
      }),
      providesTags: ["TargetDomain"],
    }),
    createTargetDomain: builder.mutation({
      query: (data) => ({
        url: "/targeted-domain/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["TargetDomain"],
    }),
    updateTargetDomain: builder.mutation({
      query: ({ id, data }) => ({
        url: `/targeted-domain/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["TargetDomain"],
    }),
    deleteTargetDomain: builder.mutation({
      query: ({ id }) => ({
        url: `/targeted-domain/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TargetDomain"],
    }),
  }),
});

export const {
  useGetTargetDomainDataQuery,
  useGetAllTargetDomainsQuery,
  useCreateTargetDomainMutation,
  useUpdateTargetDomainMutation,
  useDeleteTargetDomainMutation,
} = targetdomainApi;
