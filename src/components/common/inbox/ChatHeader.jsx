"use client";
import React, { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import getImageUrl from "@/utils/getImageUrl";

function ChatHeader({ selectedChat }) {
  const [isHovered, setIsHovered] = useState(false);

  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Get all participants from selectedChat
  const participants = selectedChat?.participants || [];
  const hasMultipleParticipants = participants.length > 1;

  return (
    <div className="bg-white border-b border-gray-200 px-2 md:px-6 shadow-sm flex justify-between flex-shrink-0 p-4">
      <div className="flex items-center space-x-3">
        {selectedChat ? (
          <>
            {/* Avatar Group */}
            <div
              className="relative flex items-center overflow-visible"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {hasMultipleParticipants ? (
                <div 
                  className="flex items-center overflow-visible transition-all duration-300 ease-out"
                  style={{
                    width: isHovered ? `${participants.length * 60}px` : 'auto',
                    minWidth: '48px',
                  }}
                >
                  {participants.map((participant, index) => {
                    const avatarUrl = getImageUrl(participant.profile);
                    const initials = getInitials(participant.fullName);
                    // When not hovered: first avatar on top (highest z-index), last on bottom
                    // When hovered: all avatars visible, first to last in order
                    const zIndex = isHovered ? 20 + index : (participants.length - index) * 10;
                    
                    return (
                      <div
                        key={participant._id}
                        className="relative transition-all duration-300 ease-out cursor-pointer will-change-transform"
                        style={{
                          marginLeft: index === 0 ? 0 : isHovered ? '8px' : '-25px',
                          zIndex: zIndex,
                        }}
                      >
                        <Avatar
                          className={`w-12 h-12 rounded-full border-2 border-white shadow-md transition-all duration-300 ease-out ${
                            isHovered ? "hover:scale-110 hover:shadow-lg" : ""
                          }`}
                        >
                          <AvatarImage src={avatarUrl} alt={participant.fullName} />
                          <AvatarFallback className="bg-gray-200 text-gray-700">
                            {initials}
                          </AvatarFallback>
                        </Avatar>
                        {/* Show name tooltip on hover */}
                        {/* {isHovered && (
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap z-[200] pointer-events-none transition-opacity duration-200">
                            {participant.fullName}
                            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                          </div>
                        )} */}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <Avatar className="w-12 h-12 rounded-full border-2 border-white shadow-md">
                  <AvatarImage
                    src={selectedChat.avatar}
                    alt={selectedChat.name}
                  />
                  <AvatarFallback>{getInitials(selectedChat.name)}</AvatarFallback>
                </Avatar>
              )}
            </div>

            {/* Chat Info */}
            <div className="hidden md:block ">
              <h2 className="font-semibold text-gray-900">
                {hasMultipleParticipants
                  ? `${participants.length} participants`
                  : selectedChat.name}
              </h2>
              <p className="text-sm text-gray-500 capitalize">
                {hasMultipleParticipants
                  ? participants.map((p) => p.fullName).join(", ")
                  : selectedChat.role || selectedChat.email || "Online"}
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
