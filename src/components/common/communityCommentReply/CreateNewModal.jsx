"use client";
import React, { useCallback, useState } from "react";
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

const CreateNewPostModal = React.memo(function CreateNewPostModal({
  openModal,
  setOpenModal,
}) {
  const form = useForm({
    defaultValues: {
      threadTitle: "",
      threadDescription: "",
      tags: [],
    },
  });

  const [tagInput, setTagInput] = useState("");

  const tags = form.watch("tags") || [];

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
    },
    [setOpenModal]
  );

  const handleClose = useCallback(() => {
    setOpenModal(false);
  }, [setOpenModal]);

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Thread</DialogTitle>
          <DialogDescription>
            Enter the details to create a new thread.
          </DialogDescription>
        </DialogHeader>
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
            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
});

export default CreateNewPostModal;

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
