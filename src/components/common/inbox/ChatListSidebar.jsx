"use client";
import { Search } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useChat, useAppDispatch } from "@/redux/hooks";
import {
  selectChat,
  setSearchQuery,
  fetchChatList,
} from "@/redux/features/chat/chatSlice";
import Image from "next/image";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

function ChatListSidebar() {
  const dispatch = useAppDispatch();

  const { chatList, selectedChat, isLoading, searchQuery, filteredChatList } =
    useChat();

  useEffect(() => {
    // Fetch chat list on component mount
    dispatch(fetchChatList());
  }, [dispatch]);

  const handleChatSelect = (chatId) => {
    dispatch(selectChat(chatId));
  };

  const handleSearchChange = (query) => {
    dispatch(setSearchQuery(query));
  };

  // Use filtered list if search query exists, otherwise use full list
  const displayChatList = searchQuery.trim() ? filteredChatList : chatList;

  return (
    <div className="lg:w-[30rem] bg-white flex flex-col h-auto lg:h-full border-b lg:border-b-0 lg:border-r border-gray-200">
      {/* Mobile Header with Search */}
      <div className="p-4 border-b border-gray-200">
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />
      </div>

      {/* Mobile: Horizontal Scrollable Chat List */}
      <div className="lg:hidden h-32">
        <ScrollArea className="w-full h-full">
          <HorizontalChatList
            chats={displayChatList}
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
            chats={displayChatList}
            selectedChat={selectedChat}
            onChatSelect={handleChatSelect}
            isLoading={isLoading}
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
      <div className="p-4">
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
              <Image
                src={chat.avatar}
                alt={chat.name}
                width={64}
                height={64}
                className={`w-12 h-12 md:w-16 md:h-16 rounded-full object-cover ${
                  selectedChat?.id === chat.id
                    ? "ring-3 ring-offset-2 ring-blue-500"
                    : ""
                }`}
              />
              {chat.isOnline && (
                <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
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

function ChatList({ chats, selectedChat, onChatSelect, isLoading }) {
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

  return (
    <div className="p-2">
      {chats.map((chat) => (
        <div
          key={chat.id}
          onClick={() => onChatSelect(chat.id)}
          className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 mb-1 ${
            selectedChat?.id === chat.id
              ? "bg-blue-500 text-white"
              : "hover:bg-gray-50"
          }`}
        >
          {/* Avatar with online status */}
          <div className="relative mr-3">
            <img
              src={chat.avatar}
              alt={chat.name}
              className="w-12 h-12 rounded-full object-cover"
            />
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
                className={`text-xs ml-2 ${
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

          {/* New message indicator */}
          {chat.hasNewMessage && selectedChat?.id !== chat.id && (
            <div className="w-2 h-2 bg-blue-500 rounded-full ml-2"></div>
          )}

          {/* Unread count */}
          {chat.unreadCount > 0 && selectedChat?.id !== chat.id && (
            <div className="ml-2 bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded-full min-w-[20px] text-center">
              {chat.unreadCount}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
