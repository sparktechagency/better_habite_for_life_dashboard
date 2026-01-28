"use client";
import { Search } from "lucide-react";
import React, { useState, useMemo, useCallback } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import getImageUrl from "@/utils/getImageUrl";
import formatTimeAgo from "@/utils/FormatDate/xtimesAgo";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useRouter, useSearchParams } from "next/navigation";
import { useSeenMessageMutation } from "@/redux/Apis/messageApi/messageApi";

function ChatListSidebar({ chatList = [], isLoading = false, currentUserId, newMessage, newMessageChatId, refetchChatList }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedChatId = searchParams.get("chatId");
  const [searchQuery, setSearchQuery] = useState("");
  const [seenMessage] = useSeenMessageMutation();

  // Transform API chat data to display format
  const transformedChats = useMemo(() => {
    return chatList.map((item) => {
      const { chat, message, unreadMessageCount } = item;
      // Find the other participant (not the current user)
      const otherParticipant =
        chat.participants.find((p) => p._id !== currentUserId) ||
        chat.participants[0];

      // Check if this chat has a new message badge
      const hasNewMessageBadge = newMessage && newMessageChatId === chat._id;
      
      return {
        id: chat._id,
        name: otherParticipant?.fullName || "Unknown",
        avatar: getImageUrl(otherParticipant?.profile) || "/default-avatar.png",
        lastMessage: message?.message || "No messages yet",
        timestamp: message?.createdAt ? formatTimeAgo(message.createdAt) : "",
        unreadCount: unreadMessageCount || 0,
        hasNewMessage: unreadMessageCount > 0 || hasNewMessageBadge,
        hasNewMessageBadge, // Flag to show badge even if unreadCount is 0
        isOnline: false, // You can add online status logic here
        status: chat.status,
        participants: chat.participants,
        otherParticipant,
      };
    });
  }, [chatList, currentUserId, newMessage, newMessageChatId]);

  // Get selected chat from transformed chats
  const selectedChat = useMemo(() => {
    return transformedChats.find((chat) => chat.id === selectedChatId) || null;
  }, [transformedChats, selectedChatId]);

  // Filter chats based on search query
  const filteredChats = useMemo(() => {
    if (!searchQuery.trim()) return transformedChats;
    return transformedChats.filter(
      (chat) =>
        chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [transformedChats, searchQuery]);

  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };

  const handleChatSelect = useCallback(async (chatId) => {
    // Prevent unnecessary API calls if the same chat is already selected
    if (!chatId || chatId === selectedChatId) {
      return;
    }
    
    // Update URL with chatId param first
    const params = new URLSearchParams(searchParams);
    params.set("chatId", chatId);
    router.push(`?${params.toString()}`);
    
    // Call seenMessage API when user selects a chat
    try {
      await seenMessage({ chatId }).unwrap();
      // Refetch chat list to update unread counts
      if (refetchChatList) {
        refetchChatList();
      }
    } catch (error) {
      console.log("Failed to mark messages as seen:", error);
    }
  }, [searchParams, router, refetchChatList, seenMessage, selectedChatId]);

  return (
    <div className="lg:w-[25rem] bg-white flex flex-col h-auto lg:h-full border-b lg:border-b-0 lg:border-r border-gray-200">
      {/* Mobile Header with Search */}
      <div className="p-5 border-b border-gray-200">
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />
      </div>

      {/* Mobile: Horizontal Scrollable Chat List */}
      <div className="lg:hidden h-fit">
        <ScrollArea className="w-full h-full">
          <HorizontalChatList
            chats={filteredChats}
            selectedChat={selectedChat}
            onChatSelect={handleChatSelect}
            isLoading={isLoading}
          />
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      {/* Desktop: Vertical Chat List */}
      <div className="flex-1 overflow-y-auto hidden lg:block">
        <ScrollArea className="h-full">
            <ChatList
            chats={filteredChats}
            selectedChat={selectedChat}
            onChatSelect={handleChatSelect}
            isLoading={isLoading}
            newMessage={newMessage}
            newMessageChatId={newMessageChatId}
          />
        </ScrollArea>
      </div>
    </div>
  );
}

export default ChatListSidebar;

function TotalMessageCount({ chatList }) {
  const totalUnread = chatList.reduce(
    (sum, chat) => sum + (chat.unreadCount || 0),
    0
  );

  return (
    <div className="flex items-center mb-4">
      <h2 className="text-lg font-semibold text-gray-900">Messages</h2>
      {totalUnread > 0 && (
        <span className="ml-2 bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded-full">
          {totalUnread}+
        </span>
      )}
    </div>
  );
}

function SearchBar({ searchQuery, onSearchChange }) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
      <input
        type="text"
        placeholder="Search for ..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full pl-10 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
      />
    </div>
  );
}

