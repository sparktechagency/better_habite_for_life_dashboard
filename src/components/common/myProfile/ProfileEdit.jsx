"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { X, Upload } from "lucide-react";

function ProfileEdit({
  openModal,
  setOpenModal,
  onSave,
  initialData = null,
  isLoading = false,
}) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    profileImage: null,
  });
  const [imagePreview, setImagePreview] = useState("");
  const imageInputRef = useRef(null);
  const imagePreviewRef = useRef("");

  // Load data when modal opens
  useEffect(() => {
    if (openModal) {
      if (initialData) {
        setFormData({
          name: initialData.name || "",
          phone: initialData.phone || "",
          address: initialData.address || "",
          profileImage: null,
        });
        if (initialData.profileImageUrl) {
          setImagePreview(initialData.profileImageUrl);
        }
      } else {
        // Default values from ProfilePhotoSection
        setFormData({
          name: "John Doe",
          phone: "",
          address: "",
          profileImage: null,
        });
        setImagePreview("https://github.com/shadcn.png");
      }
    }
  }, [openModal, initialData]);

  // Clean up object URLs on unmount
  useEffect(() => {
    return () => {
      if (
        imagePreviewRef.current &&
        typeof imagePreviewRef.current === "string" &&
        imagePreviewRef.current.startsWith("blob:")
      ) {
        URL.revokeObjectURL(imagePreviewRef.current);
      }
    };
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Revoke previous object URL if exists
      if (
        imagePreviewRef.current &&
        typeof imagePreviewRef.current === "string" &&
        imagePreviewRef.current.startsWith("blob:")
      ) {
        URL.revokeObjectURL(imagePreviewRef.current);
      }
      // Create new object URL for preview
      const objectUrl = URL.createObjectURL(file);
      imagePreviewRef.current = objectUrl;
      setImagePreview(objectUrl);
      setFormData((prev) => ({ ...prev, profileImage: file }));
    }
  };

  const handleRemoveImage = () => {
    if (
      imagePreviewRef.current &&
      typeof imagePreviewRef.current === "string" &&
      imagePreviewRef.current.startsWith("blob:")
    ) {
      URL.revokeObjectURL(imagePreviewRef.current);
      imagePreviewRef.current = "";
    }
    setImagePreview("");
    setFormData((prev) => ({ ...prev, profileImage: null }));
    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!formData.name.trim()) {
      return;
    }

    const payload = {
      ...formData,
      id: initialData?.id,
    };

    // Debug: Check if profileImage is in payload
    console.log("ProfileEdit - formData:", formData);
    console.log("ProfileEdit - payload:", payload);
    console.log("ProfileEdit - profileImage in payload:", payload.profileImage);
    console.log(
      "ProfileEdit - Is profileImage a File?",
      payload.profileImage instanceof File
    );

    if (onSave) {
      await onSave(payload);
    }
  };

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogContent className="sm:max-w-lg p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle className="text-xl font-semibold text-left">
            Edit Profile
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 pb-4 space-y-4">
          {/* Profile Image */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <Avatar className="size-32">
                <AvatarImage
                  src={imagePreview || "https://github.com/shadcn.png"}
                />
                <AvatarFallback>
                  {formData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase() || "CN"}
                </AvatarFallback>
              </Avatar>
              {imagePreview && (
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  aria-label="Remove image"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <div>
              <Input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="profile-image-upload"
              />
              <Label htmlFor="profile-image-upload">
                <Button
                  type="button"
                  variant="outline"
                  className="cursor-pointer"
                  onClick={() => imageInputRef.current?.click()}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Photo
                </Button>
              </Label>
            </div>
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              Name:
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder="Enter your name"
              className="bg-gray-50 border-gray-200"
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label
              htmlFor="phone"
              className="text-sm font-medium text-gray-700"
            >
              Phone:
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              placeholder="Enter your phone number"
              className="bg-gray-50 border-gray-200"
            />
          </div>

          {/* Address */}
          <div className="space-y-2">
            <Label
              htmlFor="address"
              className="text-sm font-medium text-gray-700"
            >
              Address:
            </Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => updateField("address", e.target.value)}
              placeholder="Enter your address"
              className="min-h-[80px] bg-gray-50 border-gray-200"
            />
          </div>
        </div>

        <DialogFooter className="px-6 pb-6 pt-4">
          <Button
            variant="outline"
            onClick={() => setOpenModal(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ProfileEdit;
