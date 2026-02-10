import { baseApi } from "@/redux/store/baseApi";

export const chatApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getChatList: builder.query({
      query: () => ({
        url: "/chat/my-chat-list",
        method: "GET",
      }),
      providesTags: ["Chat", "Message"],
    }),
    createChat: builder.mutation({
      query: (participantIds) => ({
        url: "/chat",
        method: "POST",
        body: { participantIds },
      }),
      invalidatesTags: ["Chat"],
    }),

    deleteChat: builder.mutation({
      query: ({ id }) => ({
        url: `/chat/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Chat"],
    }),
  }),
});

export const {
  useGetChatListQuery,
  useCreateChatMutation,
  useDeleteChatMutation,
} = chatApi;
