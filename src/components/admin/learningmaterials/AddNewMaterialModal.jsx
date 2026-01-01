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
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const AddNewMaterialModal = React.memo(function AddNewMaterialModal({
  openModal,
  setOpenModal,
}) {
  const form = useForm({
    defaultValues: {
      materialTitle: "",
      materialDescription: "",
      tags: [],
      courseImage: null,
      courseVideo: null,
    },
  });

  const [tagInput, setTagInput] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [videoPreview, setVideoPreview] = useState("");
  const imagePreviewRef = useRef("");
  const videoPreviewRef = useRef("");
  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);

  const tags = form.watch("tags") || [];

  // Clean up object URLs on unmount
  useEffect(() => {
    return () => {
      if (imagePreviewRef.current) {
        URL.revokeObjectURL(imagePreviewRef.current);
      }
      if (videoPreviewRef.current) {
        URL.revokeObjectURL(videoPreviewRef.current);
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
        form.setValue("courseImage", file);
      }
    },
    [form]
  );

  const handleVideoChange = useCallback(
    (e) => {
      const file = e.target.files?.[0];
      if (file) {
        // Revoke previous object URL if exists
        if (videoPreviewRef.current) {
          URL.revokeObjectURL(videoPreviewRef.current);
        }
        // Create new object URL for preview
        const objectUrl = URL.createObjectURL(file);
        videoPreviewRef.current = objectUrl;
        setVideoPreview(objectUrl);
        form.setValue("courseVideo", file);
      }
    },
    [form]
  );

  const handleAddTag = useCallback(
    (e) => {
      e.preventDefault();
      const trimmedTag = tagInput.trim();
      if (trimmedTag && !tags.includes(trimmedTag)) {
        form.setValue("tags", [...tags, trimmedTag]);
        setTagInput("");
      }
    },
    [tagInput, tags, form]
  );

  const handleRemoveTag = useCallback(
    (tagToRemove) => {
      form.setValue(
        "tags",
        tags.filter((tag) => tag !== tagToRemove)
      );
    },
    [tags, form]
  );

  const handleTagInputKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") {
        handleAddTag(e);
      }
    },
    [handleAddTag]
  );

  const onSubmit = useCallback(
    (data) => {
      console.log(data);
      // Handle form submission here
      setOpenModal(false);
      // Form will be reset by useEffect when openModal becomes false
    },
    [setOpenModal]
  );

  const resetForm = useCallback(() => {
    // Clean up previews
    if (imagePreviewRef.current) {
      URL.revokeObjectURL(imagePreviewRef.current);
      imagePreviewRef.current = "";
    }
    if (videoPreviewRef.current) {
      URL.revokeObjectURL(videoPreviewRef.current);
      videoPreviewRef.current = "";
    }
    setImagePreview("");
    setVideoPreview("");
    setTagInput("");
    form.reset({
      materialTitle: "",
      materialDescription: "",
      tags: [],
      courseImage: null,
      courseVideo: null,
    });
    // Reset file inputs
    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
    if (videoInputRef.current) {
      videoInputRef.current.value = "";
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
          <DialogTitle>Upload Course Media</DialogTitle>
          <DialogDescription>
            Enter the details to upload a new course media.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex-1 min-h-0 overflow-y-auto">
          <div className="px-6 py-4">
            <Form {...form}>
              <form
                id="upload-course-media-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="materialTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course Title</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="materialDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tags"
                  render={() => (
                    <FormItem>
                      <FormLabel>Tags</FormLabel>
                      <FormControl>
                        <div className="space-y-2">
                          <Input
                            type="text"
                            placeholder="Enter tags and press Enter"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={handleTagInputKeyDown}
                          />
                          {tags.length > 0 && (
                            <TagList tags={tags} onRemove={handleRemoveTag} />
                          )}
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="courseImage"
                  render={() => (
                    <FormItem>
                      <FormLabel>Course Image/Thumbnail</FormLabel>
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
                      alt="Course image preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (imagePreviewRef.current) {
                          URL.revokeObjectURL(imagePreviewRef.current);
                          imagePreviewRef.current = "";
                        }
                        setImagePreview("");
                        form.setValue("courseImage", null);
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

                <FormField
                  control={form.control}
                  name="courseVideo"
                  render={() => (
                    <FormItem>
                      <FormLabel>Course Video</FormLabel>
                      <FormControl>
                        <Input
                          ref={videoInputRef}
                          type="file"
                          accept="video/*"
                          onChange={handleVideoChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {videoPreview && (
                  <div className="relative w-full rounded-md overflow-hidden border bg-black">
                    <video
                      src={videoPreview}
                      controls
                      className="w-full h-auto max-h-96"
                      preload="metadata"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (videoPreviewRef.current) {
                          URL.revokeObjectURL(videoPreviewRef.current);
                          videoPreviewRef.current = "";
                        }
                        setVideoPreview("");
                        form.setValue("courseVideo", null);
                        if (videoInputRef.current) {
                          videoInputRef.current.value = "";
                        }
                      }}
                      className="absolute top-2 right-2 p-1 bg-gray-300 text-destructive-foreground rounded-full hover:bg-gray-500 transition-colors z-10"
                      aria-label="Remove video"
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
          <Button type="button" variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" form="upload-course-media-form">
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});

export default AddNewMaterialModal;

function TagList({ tags, onRemove }) {
  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Badge
          key={tag}
          variant="secondary"
          className="flex items-center gap-1 pr-1"
        >
          <span>{tag}</span>
          <button
            type="button"
            onClick={() => onRemove(tag)}
            className="rounded-full hover:bg-secondary-foreground/20 p-0.5 transition-colors"
            aria-label={`Remove ${tag} tag`}
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}
    </div>
  );
}
