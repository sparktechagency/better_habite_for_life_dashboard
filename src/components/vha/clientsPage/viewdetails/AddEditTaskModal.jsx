"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { useGetAllCategoriesQuery } from "@/redux/Apis/admin/categoryApi/categoryApi";
import { Loader } from "lucide-react";

const AddEditTaskModal = ({
  openModal,
  setOpenModal,
  onSave,
  initialData = null,
  isLoading = false,
}) => {
  // Fetch all categories
  const { data: categoriesData, isLoading: isCategoriesLoading } =
    useGetAllCategoriesQuery();
  const [formData, setFormData] = useState({
    taskTitle: "",
    taskDescription: "",
    categoryId: "",
    startDate: null,
    endDate: null,
  });
  const [isStartDateOpen, setIsStartDateOpen] = useState(false);
  const [isEndDateOpen, setIsEndDateOpen] = useState(false);

  // Map categories from API
  const categories = categoriesData?.data || [];

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Load data when editing
  useEffect(() => {
    if (openModal) {
      setFormData({
        taskTitle: initialData?.taskName || "",
        taskDescription: initialData?.taskDescription || "",
        categoryId: initialData?.categoryId || "",
        startDate: initialData?.startDate
          ? new Date(initialData.startDate)
          : null,
        endDate: initialData?.endDate ? new Date(initialData.endDate) : null,
      });
    }
  }, [openModal, initialData]);

  const handleSave = () => {
    if (!formData.taskTitle.trim()) return;
    const payload = {
      id: initialData?.id,
      title: formData.taskTitle,
      description: formData.taskDescription,
      categoryId: formData.categoryId,
      startDate: formData.startDate
        ? format(formData.startDate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
        : "",
      endDate: formData.endDate
        ? format(formData.endDate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
        : "",
    };
    if (onSave) onSave(payload);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogContent className="sm:max-w-lg p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle className="text-xl font-semibold text-left">
            {initialData ? "Edit Task" : "Create New Task"}
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 pb-2 space-y-4">
          {/* Task Title */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">
              Task Title
            </label>
            <Input
              placeholder="Enter your session..."
              value={formData.taskTitle}
              onChange={(e) => updateField("taskTitle", e.target.value)}
              className="bg-gray-100"
            />
          </div>

          {/* Task Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">
              Task Description
            </label>
            <Textarea
              placeholder="Type your task description..."
              value={formData.taskDescription}
              onChange={(e) => updateField("taskDescription", e.target.value)}
              className="bg-gray-100 min-h-[140px]"
            />
          </div>

          {/* Target Domain */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">
              Target Domain
            </label>
            <Select
              value={formData.categoryId}
              onValueChange={(val) => updateField("categoryId", val)}
            >
              <SelectTrigger className="bg-gray-100 w-full">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {isCategoriesLoading ? (
                  <SelectItem value="" disabled>
                    Loading categories...
                  </SelectItem>
                ) : categories.length === 0 ? (
                  <SelectItem value="" disabled>
                    No categories available
                  </SelectItem>
                ) : (
                  categories.map((category) => (
                    <SelectItem key={category._id} value={category._id}>
                      {category.name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Date Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Start Date */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900">
                Start Date
              </label>
              <Popover open={isStartDateOpen} onOpenChange={setIsStartDateOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between bg-gray-100 border-gray-200 text-left font-normal"
                  >
                    {formData.startDate ? (
                      format(formData.startDate, "PPP")
                    ) : (
                      <span className="text-gray-500">Select start date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.startDate}
                    onSelect={(day) => {
                      updateField("startDate", day);
                      setIsStartDateOpen(false);
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* End Date */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900">
                End Date
              </label>
              <Popover open={isEndDateOpen} onOpenChange={setIsEndDateOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between bg-gray-100 border-gray-200 text-left font-normal"
                  >
                    {formData.endDate ? (
                      format(formData.endDate, "PPP")
                    ) : (
                      <span className="text-gray-500">Select end date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.endDate}
                    onSelect={(day) => {
                      updateField("endDate", day);
                      setIsEndDateOpen(false);
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>

        <DialogFooter className="px-6 pb-6">
          <Button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white"
            disabled={isLoading}
          >
            {isLoading ? <>Saving...{" "}<Loader className="w-4 h-4 animate-spin ml-2 text-white" /></> : initialData ? "Update" : "Add"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditTaskModal;
