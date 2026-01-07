"use client";

import React, { useState } from "react";
import SmallPageInfo from "../SmallPageInfo";
import ProfilePhotoSection from "./ProfilePhotoSection";
import PersonalInformationSection from "./PersonalInformationSection";
import { Button } from "@/components/ui/button";
import { FiEdit3 } from "react-icons/fi";
import ProfileEdit from "./ProfileEdit";

function MyProfileLayout() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleSave = (profileData) => {
    console.log("Saving profile:", profileData);
    // Add your profile update logic here
    setIsEditModalOpen(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <SmallPageInfo
          title="My Profile"
          description="Here is an overview of your profile"
        />
        <Button
          variant="outline"
          className="bg-transparent"
          onClick={() => setIsEditModalOpen(true)}
        >
          <FiEdit3 size={15} />
        </Button>
      </div>
      <ProfilePhotoSection />
      <PersonalInformationSection />
      <ProfileEdit
        openModal={isEditModalOpen}
        setOpenModal={setIsEditModalOpen}
        onSave={handleSave}
      />
    </div>
  );
}

export default MyProfileLayout;
