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

const AddArticleModal = React.memo(function AddArticleModal({
  openModal,
  setOpenModal,
}) {
  const form = useForm({
    defaultValues: {
      threadTitle: "",
      threadDescription: "",
      tags: [],
      articleImage: null,
    },
  });

  const [tagInput, setTagInput] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const imagePreviewRef = useRef("");
  const imageInputRef = useRef(null);

  const tags = form.watch("tags") || [];

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
    setImagePreview("");
    setTagInput("");
    form.reset({
      threadTitle: "",
      threadDescription: "",
      tags: [],
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
          <DialogTitle>Create New Thread</DialogTitle>
          <DialogDescription>
            Enter the details to create a new thread.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex-1 min-h-0 overflow-y-auto">
          <div className="px-6 py-4">
            <Form {...form}>
              <form
                id="create-new-thread-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="threadTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Thread Title</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="threadDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Thread Description</FormLabel>
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
                        if (imagePreviewRef.current) {
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
          <Button type="button" variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" form="create-new-thread-form">
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});

export default AddArticleModal;

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
