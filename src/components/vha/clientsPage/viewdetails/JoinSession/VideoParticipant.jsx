"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import getImageUrl from "@/utils/getImageUrl";

export default function VideoParticipant({ 
  name, 
  profilePicture, 
  videoElementRef,
  isLocal = false,
  isVideoEnabled 
}) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black">
      {isVideoEnabled && videoElementRef ? (
        <div
          ref={videoElementRef}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="flex flex-col items-center justify-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-700 flex items-center justify-center">
            <span className="text-white text-3xl sm:text-4xl font-medium">
              {name?.charAt(0)?.toUpperCase() || "U"}
            </span>
          </div>
          <p className="text-white mt-4 text-sm sm:text-base font-medium">{name || "User"}</p>
        </div>
      )}
    </div>
  );
}
