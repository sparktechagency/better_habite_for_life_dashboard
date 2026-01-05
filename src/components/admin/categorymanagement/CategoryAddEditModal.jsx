"use client";
import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import Image from "next/image";

function CategoryAddEditModal({
  openModal,
  setOpenModal,
  isEdit = false,
  categoryData = null,
}) {
  const form = useForm({
    defaultValues: {
      categoryName: "",
      icon: null,
    },
  });

  const [iconPreview, setIconPreview] = useState("");
  const [iconFile, setIconFile] = useState(null);
  const iconInputRef = useRef(null);
  const iconPreviewRef = useRef("");

  // Load category data when in edit mode
  useEffect(() => {
    if (isEdit && categoryData && openModal) {
      form.reset({
        categoryName: categoryData.name || "",
        icon: null,
      });

      // Set preview if icon URL is provided
      if (categoryData.iconUrl) {
        setIconPreview(categoryData.iconUrl);
      }
    }
  }, [isEdit, categoryData, openModal, form]);

  // Clean up object URLs on unmount
  useEffect(() => {
    return () => {
      if (
        iconPreviewRef.current &&
        typeof iconPreviewRef.current === "string" &&
        iconPreviewRef.current.startsWith("blob:")
      ) {
        URL.revokeObjectURL(iconPreviewRef.current);
      }
    };
  }, []);

  const handleIconChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Revoke previous object URL if exists
      if (
        iconPreviewRef.current &&
        typeof iconPreviewRef.current === "string" &&
        iconPreviewRef.current.startsWith("blob:")
      ) {
        URL.revokeObjectURL(iconPreviewRef.current);
      }
      // Create new object URL for preview
      const objectUrl = URL.createObjectURL(file);
      iconPreviewRef.current = objectUrl;
      setIconPreview(objectUrl);
      setIconFile(file);
      form.setValue("icon", file);
    }
  };

  const handleRemoveIcon = () => {
    if (
      iconPreviewRef.current &&
      typeof iconPreviewRef.current === "string" &&
      iconPreviewRef.current.startsWith("blob:")
    ) {
      URL.revokeObjectURL(iconPreviewRef.current);
      iconPreviewRef.current = "";
    }
    setIconPreview("");
    setIconFile(null);
    form.setValue("icon", null);
    if (iconInputRef.current) {
      iconInputRef.current.value = "";
    }
  };

  const onSubmit = (data) => {
    console.log(isEdit ? "Editing category:" : "Creating category:", data);
    if (isEdit && categoryData?.id) {
      console.log("Category ID:", categoryData.id);
    }
    setOpenModal(false);
  };

  const resetForm = () => {
    // Clean up object URLs
    if (
      iconPreviewRef.current &&
      typeof iconPreviewRef.current === "string" &&
      iconPreviewRef.current.startsWith("blob:")
    ) {
      URL.revokeObjectURL(iconPreviewRef.current);
      iconPreviewRef.current = "";
    }
    setIconPreview("");
    setIconFile(null);
    form.reset({
      categoryName: "",
      icon: null,
    });
    if (iconInputRef.current) {
      iconInputRef.current.value = "";
    }
  };

  // Reset form when modal closes
  useEffect(() => {
    if (!openModal) {
      resetForm();
    }
  }, [openModal]);

  const handleOpenChange = (open) => {
    setOpenModal(open);
  };

  return (
    <Dialog open={openModal} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-left">
            {isEdit ? "Edit Category" : "Create New Category"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="categoryName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">
                    Category Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your category name..."
                      {...field}
                      className="bg-gray-50"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="icon"
              render={() => (
                <FormItem>
                  <FormLabel className="text-base font-medium">
                    Upload Icon
                  </FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      {!iconPreview ? (
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center space-y-4 hover:border-gray-400 transition-colors">
                          <div className="flex flex-col items-center space-y-2">
                            <Upload className="h-12 w-12 text-gray-400" />
                            <p className="text-sm text-gray-500 text-center">
                              Click to upload or drag and drop
                            </p>
                          </div>
                          <Input
                            ref={iconInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleIconChange}
                            className="hidden"
                            id="icon-upload"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            className="bg-gray-800 text-white hover:bg-gray-700"
                            onClick={() => iconInputRef.current?.click()}
                          >
                            Upload icon
                          </Button>
                        </div>
                      ) : (
                        <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4">
                          <div className="flex flex-col items-center space-y-4">
                            <div className="relative">
                              <Image
                                src={iconPreview}
                                alt="Icon preview"
                                width={100}
                                height={100}
                                className="w-24 h-24 object-cover rounded-full"
                              />
                              <button
                                type="button"
                                onClick={handleRemoveIcon}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                                aria-label="Remove icon"
                              >
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </button>
                            </div>
                            <Button
                              type="button"
                              variant="outline"
                              className="bg-gray-800 text-white hover:bg-gray-700"
                              onClick={() => iconInputRef.current?.click()}
                            >
                              Change icon
                            </Button>
                            <Input
                              ref={iconInputRef}
                              type="file"
                              accept="image/*"
                              onChange={handleIconChange}
                              className="hidden"
                              id="icon-upload"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex justify-end pt-4">
              <Button
                type="submit"
                className="bg-gray-800 text-white hover:bg-gray-700"
              >
                {isEdit ? "Update" : "Add"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default CategoryAddEditModal;
