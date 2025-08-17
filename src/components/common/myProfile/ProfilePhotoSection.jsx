import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";

function ProfilePhotoSection() {
  return (
    <div className="w-full flex flex-col  items-center justify-center gap-4">
      <Avatar className="size-40">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-2 text-center ">
        <p className="text-2xl font-bold">John Doe</p>
        <p className="text-sm text-gray-500">john.doe@example.com</p>
      </div>
    </div>
  );
}

export default ProfilePhotoSection;
