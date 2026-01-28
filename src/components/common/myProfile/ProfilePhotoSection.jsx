import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";

function ProfilePhotoSection({ profileInfo }) {
  const { fullName, email, profile, phone } = profileInfo;
  return (
    <div className="w-full flex flex-col  items-center justify-center gap-4">
      <Avatar className="size-40 bg-white">
        <AvatarImage src={profile} />
        <AvatarFallback>
          {fullName
            .split(" ")
            .map((name) => name[0])
            .join("")}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-2 text-center ">
        <p className="text-2xl font-bold">{fullName}</p>
        <p className="text-sm text-gray-500">{email}</p>
        <p className="text-sm text-gray-500">{phone}</p>
      </div>
    </div>
  );
}

export default ProfilePhotoSection;
