import React from "react";
import SmallPageInfo from "../SmallPageInfo";
import ProfilePhotoSection from "./ProfilePhotoSection";
import PersonalInformationSection from "./PersonalInformationSection";

function MyProfileLayout() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <SmallPageInfo
          title="My Profile"
          description="Here is an overview of your profile"
        />
      </div>
      <ProfilePhotoSection />
      <PersonalInformationSection />
    </div>
  );
}

export default MyProfileLayout;
