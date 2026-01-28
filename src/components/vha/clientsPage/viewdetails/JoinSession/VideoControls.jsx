"use client";
import { Video, VideoOff, Mic, MicOff, PhoneOff, Settings, Maximize2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function VideoControls({
  isVideoEnabled,
  isAudioEnabled,
  onToggleVideo,
  onToggleAudio,
  onEndCall,
  onSettings,
  onFullscreen,
  onParticipants,
}) {
  return (
    <>
      {/* Bottom Controls */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-3 sm:gap-4 z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleVideo}
          className="rounded-full w-10 h-10 sm:w-12 sm:h-12 bg-white/10 hover:bg-white/20 text-white border-0"
        >
          {isVideoEnabled ? (
            <Video className="w-5 h-5 sm:w-6 sm:h-6" />
          ) : (
            <VideoOff className="w-5 h-5 sm:w-6 sm:h-6" />
          )}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleAudio}
          className="rounded-full w-10 h-10 sm:w-12 sm:h-12 bg-white/10 hover:bg-white/20 text-white border-0"
        >
          {isAudioEnabled ? (
            <Mic className="w-5 h-5 sm:w-6 sm:h-6" />
          ) : (
            <MicOff className="w-5 h-5 sm:w-6 sm:h-6" />
          )}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onEndCall}
          className="rounded-full w-10 h-10 sm:w-12 sm:h-12 bg-red-600 hover:bg-red-700 text-white border-0"
        >
          <PhoneOff className="w-5 h-5 sm:w-6 sm:h-6" />
        </Button>
      </div>

      {/* Corner Icons */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onSettings}
        className="absolute bottom-4 left-4 w-8 h-8 sm:w-10 sm:h-10 text-white hover:bg-white/10 z-10"
      >
        <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={onFullscreen}
        className="absolute top-4 right-4 w-8 h-8 sm:w-10 sm:h-10 text-white hover:bg-white/10 z-10"
      >
        <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={onParticipants}
        className="absolute bottom-4 right-4 w-8 h-8 sm:w-10 sm:h-10 text-white hover:bg-white/10 z-10"
      >
        <Users className="w-4 h-4 sm:w-5 sm:h-5" />
      </Button>
    </>
  );
}
