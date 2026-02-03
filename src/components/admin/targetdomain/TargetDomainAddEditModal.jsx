"use client";

import React, { useEffect } from "react";
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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import {
  useCreateTargetDomainMutation,
  useUpdateTargetDomainMutation,
} from "@/redux/Apis/admin/targetdomainApi/targetdomainApi";
import useToast from "@/hooks/useToast";

function TargetDomainAddEditModal({
  openModal,
  setOpenModal,
  isEdit = false,
  targetDomainData = null,
}) {
  const form = useForm({
    defaultValues: {
      name: "",
    },
  });

  const toast = useToast();
  const [createTargetDomain, { isLoading: isCreating }] =
    useCreateTargetDomainMutation();
  const [updateTargetDomain, { isLoading: isUpdating }] =
    useUpdateTargetDomainMutation();

  useEffect(() => {
    if (isEdit && targetDomainData && openModal) {
      form.reset({
        name: targetDomainData.name || "",
      });
    }
  }, [isEdit, targetDomainData, openModal, form]);

  useEffect(() => {
    if (!openModal) {
      form.reset({ name: "" });
    }
  }, [openModal, form]);

  const onSubmit = async (data) => {
    try {
      const payload = { name: data.name?.trim() || "" };

      if (isEdit && targetDomainData?._id) {
        const response = await updateTargetDomain({
          id: targetDomainData._id,
          data: payload,
        }).unwrap();
        if (response?.success) {
          toast.success(
            response.message || "Target domain updated successfully"
          );
          setOpenModal(false);
          form.reset({ name: "" });
        } else {
          throw new Error(response?.message || "Update failed");
        }
      } else {
        const response = await createTargetDomain(payload).unwrap();
        if (response?.success) {
          toast.success(
            response.message || "Target domain created successfully"
          );
          setOpenModal(false);
          form.reset({ name: "" });
        } else {
          throw new Error(response?.message || "Create failed");
        }
      }
    } catch (error) {
      const message =
        error?.data?.message ||
        error?.message ||
        "Something went wrong. Please try again.";
      toast.error(message);
      console.error("Target domain operation error:", error);
    }
  };

  const handleOpenChange = (open) => {
    setOpenModal(open);
  };

  const isSubmitting = isCreating || isUpdating;

  return (
    <Dialog open={openModal} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-left">
            {isEdit ? "Edit Target Domain" : "Add Target Domain"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              rules={{
                required: "Target domain name is required",
                validate: (value) =>
                  value?.trim()?.length > 0 || "Target domain name is required",
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">
                    Target Domain Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter target domain name..."
                      {...field}
                      className="bg-gray-50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end pt-4 gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpenModal(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-gray-800 text-white hover:bg-gray-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    Processing...
                    <Loader className="w-4 h-4 animate-spin ml-2 inline" />
                  </>
                ) : isEdit ? (
                  "Update"
                ) : (
                  "Add"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default TargetDomainAddEditModal;
