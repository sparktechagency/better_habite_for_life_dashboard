import { baseApi } from "@/redux/store/baseApi";

export const messageApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: ({ chatId }) => ({
        url: `/message/my-messages/${chatId}`,
        method: "GET",
      }),
      providesTags: ["Message"],
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
      query: ({chatId}) => ({
        url: `/message/seen/${chatId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Message"],
    }),
  }),
});

export const { useGetMessagesQuery, useSendMessageMutation, useSeenMessageMutation } = messageApi;
