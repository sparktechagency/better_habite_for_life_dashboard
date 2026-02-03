"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { cn } from "@/lib/utils";

const phoneInputContainerClass =
  "flex h-9 w-full items-center gap-1 rounded-md border border-input bg-transparent px-2 shadow-xs transition-[color,box-shadow] focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]";
const phoneNumberInputClass =
  "flex h-8 min-w-0 flex-1 border-0 bg-transparent p-0 text-base outline-none placeholder:text-muted-foreground md:text-sm";

const defaultValues = {
  fullName: "",
  email: "",
  phone: "",
  street: "",
  city: "",
  zip: "",
  country: "",
};

function AdminAddModal({ onOpenChange, onSubmit, isSubmitting = false }) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues,
    mode: "onSubmit",
  });

  const handleFormSubmit = (values) => {
    const addressStr = [
      values.street,
      values.city,
      values.zip,
      values.country,
    ].join("? ");
    onSubmit?.({
      fullName: values.fullName,
      email: values.email,
      phone: values.phone,
      address: addressStr,
      role: "admin",
    });
    reset(defaultValues);
    onOpenChange?.(false);
  };

  const addressError =
    errors.street || errors.city || errors.zip || errors.country
      ? "Please fill in Street, City, Zip and Country"
      : null;

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Add New Admin</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Name</Label>
          <Input
            id="fullName"
            placeholder="Enter your Admin name here..."
            {...register("fullName", {
              required: "Name is required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters",
              },
            })}
            className={cn(
              errors.fullName &&
                "border-destructive focus-visible:ring-destructive/50"
            )}
          />
          {errors.fullName?.message && (
            <p className="text-destructive text-sm">
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email address here..."
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Enter a valid email address",
              },
            })}
            className={cn(
              errors.email &&
                "border-destructive focus-visible:ring-destructive/50"
            )}
          />
          {errors.email?.message && (
            <p className="text-destructive text-sm">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Contact Number</Label>
          <Controller
            name="phone"
            control={control}
            rules={{ required: "Contact number is required" }}
            render={({ field }) => (
              <>
                <PhoneInput
                  international
                  defaultCountry="US"
                  placeholder="Enter your phone number"
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  className={cn(
                    phoneInputContainerClass,
                    errors.phone &&
                      "border-destructive focus-within:border-destructive focus-within:ring-destructive/50"
                  )}
                  numberInputProps={{ className: phoneNumberInputClass }}
                  countrySelectProps={{
                    className: "!border-0 !bg-transparent !p-0 !min-w-0",
                  }}
                />
                {errors.phone?.message && (
                  <p className="text-destructive text-sm">
                    {errors.phone.message}
                  </p>
                )}
              </>
            )}
          />
        </div>

        <div className="space-y-2">
          <Label>Address:</Label>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label
                htmlFor="street"
                className="text-muted-foreground font-normal text-sm"
              >
                Street:
              </Label>
              <Input
                id="street"
                placeholder="e.g. 17/1"
                {...register("street", { required: true })}
                className={cn(
                  errors.street &&
                    "border-destructive focus-visible:ring-destructive/50"
                )}
              />
            </div>
            <div className="space-y-1.5">
              <Label
                htmlFor="city"
                className="text-muted-foreground font-normal text-sm"
              >
                City:
              </Label>
              <Input
                id="city"
                placeholder="e.g. Dhaka"
                {...register("city", { required: true })}
                className={cn(
                  errors.city &&
                    "border-destructive focus-visible:ring-destructive/50"
                )}
              />
            </div>
            <div className="space-y-1.5">
              <Label
                htmlFor="zip"
                className="text-muted-foreground font-normal text-sm"
              >
                Zip:
              </Label>
              <Input
                id="zip"
                placeholder="e.g. 12095"
                {...register("zip", { required: true })}
                className={cn(
                  errors.zip &&
                    "border-destructive focus-visible:ring-destructive/50"
                )}
              />
            </div>
            <div className="space-y-1.5">
              <Label
                htmlFor="country"
                className="text-muted-foreground font-normal text-sm"
              >
                Country:
              </Label>
              <Input
                id="country"
                placeholder="e.g. United States"
                {...register("country", { required: true })}
                className={cn(
                  errors.country &&
                    "border-destructive focus-visible:ring-destructive/50"
                )}
              />
            </div>
          </div>
          {addressError && (
            <p className="text-destructive text-sm">{addressError}</p>
          )}
        </div>

        <DialogFooter>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Adding…" : "Add"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}

export default AdminAddModal;
