import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

function ChatHeader({ selectedChat }) {
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
    <div className="bg-white border-b border-gray-200 px-2 md:px-6 shadow-sm flex justify-between flex-shrink-0 p-4">
      <div className="flex items-center space-x-3">
        {selectedChat ? (
          <>
            <Avatar className="w-12 h-12 rounded-full border-2">
              <AvatarImage src={selectedChat.avatar} alt={selectedChat.name} />
              <AvatarFallback>{getInitials(selectedChat.name)}</AvatarFallback>
            </Avatar>
            <div className="hidden md:block">
              <h2 className="font-semibold text-gray-900">
                {selectedChat.name}
              </h2>
              <p className="text-sm text-gray-500 capitalize">
                {selectedChat.role || selectedChat.email || "Online"}
              </p>
            </div>
          </>
        ) : (
          <>
            <Avatar className="w-12 h-12 rounded-full border-2 bg-gray-200">
              <AvatarFallback>?</AvatarFallback>
            </Avatar>
            <div className="hidden md:block">
              <h2 className="font-semibold text-gray-900">Select a chat</h2>
              <p className="text-sm text-gray-500">No chat selected</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ChatHeader;
