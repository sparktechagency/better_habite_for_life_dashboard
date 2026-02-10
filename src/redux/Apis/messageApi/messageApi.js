import { baseApi } from "@/redux/store/baseApi";

export const messageApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: ({ chatId, page = 1, limit = 20 }) => ({
        url: `/message/my-messages/${chatId}`,
        method: "GET",
        params: { page, limit },
      }),
      providesTags: (result, error, { chatId }) => [
        { type: "Message", id: chatId },
      ],
    }),
    sendMessage: builder.mutation({
      query: (message) => ({
        url: `/message/send-messages`,
        method: "POST",
        body: message,
      }),
      invalidatesTags: ["Message"],
    }),
    seenMessage: builder.mutation({
      query: ({ chatId }) => ({
        url: `/message/seen/${chatId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Chat", "Message"],
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useSendMessageMutation,
  useSeenMessageMutation,
} = messageApi;
