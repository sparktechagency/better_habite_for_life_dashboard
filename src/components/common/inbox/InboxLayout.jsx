"use client";
import React, { useMemo, useState } from "react";
import ChatListSidebar from "./ChatListSidebar";
import ChatInterface from "./ChatBoxLayout";
import { useGetChatListQuery } from "@/redux/Apis/chatApi/chatApi";
import { useAppSelector } from "@/redux/hooks";
import { useSearchParams } from "next/navigation";
import getImageUrl from "@/utils/getImageUrl";
  import { socket } from "@/socket/socket";
  import { useEffect } from "react";

function InboxLayout() {
  const { data: chatListResponse, isLoading: isChatListLoading, refetch: refetchChatList } =
    useGetChatListQuery();
  const searchParams = useSearchParams();
  const selectedChatId = searchParams.get("chatId");
  const [newMessage, setNewMessage] = useState(false);
  const [newMessageChatId, setNewMessageChatId] = useState(null);

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

  // Listen for messages in the selected chat
  useEffect(() => {
    if (!selectedChatId) return;
    
    socket.connect();
    const eventName = `new-message::${selectedChatId}`;
    
    const handleNewMessage = (message) => {
      console.log("new message received-----selected chat 📡", message);
      setNewMessage(true);
      setNewMessageChatId(selectedChatId);
      refetchChatList();
    };

    socket.on(eventName, handleNewMessage);

    return () => {
      socket.off(eventName, handleNewMessage);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedChatId]);

  // Listen for global messages (any chat) to show badge and refetch chat list
  useEffect(() => {
    if (!currentUserId || typeof window === "undefined") return;

    socket.connect();
    const globalEventName = `new-message::${currentUserId}`;
    
    const handleGlobalMessage = (message) => {
      console.log("new message received ----- global 📡", message);
      
      // Extract chatId from message if available
      const chatId = message?.chatId || message?.chat?._id || null;
      
      // Set badge state
      setNewMessage(true);
      setNewMessageChatId(chatId);
      
      // Refetch chat list to get updated unread counts
      refetchChatList();
    };

    socket.on(globalEventName, handleGlobalMessage);

    return () => {
      socket.off(globalEventName, handleGlobalMessage);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUserId]);

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-80px)] w-full">
      <ChatListSidebar
        chatList={allChats}
        isLoading={isChatListLoading}
        currentUserId={currentUserId}
        newMessage={newMessage}
        newMessageChatId={newMessageChatId}
        refetchChatList={refetchChatList}
      />
      <ChatInterface
        newMessage={newMessage}
        selectedChat={selectedChat}
        chatId={selectedChatId}
        currentUserId={currentUserId}
      />
    </div>
  );
}

export default InboxLayout;
