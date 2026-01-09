"use client";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";

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
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useCreatePostMutation } from "@/redux/Apis/admin/postApi/postApi";
import useToast from "@/hooks/useToast";

const CreateNewPostModal = React.memo(function CreateNewPostModal({
  openModal,
  setOpenModal,
}) {
  const toast = useToast();
  const [createPost, { isLoading }] = useCreatePostMutation();

  const form = useForm({
    defaultValues: {
      description: "",
    },
  });

  const onSubmit = useCallback(
    async (data) => {
      try {
        // Send as JSON object with description field
        const response = await createPost({
          description: data.description,
        }).unwrap();

        if (response?.success) {
          toast.success(response.message || "Post created successfully");
          form.reset();
          setOpenModal(false);
        } else {
          toast.error(response?.message || "Failed to create post");
        }
      } catch (error) {
        const errorMessage =
          error?.data?.message || error?.message || "Failed to create post";
        toast.error(errorMessage);
      }
    },
    [createPost, setOpenModal, toast, form]
  );

  const handleClose = useCallback(() => {
    form.reset();
    setOpenModal(false);
  }, [setOpenModal, form]);

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Post</DialogTitle>
          <DialogDescription>
            Enter the details to create a new post.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            id="create-new-post-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="description"
              rules={{ required: "Description is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Post Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Write your post content here..."
                      rows={6}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Creating..." : "Submit"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
});

export default CreateNewPostModal;
