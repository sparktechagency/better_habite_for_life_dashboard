import React from "react";
import SmallPageInfo from "../SmallPageInfo";
import ProfilePhotoSection from "./ProfilePhotoSection";
import PersonalInformationSection from "./PersonalInformationSection";
import { Button } from "@/components/ui/button";
import { FiEdit3 } from "react-icons/fi";

function MyProfileLayout() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <SmallPageInfo
          title="My Profile"
          description="Here is an overview of your profile"
        />
        <Button variant="outline" className="bg-transparent">
          <FiEdit3 size={15} />
        </Button>
      </div>
      <ProfilePhotoSection />
      <PersonalInformationSection />
    </div>
  );
}

export default MyProfileLayout;
