import { baseApi } from "@/redux/store/baseApi";

export const notificationApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: ({ page = 1, limit = 10,roleWiseEndpoint } = {}) => {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
        });
        return {
          url: `/notification${roleWiseEndpoint}?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Notification"],
    }),

    markAsRead: builder.mutation({
      query: (id) => ({
        url: `/notification/read/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Notification"],
    }),
    markAllAsRead: builder.mutation({
      query: () => ({
        url: `/notification/all-read`,
        method: "POST",
      }),
      invalidatesTags: ["Notification"],
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useMarkAsReadMutation,
  useMarkAllAsReadMutation,
} = notificationApi;
