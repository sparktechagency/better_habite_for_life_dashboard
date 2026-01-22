"use client";
import React, { useEffect, useRef, useState } from "react";
import { useAgora } from "./hooks/useAgora";
import VideoControls from "./VideoControls";
import VideoTimer from "./VideoTimer";
import VideoParticipant from "./VideoParticipant";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

function VideoContainer({ 
  isOpen, 
  onClose, 
  sessionData,
  currentUser 
}) {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [callStartTime] = useState(Date.now());
  const containerRef = useRef(null);

  const {
    isJoined,
    isVideoEnabled,
    isAudioEnabled,
    remoteUsers,
    localVideoElementRef,
    remoteVideoElementsRef,
    toggleVideo,
    toggleAudio,
    leaveChannel,
  } = useAgora({
    appId: sessionData?.appId,
    token: sessionData?.token,
    channelName: sessionData?.channelName,
    uid: sessionData?.uid,
  });

  // Handle dragging
  const handleMouseDown = (e) => {
    if (e.target.closest("button")) return; // Don't drag if clicking a button
    setIsDragging(true);
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;
    
    // Keep within viewport bounds
    const maxX = window.innerWidth - (containerRef.current?.offsetWidth || 400);
    const maxY = window.innerHeight - (containerRef.current?.offsetHeight || 300);
    
    setPosition({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY)),
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  const handleEndCall = async () => {
    await leaveChannel();
    onClose?.();
  };

  const handleFullscreen = () => {
    if (!isFullscreen) {
      if (containerRef.current?.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  const handleSettings = () => {
    // TODO: Implement settings
    console.log("Settings clicked");
  };

  const handleParticipants = () => {
    // TODO: Implement participants view
    console.log("Participants clicked");
  };

  if (!isOpen || !sessionData) return null;

  return (
    <div
      ref={containerRef}
      className={`fixed z-50 bg-gray-800 border-2 border-gray-600 rounded-lg overflow-hidden shadow-2xl ${
        isFullscreen ? "w-screen h-screen" : "w-[90vw] sm:w-[500px] h-[400px] sm:h-[500px]"
      }`}
      style={{
        left: isFullscreen ? 0 : `${position.x}px`,
        top: isFullscreen ? 0 : `${position.y}px`,
        cursor: isDragging ? "grabbing" : "default",
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Header - Draggable area */}
      <div className="bg-gray-700 px-4 py-2 flex items-center justify-between cursor-move">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          <span className="text-white text-sm font-medium">Video Call</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="w-6 h-6 text-white hover:bg-gray-600"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Video Area */}
      <div className="relative w-full h-[calc(100%-120px)] bg-black">
        {/* Show remote user if available, otherwise show local */}
        {remoteUsers.length > 0 ? (
          remoteUsers.map((user) => (
            <div key={user.uid} className="absolute inset-0">
              <div
                ref={(el) => {
                  if (el) {
                    remoteVideoElementsRef.current[user.uid] = el;
                    if (user.videoTrack) {
                      user.videoTrack.play(el);
                    }
                  }
                }}
                className="w-full h-full object-cover"
              />
            </div>
          ))
        ) : (
          <VideoParticipant
            name={currentUser?.name || "You"}
            profilePicture={currentUser?.profilePicture}
            videoElementRef={localVideoElementRef}
            isLocal={true}
            isVideoEnabled={isVideoEnabled}
          />
        )}

        {/* Timer */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
          <div className="bg-black/50 px-3 py-1 rounded">
            <VideoTimer startTime={callStartTime} />
          </div>
        </div>

        {/* Controls */}
        <VideoControls
          isVideoEnabled={isVideoEnabled}
          isAudioEnabled={isAudioEnabled}
          onToggleVideo={toggleVideo}
          onToggleAudio={toggleAudio}
          onEndCall={handleEndCall}
          onSettings={handleSettings}
          onFullscreen={handleFullscreen}
          onParticipants={handleParticipants}
        />
      </div>

      {/* Status Bar */}
      <div className="bg-gray-700 px-4 py-2 text-xs text-gray-300 flex items-center justify-between">
        <span>{sessionData?.channelName || "Connecting..."}</span>
        <span className={isJoined ? "text-green-400" : "text-yellow-400"}>
          {isJoined ? "Connected" : "Connecting..."}
        </span>
      </div>
    </div>
  );
}

export default VideoContainer;