function HorizontalChatList({ chats, selectedChat, onChatSelect, isLoading }) {
  if (isLoading) {
    return (
      <div className="p-2">
        <div className="flex space-x-4 animate-pulse">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="flex flex-col items-center space-y-2 min-w-[80px]"
            >
              <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
              <div className="h-3 bg-gray-200 rounded w-12"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!chats || chats.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">No conversations yet</div>
    );
  }

  return (
    <div className="p-4">
      <div
        className="flex space-x-4 sm:pb-2"
        style={{ minWidth: "max-content" }}
      >
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onChatSelect(chat.id)}
            className={`flex flex-col items-center space-y-2 min-w-[80px] cursor-pointer transition-all duration-200`}
          >
            {/* Avatar with online status */}
            <div className="relative">
              <Avatar
                image={chat.avatar}
                alt={chat.name}
                className={`w-12 h-12 md:w-16 md:h-16 rounded-full object-cover ${
                  selectedChat?.id === chat.id
                    ? "ring-3 ring-offset-2 ring-blue-500"
                    : ""
                }`}
              />
              {chat.isOnline && (
                <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
              )}
              {(chat.unreadCount > 0 || chat.hasNewMessageBadge) && (
                <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-medium w-5 h-5 rounded-full flex items-center justify-center">
                  {chat.unreadCount > 0 ? chat.unreadCount : "!"}
                </div>
              )}
            </div>

            {/* Name */}
            <div className="text-center">
              <p
                className={`text-xs font-medium truncate max-w-[70px] ${
                  selectedChat?.id === chat.id
                    ? "text-gray-900"
                    : "text-gray-700"
                }`}
              >
                {chat.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChatList({ chats, selectedChat, onChatSelect, isLoading, newMessage, newMessageChatId }) {
  //Loading Skeleton
  if (isLoading) {
    return (
      <div className="p-4">
        <div className="animate-pulse space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  //No chats found
  if (!chats || chats.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        <p>No conversations yet</p>
      </div>
    );
  }

  return (
    <div className="p-2 max-w-sm">
      {chats.map((chat) => (
        <div
          key={chat.id}
          onClick={() => onChatSelect(chat.id)}
          className={`flex items-center p-3 max-w-sm rounded-lg cursor-pointer transition-all duration-200 mb-1 ${
            selectedChat?.id === chat.id
              ? "bg-blue-500 text-white"
              : "hover:bg-gray-50"
          }`}
        >
          {/* Avatar with online status */}
          <div className="relative mr-3">
            <Avatar
              image={chat.avatar}
              className="w-12 h-12 rounded-full object-cover"
            >
              <AvatarImage src={chat.avatar} />
              <AvatarFallback>{chat.name.split(" ")[0][0]}</AvatarFallback>
            </Avatar>
            {chat.isOnline && (
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
            )}
          </div>

          {/* Chat info */}
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-1">
              <h3
                className={`font-semibold text-sm truncate ${
                  selectedChat?.id === chat.id ? "text-white" : "text-gray-900"
                }`}
              >
                {chat.name}
              </h3>
              <span
                className={`text-xs ml-2 whitespace-nowrap ${
                  selectedChat?.id === chat.id
                    ? "text-blue-100"
                    : "text-gray-500"
                }`}
              >
                {chat.timestamp}
              </span>
            </div>

            <p
              className={`text-sm truncate ${
                selectedChat?.id === chat.id ? "text-blue-100" : "text-gray-600"
              }`}
            >
              {chat.lastMessage || "No recent message"}
            </p>
          </div>

          {/* Unread count badge */}
          {((chat.unreadCount > 0 || chat.hasNewMessageBadge) && selectedChat?.id !== chat.id) && (
            <div className="ml-2 bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded-full min-w-[20px] text-center">
              {chat.unreadCount > 0 ? chat.unreadCount : "!"}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
