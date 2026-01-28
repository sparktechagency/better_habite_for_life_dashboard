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
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { X, Upload, Loader } from "lucide-react";

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
    street: "",
    city: "",
    zip: "",
    country: "",
    profileImage: null,
  });
  const [imagePreview, setImagePreview] = useState("");
  const imageInputRef = useRef(null);
  const imagePreviewRef = useRef("");

  // Parse address string into separate fields (using "?" as separator)
  const parseAddress = (addressString) => {
    if (!addressString) {
      return { street: "", city: "", zip: "", country: "" };
    }
    const parts = addressString.split("?").map((part) => part.trim());
    return {
      street: parts[0] || "",
      city: parts[1] || "",
      zip: parts[2] || "",
      country: parts[3] || "",
    };
  };

  // Load data when modal opens
  useEffect(() => {
    if (openModal) {
      if (initialData) {
        const addressParts = parseAddress(initialData.address);
        setFormData({
          name: initialData.name || "",
          phone: initialData.phone || "",
          street: addressParts.street,
          city: addressParts.city,
          zip: addressParts.zip,
          country: addressParts.country,
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
          street: "",
          city: "",
          zip: "",
          country: "",
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

    // Concatenate address fields with commas
    const addressParts = [
      formData.street,
      formData.city,
      formData.zip,
      formData.country,
    ].filter((part) => part.trim() !== "");
    const concatenatedAddress = addressParts.join("? ");
    console.log("concatenatedAddress:", concatenatedAddress);
    const payload = {
      name: formData.name,
      phone: formData.phone,
      address: concatenatedAddress,
      profileImage: formData.profileImage,
      id: initialData?.id,
    };

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

          {/* Address Fields */}
          <div className="space-y-4">
            <Label className="text-sm font-medium text-gray-700">
              Address:
            </Label>
            <div className="grid grid-cols-2 gap-4">
              {/* Street */}
              <div className="space-y-2">
                <Label
                  htmlFor="street"
                  className="text-sm font-medium text-gray-600"
                >
                  Street:
                </Label>
                <Input
                  id="street"
                  value={formData.street}
                  onChange={(e) => updateField("street", e.target.value)}
                  placeholder="Enter street address"
                  className="bg-gray-50 border-gray-200"
                />
              </div>

              {/* City */}
              <div className="space-y-2">
                <Label
                  htmlFor="city"
                  className="text-sm font-medium text-gray-600"
                >
                  City:
                </Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => updateField("city", e.target.value)}
                  placeholder="Enter city"
                  className="bg-gray-50 border-gray-200"
                />
              </div>

              {/* Zip */}
              <div className="space-y-2">
                <Label
                  htmlFor="zip"
                  className="text-sm font-medium text-gray-600"
                >
                  Zip:
                </Label>
                <Input
                  id="zip"
                  value={formData.zip}
                  onChange={(e) => updateField("zip", e.target.value)}
                  placeholder="Enter zip code"
                  className="bg-gray-50 border-gray-200"
                />
              </div>

              {/* Country */}
              <div className="space-y-2">
                <Label
                  htmlFor="country"
                  className="text-sm font-medium text-gray-600"
                >
                  Country:
                </Label>
                <Input
                  id="country"
                  value={formData.country}
                  onChange={(e) => updateField("country", e.target.value)}
                  placeholder="Enter country"
                  className="bg-gray-50 border-gray-200"
                />
              </div>
            </div>
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
            {isLoading ? <>Saving...{" "}<Loader className="w-4 h-4 animate-spin text-white" /></> : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ProfileEdit;
