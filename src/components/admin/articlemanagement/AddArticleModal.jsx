"use client";
import React, { useCallback, useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
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
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  useCreateArticleMutation,
  useUpdateArticleMutation,
} from "@/redux/Apis/admin/articleApi/articleApi";
import useToast from "@/hooks/useToast";
import { getImageUrl } from "@/utils/getImageUrl";

const AddArticleModal = React.memo(function AddArticleModal({
  openModal,
  setOpenModal,
  isEdit = false,
  articleData = null,
}) {
  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      sourseName: "",
      readTime: "",
      articleImage: null,
    },
  });

  const [imagePreview, setImagePreview] = useState("");
  const imagePreviewRef = useRef("");
  const imageInputRef = useRef(null);

  const [createArticle, { isLoading: isCreating }] = useCreateArticleMutation();
  const [updateArticle, { isLoading: isUpdating }] = useUpdateArticleMutation();
  const toast = useToast();

  const isSubmitting = isCreating || isUpdating;

  // Load article data when in edit mode
  useEffect(() => {
    if (isEdit && articleData && openModal) {
      form.reset({
        title: articleData.title || "",
        description: articleData.description || "",
        sourseName: articleData.sourseName || "",
        readTime: articleData.readTime || "",
        articleImage: null,
      });

      // Set image preview if URL is provided
      if (articleData.image) {
        setImagePreview(getImageUrl(articleData.image));
      }
    }
  }, [isEdit, articleData, openModal, form]);

  // Clean up object URL on unmount or when image changes
  useEffect(() => {
    return () => {
      if (imagePreviewRef.current) {
        URL.revokeObjectURL(imagePreviewRef.current);
      }
    };
  }, []);

  const handleImageChange = useCallback(
    (e) => {
      const file = e.target.files?.[0];
      if (file) {
        // Revoke previous object URL if exists
        if (imagePreviewRef.current) {
          URL.revokeObjectURL(imagePreviewRef.current);
        }
        // Create new object URL for preview
        const objectUrl = URL.createObjectURL(file);
        imagePreviewRef.current = objectUrl;
        setImagePreview(objectUrl);
        form.setValue("articleImage", file);
      }
    },
    [form]
  );

  const onSubmit = useCallback(
    async (data) => {
      try {
        // Create FormData for file upload
        const formData = new FormData();

        // Append title
        formData.append("title", data.title || "");

        // Append description
        formData.append("description", data.description || "");

        // Append sourseName
        formData.append("sourseName", data.sourseName || "");

        // Append readTime
        formData.append("readTime", data.readTime || "");

        // Append image file if provided
        const imageFile = form.getValues("articleImage");
        if (imageFile && imageFile instanceof File) {
          formData.append("image", imageFile);
        }

        // Debug: Log FormData contents
        console.log("FormData entries:");
        for (const [key, value] of formData.entries()) {
          if (value instanceof File) {
            console.log(key, "File:", value.name, value.size, "bytes");
          } else {
            console.log(key, value);
          }
        }

        let response;
        if (isEdit && articleData?._id) {
          // Update article
          response = await updateArticle({
            id: articleData._id,
            formData,
          }).unwrap();
        } else {
          // Create article
          response = await createArticle(formData).unwrap();
        }

        // Check if response is successful
        if (response?.success) {
          toast.success(
            response.message ||
              (isEdit
                ? "Article updated successfully"
                : "Article created successfully")
          );
          setOpenModal(false);
        } else {
          throw new Error(
            response?.message || "An error occurred. Please try again."
          );
        }
      } catch (error) {
        // Handle error
        const errorMessage =
          error?.data?.message ||
          error?.message ||
          "An error occurred. Please try again.";
        toast.error(errorMessage);
        console.error("Article operation error:", error);
      }
    },
    [
      setOpenModal,
      isEdit,
      articleData,
      form,
      createArticle,
      updateArticle,
      toast,
    ]
  );

  const resetForm = useCallback(() => {
    // Clean up previews
    if (
      imagePreviewRef.current &&
      imagePreviewRef.current.startsWith("blob:")
    ) {
      URL.revokeObjectURL(imagePreviewRef.current);
      imagePreviewRef.current = "";
    }
    setImagePreview("");
    form.reset({
      title: "",
      description: "",
      sourseName: "",
      readTime: "",
      articleImage: null,
    });
    // Reset file input
    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  }, [form]);

  // Reset form when modal closes
  useEffect(() => {
    if (!openModal) {
      resetForm();
    }
  }, [openModal, resetForm]);

  const handleClose = useCallback(() => {
    setOpenModal(false);
    // Form will be reset by useEffect when openModal becomes false
  }, [setOpenModal]);

  const handleOpenChange = useCallback(
    (open) => {
      setOpenModal(open);
      // Form will be reset by useEffect when open becomes false
    },
    [setOpenModal]
  );

  return (
    <Dialog open={openModal} onOpenChange={handleOpenChange}>
      <DialogContent className="flex flex-col max-w-[90vw] sm:max-w-lg md:max-w-2xl max-h-[90vh] sm:max-h-[85vh] p-0 overflow-hidden">
        <DialogHeader className="flex-shrink-0 px-6 pt-6 pb-4 border-b">
          <DialogTitle>
            {isEdit ? "Edit Article" : "Create New Article"}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Update the article details below."
              : "Enter the details to create a new article."}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex-1 min-h-0 overflow-y-auto">
          <div className="px-6 py-4">
            <Form {...form}>
              <form
                id="create-article-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Article Title</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter article title"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter article description"
                          rows={4}
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="sourseName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Source Name / Author</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="e.g. Dr. Rizal Dy Ferrer"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="readTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Read Time</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="e.g. 20 min"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="articleImage"
                  render={() => (
                    <FormItem>
                      <FormLabel>Article Image</FormLabel>
                      <FormControl>
                        <Input
                          ref={imageInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {imagePreview && (
                  <div className="relative w-full h-48 rounded-md overflow-hidden border">
                    <img
                      src={imagePreview}
                      alt="Article preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (
                          imagePreviewRef.current &&
                          imagePreviewRef.current.startsWith("blob:")
                        ) {
                          URL.revokeObjectURL(imagePreviewRef.current);
                          imagePreviewRef.current = "";
                        }
                        setImagePreview("");
                        form.setValue("articleImage", null);
                        if (imageInputRef.current) {
                          imageInputRef.current.value = "";
                        }
                      }}
                      className="absolute top-2 right-2 p-1 bg-gray-300 text-destructive-foreground rounded-full hover:bg-gray-500 transition-colors z-10"
                      aria-label="Remove image"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </form>
            </Form>
          </div>
        </ScrollArea>
        <DialogFooter className="flex-shrink-0 border-t px-6 py-4 bg-background">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="create-article-form"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? isEdit
                ? "Updating..."
                : "Creating..."
              : isEdit
              ? "Update"
              : "Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});

export default AddArticleModal;
