import { Separator } from "@/components/ui/separator";
import React from "react";

function PersonalInformationSection() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Separator className="my-4 " />
      <div className="flex h-5 items-center space-x-4 text-sm my-2">
        <div className="flex flex-col gap-2">
          <span className="font-bold">Country</span>
          <span className="text-gray-500">USA</span>
        </div>
        <Separator orientation="vertical" />
        <div className="flex flex-col gap-2">
          <span className="font-bold">City</span>
          <span className="text-gray-500">California</span>
        </div>
        <Separator orientation="vertical" />
        <div className="flex flex-col gap-2">
          <span className="font-bold">Address</span>
          <span className="text-gray-500">San Jose, California, USA</span>
        </div>
      </div>
    </div>
  );
}

export default PersonalInformationSection;
