"use client";
import React, { useMemo } from "react";
import ChatListSidebar from "./ChatListSidebar";
import ChatInterface from "./ChatBoxLayout";
import { useGetChatListQuery } from "@/redux/Apis/chatApi/chatApi";
import { useAppSelector } from "@/redux/hooks";
import { useSearchParams } from "next/navigation";
import getImageUrl from "@/utils/getImageUrl";

function InboxLayout() {
  const { data: chatListResponse, isLoading: isChatListLoading } =
    useGetChatListQuery();
  const searchParams = useSearchParams();
  const selectedChatId = searchParams.get("chatId");

  // Get current user ID from Redux store
  const currentUser = useAppSelector((state) => state.currentUser?.user);
  const currentUserId = currentUser?._id || currentUser?.id;

  // Combine pinned and unpinned chats
  const allChats = [
    ...(chatListResponse?.data?.pinned || []),
    ...(chatListResponse?.data?.unpinned || []),
  ];

  // Find selected chat and transform it for display
  const selectedChat = useMemo(() => {
    if (!selectedChatId || allChats.length === 0) return null;

    const chatItem = allChats.find((item) => item.chat._id === selectedChatId);
    if (!chatItem) return null;

    const { chat } = chatItem;
    const otherParticipant =
      chat.participants.find((p) => p._id !== currentUserId) ||
      chat.participants[0];

    return {
      id: chat._id,
      name: otherParticipant?.fullName || "Unknown",
      avatar: getImageUrl(otherParticipant?.profile) || "/default-avatar.png",
      email: otherParticipant?.email || "",
      phone: otherParticipant?.phone || "",
      role: otherParticipant?.role || "",
      status: chat.status,
      participants: chat.participants,
    };
  }, [allChats, selectedChatId, currentUserId]);

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-80px)] w-full">
      <ChatListSidebar
        chatList={allChats}
        isLoading={isChatListLoading}
        currentUserId={currentUserId}
      />
      <ChatInterface
        selectedChat={selectedChat}
        chatId={selectedChatId}
        currentUserId={currentUserId}
      />
    </div>
  );
}

export default InboxLayout;
