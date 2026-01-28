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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useCreateBhaMutation } from "@/redux/Apis/admin/bhamanagementApi/bhamanagementApi";
import useToast from "@/hooks/useToast";
import { Loader } from "lucide-react";

const BhaCreateModal = React.memo(function BhaCreateModal({
  openModal,
  setOpenModal,
}) {
  const [createBha, { isLoading }] = useCreateBhaMutation();
  const toast = useToast();
  const form = useForm({
    defaultValues: {
      bhaName: "",
      email: "",
      phoneNumber: "",
      address: "",
      role: "doctor",
    },
  });

  const onSubmit = useCallback(
    async (data) => {
      try {
        // Map form data to API payload format
        const payload = {
          fullName: data.bhaName,
          email: data.email,
          phone: data.phoneNumber,
          address: data.address,
          role: data.role || "doctor", // Default to "doctor" if not specified
        };

        const response = await createBha(payload).unwrap();

        if (response?.success) {
          toast.success(response.message || "BHA created successfully");
          form.reset();
          setOpenModal(false);
        } else {
          throw new Error(response?.message || "Failed to create BHA");
        }
      } catch (error) {
        const errorMessage =
          error?.data?.message ||
          error?.message ||
          "An error occurred while creating BHA. Please try again.";
        toast.error(errorMessage);
        console.error("Create BHA error:", error);
      }
    },
    [createBha, form, setOpenModal, toast]
  );

  const handleClose = useCallback(() => {
    setOpenModal(false);
  }, [setOpenModal]);

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create BHA Account</DialogTitle>
          <DialogDescription>
            Enter the details to create a new BHA account.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            id="bha-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="bhaName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>BHA Name</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input type="tel" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
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
              <Button type="submit" disabled={isLoading} >
                {isLoading ? "Creating..." : "Create"}
                {isLoading &&  <Loader className="w-4 h-4 animate-spin ml-2" />}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
});

export default BhaCreateModal;
