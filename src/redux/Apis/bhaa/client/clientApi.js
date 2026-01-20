import { baseApi } from "@/redux/store/baseApi";

export const clientApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getClient: builder.query({
      query: () => {
        return {
          url: `/task/client`,
          method: "GET",
        };
      },
      providesTags: ["BhaaClient"],
    }),

    getSingleClient: builder.query({
      query: (id) => {
        return {
          url: `/task/client/${id}`,
          method: "GET",
        };
      },
      providesTags: ["BhaaClient"],
    }),

    reminder: builder.mutation({
      query: (data) => {
        return {
          url: `/task/reminder`,
          method: "POST",
          body: data
        };
      },
      invalidatesTags: ["BhaaClient"],
    }),

  }),
});

export const { useGetClientQuery, useGetSingleClientQuery, useReminderMutation } = clientApi;
