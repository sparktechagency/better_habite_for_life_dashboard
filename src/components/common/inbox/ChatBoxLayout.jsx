"use client";
import React, { useState, useRef, useEffect } from "react";
import { Send, Paperclip, Image } from "lucide-react";
import { useChat, useAppDispatch } from "@/redux/hooks";
import {
  sendMessage,
  addMessage,
  setTypingIndicator,
  fetchChatMessages,
} from "@/redux/features/chat/chatSlice";
import { Button } from "@/components/ui/button";
import { Dialog } from "@radix-ui/react-dialog";
import {
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import ReportFreeLancer from "./ReportFreeLancer";
import Link from "next/link";
import { useSelector } from "react-redux";
import { getCurrentUser } from "@/redux/features/currentUser/currentuserSlice";
const ChatInterface = () => {
  const dispatch = useAppDispatch();
  const { selectedChat, messages, isSendingMessage, typingUsers } = useChat();
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const { type } = useSelector((state) => state.currentUser.currentUser || {});

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Get messages for selected chat
  const currentMessages = selectedChat ? messages[selectedChat.id] || [] : [];

  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);
  const currentUser = "user2"; // Current user identifier

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  };

  // Fetch messages when chat is selected
  useEffect(() => {
    if (selectedChat) {
      dispatch(fetchChatMessages(selectedChat.id));
    }
  }, [selectedChat, dispatch]);

  useEffect(() => {
    // Add a small delay to ensure DOM is updated
    const timeoutId = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timeoutId);
  }, [currentMessages]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === "" || !selectedChat) return;

    const messageText = newMessage;
    setNewMessage("");

    // Send message to server (this will handle optimistic updates)
    try {
      await dispatch(
        sendMessage({ chatId: selectedChat.id, message: messageText })
      ).unwrap();

      // Simulate typing indicator and auto-reply
      dispatch(
        setTypingIndicator({
          chatId: selectedChat.id,
          userId: "user1",
          isTyping: true,
        })
      );
      setTimeout(() => {
        dispatch(
          setTypingIndicator({
            chatId: selectedChat.id,
            userId: "user1",
            isTyping: false,
          })
        );
        const autoReply = {
          id: Date.now() + 1,
          text: getRandomReply(),
          sender: "user1",
          timestamp: "just now",
          avatar: "👨‍💼",
        };
        dispatch(addMessage({ chatId: selectedChat.id, message: autoReply }));
      }, 1500);
    } catch (error) {
      console.error("Failed to send message:", error);
      // Restore the message if sending failed
      setNewMessage(messageText);
    }
  };

  const getRandomReply = () => {
    const replies = [
      "That's awesome! 🎉",
      "I totally agree!",
      "Wow, really?",
      "That's so cool!",
      "Amazing stuff! ✨",
      "Perfect! ✅",
      "This is epic indeed!",
      "So true! 💯",
    ];
    return replies[Math.floor(Math.random() * replies.length)];
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const groupMessages = () => {
    const groups = [];
    let currentGroup = null;

    currentMessages.forEach((message) => {
      if (!currentGroup || currentGroup.sender !== message.sender) {
        currentGroup = {
          sender: message.sender,
          avatar: message.avatar,
          messages: [message],
          timestamp: message.timestamp,
        };
        groups.push(currentGroup);
      } else {
        currentGroup.messages.push(message);
        currentGroup.timestamp = message.timestamp;
      }
    });

    return groups;
  };

  return (
    <div className="flex flex-col w-full h-full bg-gray-50">
      {/* Chat Header */}
      <div className="bg-white border-b border-gray-200 px-2 md:px-6 shadow-sm flex justify-between flex-shrink-0 p-4">
        <div className="flex items-center space-x-3">
          <Image
            src="/images/logo.png"
            alt="logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="hidden md:block">
            <h2 className="font-semibold text-gray-900">
              {selectedChat ? selectedChat.name : "Select a chat"}
            </h2>
            <p className="text-sm text-gray-500">
              {selectedChat
                ? selectedChat.projectInfo?.title || "Project"
                : "No chat selected"}
            </p>
          </div>
        </div>
      </div>

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
        ) : (
          groupMessages().map((group, groupIndex) => (
            <div
              key={groupIndex}
              className={`flex ${
                group.sender === currentUser ? "justify-end" : "justify-start"
              }`}
            >
              {group.sender !== currentUser && (
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm mr-3 mt-auto">
                  {group.avatar}
                </div>
              )}

              <div
                className={`flex flex-col space-y-1 max-w-xs lg:max-w-md ${
                  group.sender === currentUser ? "items-end" : "items-start"
                }`}
              >
                {group.messages.map((message, messageIndex) => (
                  <div
                    key={message.id}
                    className={`px-4 py-2 rounded-2xl break-words ${
                      group.sender === currentUser
                        ? "bg-gradient-to-r from-[#002282] to-[#0170DA] text-white rounded-br-sm"
                        : "bg-white text-gray-900 border border-gray-200 rounded-bl-sm"
                    } ${
                      messageIndex === group.messages.length - 1 ? "mb-1" : ""
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                ))}
                <div
                  className={`flex items-center space-x-2 text-xs text-gray-500 ${
                    group.sender === currentUser
                      ? "flex-row-reverse space-x-reverse"
                      : ""
                  }`}
                >
                  <span>{group.timestamp}</span>
                  {group.sender === currentUser && (
                    <div className="flex space-x-1">
                      <div className="w-4 h-3 flex items-center">
                        <svg
                          viewBox="0 0 16 11"
                          className="w-4 h-3 text-blue-600"
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

              {group.sender === currentUser && (
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-sm ml-3 mt-auto">
                  {group.avatar}
                </div>
              )}
            </div>
          ))
        )}

        {selectedChat && typingUsers[selectedChat.id] && (
          <div className="flex justify-start  -mt-10">
            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm mr-3">
              👨‍💼
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-sm px-4 py-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-4 flex-shrink-0">
        <div className="flex items-center space-x-3">
          <button className="text-gray-500 hover:text-gray-700 transition-colors">
            <Paperclip size={20} />
          </button>
          <button className="text-gray-500 hover:text-gray-700 transition-colors">
            <Image size={20} />
          </button>

          <div className="flex-1 relative">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message"
              className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <button
            onClick={handleSendMessage}
            disabled={
              newMessage.trim() === "" || !selectedChat || isSendingMessage
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
