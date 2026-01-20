"use client";
import React, { useState, useRef, useEffect, useMemo } from "react";
import { Send, Paperclip, Image as ImageIcon } from "lucide-react";
import ChatHeader from "./ChatHeader";
import {
  useGetMessagesQuery,
  useSendMessageMutation,
} from "@/redux/Apis/messageApi/messageApi";
import getImageUrl from "@/utils/getImageUrl";
import formatTimeAgo from "@/utils/FormatDate/xtimesAgo";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { getCookie } from "@/utils/cookies";
const ChatInterface = ({ selectedChat, chatId, currentUserId }) => {
  const { data: messagesResponse, isLoading: isMessagesLoading } =
    useGetMessagesQuery({ chatId }, { skip: !chatId });
  const [sendMessageApi, { isLoading: isSendingMessage }] =
    useSendMessageMutation();
  const receiverId = getCookie("user_id");
  // Get messages from API response - reverse to show oldest first
  const currentMessages = useMemo(() => {
    const messages = messagesResponse?.data?.newResult?.result || [];
    // Reverse to show oldest messages first (API returns newest first)
    return [...messages].reverse();
  }, [messagesResponse]);

  const [newMessage, setNewMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  };

  useEffect(() => {
    // Add a small delay to ensure DOM is updated
    const timeoutId = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timeoutId);
  }, [currentMessages]);

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }
      // Validate file size (e.g., max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB");
        return;
      }
      setSelectedImage(file);
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSendMessage = async () => {
    if ((newMessage.trim() === "" && !selectedImage) || !chatId) return;

    const messageText = newMessage;
    const imageFile = selectedImage;

    // Clear inputs
    setNewMessage("");
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    try {
      // If image is selected, send as FormData
      if (imageFile) {
        const formData = new FormData();
        formData.append("chatId", chatId);
        if (messageText.trim()) {
          formData.append("message", messageText);
        }
        formData.append("image", imageFile);

        await sendMessageApi(formData).unwrap();
      } else {
        // Send text only as JSON
        await sendMessageApi({
          chatId: chatId,
          message: messageText,
        }).unwrap();
      }
    } catch (error) {
      // Restore the message if sending failed
      setNewMessage(messageText);
      if (imageFile) {
        setSelectedImage(imageFile);
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(imageFile);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Group consecutive messages from the same sender
  const groupMessages = useMemo(() => {
    const groups = [];
    let currentGroup = null;

    currentMessages.forEach((message) => {
      const senderId = message.sender?._id;
      // Show message on right if sender._id matches receiverId
      const isCurrentUser = senderId === receiverId;

      if (!currentGroup || currentGroup.senderId !== senderId) {
        currentGroup = {
          senderId,
          isCurrentUser,
          senderName: message.sender?.fullName || "Unknown",
          senderAvatar: getImageUrl(message.sender?.profile),
          messages: [message],
          timestamp: formatTimeAgo(message.createdAt),
        };
        groups.push(currentGroup);
      } else {
        currentGroup.messages.push(message);
        currentGroup.timestamp = formatTimeAgo(message.createdAt);
      }
    });

    return groups;
  }, [currentMessages, receiverId]);

  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="flex flex-col w-full h-full bg-gray-50">
      {/* Chat Header */}
      <ChatHeader selectedChat={selectedChat} />

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 min-h-0">
        {!selectedChat ? (
          <div className="flex items-center justify-center h-full min-h-[200px]">
            <div className="text-center">
              <div className="text-6xl mb-4">💬</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No chat selected
              </h3>
              <p className="text-gray-500">
                Select a chat from the sidebar to start messaging
              </p>
            </div>
          </div>
        ) : isMessagesLoading ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Loading messages...</p>
          </div>
        ) : currentMessages.length === 0 ? (
          <div className="flex items-center justify-center h-full min-h-[200px]">
            <div className="text-center">
              <div className="text-4xl mb-4">👋</div>
              <p className="text-gray-500">
                No messages yet. Start the conversation!
              </p>
            </div>
          </div>
        ) : (
          groupMessages.map((group, groupIndex) => (
            <div
              key={groupIndex}
              className={`flex ${
                group.isCurrentUser ? "justify-end" : "justify-start"
              }`}
            >
              {/* Other user's avatar on the left */}
              {!group.isCurrentUser && (
                <Avatar className="w-8 h-8 mr-3 mt-auto">
                  <AvatarImage
                    src={group.senderAvatar}
                    alt={group.senderName}
                  />
                  <AvatarFallback className="bg-gray-300 text-gray-700 text-xs">
                    {getInitials(group.senderName)}
                  </AvatarFallback>
                </Avatar>
              )}

              <div
                className={`flex flex-col space-y-1 max-w-xs lg:max-w-md ${
                  group.isCurrentUser ? "items-end" : "items-start"
                }`}
              >
                {group.messages.map((message, messageIndex) => (
                  <div
                    key={message._id}
                    className={`px-4 py-2 rounded-2xl break-words ${
                      group.isCurrentUser
                        ? "bg-gradient-to-r from-[#002282] to-[#0170DA] text-white rounded-br-sm"
                        : "bg-white text-gray-900 border border-gray-200 rounded-bl-sm"
                    } ${
                      messageIndex === group.messages.length - 1 ? "mb-1" : ""
                    }`}
                  >
                    <p className="text-sm">{message.message}</p>
                    {message.image && (
                      <img
                        src={getImageUrl(message.image)}
                        alt="Message attachment"
                        className="mt-2 rounded-lg max-w-full"
                      />
                    )}
                  </div>
                ))}
                <div
                  className={`flex items-center space-x-2 text-xs text-gray-500 ${
                    group.isCurrentUser
                      ? "flex-row-reverse space-x-reverse"
                      : ""
                  }`}
                >
                  <span>{group.timestamp}</span>
                  {group.isCurrentUser && (
                    <div className="flex space-x-1">
                      <div className="w-4 h-3 flex items-center">
                        {/* Double check mark for seen status */}
                        <svg
                          viewBox="0 0 16 11"
                          className={`w-4 h-3 ${
                            group.messages[group.messages.length - 1]?.seen
                              ? "text-blue-600"
                              : "text-gray-400"
                          }`}
                        >
                          <path
                            fill="currentColor"
                            d="M11.071.653a.5.5 0 0 1 .708 0L15.414 4.3a.5.5 0 0 1 0 .707L12.12 8.654a.5.5 0 0 1-.707-.707L14.293 5 11.071 1.778a.5.5 0 0 1 0-.707zM7.071.653a.5.5 0 0 1 .708 0L11.414 4.3a.5.5 0 0 1 0 .707L8.12 8.654a.5.5 0 0 1-.707-.707L10.293 5 7.071 1.778a.5.5 0 0 1 0-.707z"
                          />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Current user's avatar on the right */}
              {group.isCurrentUser && (
                <Avatar className="w-8 h-8 ml-3 mt-auto">
                  <AvatarImage
                    src={group.senderAvatar}
                    alt={group.senderName}
                  />
                  <AvatarFallback className="bg-blue-500 text-white text-xs">
                    {getInitials(group.senderName)}
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-4 flex-shrink-0">
        {/* Image Preview */}
        {imagePreview && (
          <div className="mb-3 relative inline-block">
            <img
              src={imagePreview}
              alt="Preview"
              className="max-w-[200px] max-h-[200px] rounded-lg object-cover"
            />
            <button
              onClick={handleRemoveImage}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
            >
              ×
            </button>
          </div>
        )}
        <div className="flex items-center space-x-3">
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            disabled={!chatId}
          >
            <ImageIcon size={20} />
          </button>

          <div className="flex-1 relative">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message"
              disabled={!chatId}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
            />
          </div>

          <button
            onClick={handleSendMessage}
            disabled={
              (newMessage.trim() === "" && !selectedImage) ||
              !chatId ||
              isSendingMessage
            }
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-full p-3 transition-colors"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
