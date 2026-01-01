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

const BhaaCreateModal = React.memo(function BhaaCreateModal({
  openModal,
  setOpenModal,
}) {
  const form = useForm({
    defaultValues: {
      bhaaName: "",
      bhaaEmail: "",
      bhaaPhoneNumber: "",
      bhaaAddress: "",
    },
  });

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
          <DialogTitle>Create BHAA Account</DialogTitle>
          <DialogDescription>
            Enter the details to create a new BHAA account.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            id="bhaa-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="bhaaName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>BHAA Name</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bhaaEmail"
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
              name="bhaaPhoneNumber"
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
              name="bhaaAddress"
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

export default BhaaCreateModal;
