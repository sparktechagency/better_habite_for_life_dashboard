import React from "react";
import ChatListSidebar from "./ChatListSidebar";
import ChatInterface from "./ChatBoxLayout";

function InboxLayout() {
  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-80px)] w-full">
      <ChatListSidebar />
      <ChatInterface />
    </div>
  );
}

export default InboxLayout;
