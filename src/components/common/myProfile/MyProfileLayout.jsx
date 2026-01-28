"use client";

import React, { useState } from "react";
import SmallPageInfo from "../SmallPageInfo";
import ProfilePhotoSection from "./ProfilePhotoSection";
import PersonalInformationSection from "./PersonalInformationSection";
import { Button } from "@/components/ui/button";
import { FiEdit3 } from "react-icons/fi";
import ProfileEdit from "./ProfileEdit";
import {
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
} from "@/redux/Apis/profileApi/profileApi";
import useToast from "@/hooks/useToast";

function MyProfileLayout() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { data: myProfile, isLoading } = useGetMyProfileQuery();
  const [updateMyProfile, { isLoading: isUpdating }] =
    useUpdateMyProfileMutation();
  const toast = useToast();

  const profileInfo = {
    fullName: myProfile?.data?.fullName || "",
    email: myProfile?.data?.email || "",
    profile: myProfile?.data?.profile || "",
    phone: myProfile?.data?.phone || "",
    address: myProfile?.data?.address || "",
  };

  const addressInfo = myProfile?.data?.address || "";
  const addressParts = addressInfo.split("?").map((part) => part.trim());
  const parsedAddressInfo = {
    street: addressParts[0] || "",
    city: addressParts[1] || "",
    zip: addressParts[2] || "",
    country: addressParts[3] || "",
  };

  console.log("parsedAddressInfo:", parsedAddressInfo);
  // Prepare initial data for ProfileEdit component
  const initialData = {
    name: profileInfo.fullName,
    phone: profileInfo.phone,
    address: profileInfo.address,
    profileImageUrl: profileInfo.profile,
  };

  const handleSave = async (profileData) => {
    try {
      // Create FormData for file upload
      const formData = new FormData();

      // Map form fields to API expected fields
      // Always append fullName (required field)
      formData.append("fullName", profileData.name || "");

      // Append phone if provided
      if (profileData.phone) {
        formData.append("phone", profileData.phone);
      }

      // Append address if provided
      if (profileData.address) {
        formData.append("address", profileData.address);
      }

      if (profileData.profileImage) {
        if (profileData.profileImage instanceof File) {
          formData.append("profile", profileData.profileImage);
          console.log(" Image file appended to FormData:", {
            name: profileData.profileImage.name,
            size: profileData.profileImage.size,
            type: profileData.profileImage.type,
          });
        } else {
          console.warn(
            " profileImage is not a File instance:",
            typeof profileData.profileImage,
            profileData.profileImage
          );
        }
      } else {
        console.log(" No profileImage provided in profileData");
      }

      // for (const [key, value] of formData.entries()) {
      //   if (value instanceof File) {
      //     console.log(key, "File:", value.name, value.size, "bytes");
      //   } else {
      //     console.log(key, value);
      //   }
      // }

      const response = await updateMyProfile(formData).unwrap();

      // Check if response is successful
      if (response?.success) {
        // Show success toast
        toast.success(response.message || "Profile updated successfully");
        setIsEditModalOpen(false);
      } else {
        throw new Error(response?.message || "Failed to update profile");
      }
    } catch (error) {
      // Handle error
      const errorMessage =
        error?.data?.message ||
        error?.message ||
        "An error occurred. Please try again.";
      toast.error(errorMessage);
    }
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
      <ProfilePhotoSection profileInfo={profileInfo} />
      <PersonalInformationSection addressInfo={parsedAddressInfo} />
      <ProfileEdit
        openModal={isEditModalOpen}
        setOpenModal={setIsEditModalOpen}
        onSave={handleSave}
        initialData={initialData}
        isLoading={isUpdating}
      />
    </div>
  );
}

export default MyProfileLayout;
