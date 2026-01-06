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

const AddEditTaskModal = ({
  openModal,
  setOpenModal,
  onSave,
  initialData = null,
}) => {
  const [formData, setFormData] = useState({
    taskTitle: "",
    taskDescription: "",
    category: "",
    date: null, // store Date object
    startTime: "",
    endTime: "",
  });
  const [isDateOpen, setIsDateOpen] = useState(false);

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Load data when editing
  useEffect(() => {
    if (openModal) {
      setFormData({
        taskTitle: initialData?.taskName || "",
        taskDescription: initialData?.taskDescription || "",
        category: initialData?.targetDomain || "",
        date: initialData?.date ? new Date(initialData.date) : null,
        startTime: initialData?.startTime || "",
        endTime: initialData?.endTime || "",
      });
    }
  }, [openModal, initialData]);

  const handleSave = () => {
    if (!formData.taskTitle.trim()) return;
    const payload = {
      id: initialData?.id,
      taskName: formData.taskTitle,
      taskDescription: formData.taskDescription,
      targetDomain: formData.category,
      date: formData.date ? format(formData.date, "yyyy-MM-dd") : "",
      startTime: formData.startTime,
      endTime: formData.endTime,
      status: initialData?.status || "Pending",
    };
    if (onSave) onSave(payload);
    setOpenModal(false);
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
              value={formData.category}
              onValueChange={(val) => updateField("category", val)}
            >
              <SelectTrigger className="bg-gray-100">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Self-Management Domain">
                  Self-Management Domain
                </SelectItem>
                <SelectItem value="Communication Domain">
                  Communication Domain
                </SelectItem>
                <SelectItem value="Physical Health Domain">
                  Physical Health Domain
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Date */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">Date</label>
            <Popover open={isDateOpen} onOpenChange={setIsDateOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between bg-gray-100 border-gray-200 text-left font-normal"
                >
                  {formData.date ? (
                    format(formData.date, "PPP")
                  ) : (
                    <span className="text-gray-500">Select a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formData.date}
                  onSelect={(day) => {
                    updateField("date", day);
                    setIsDateOpen(false);
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Time Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900">
                Start Time
              </label>
              <Input
                type="time"
                value={formData.startTime}
                onChange={(e) => updateField("startTime", e.target.value)}
                className="bg-gray-100"
                placeholder="Enter start time here"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900">
                End Time
              </label>
              <Input
                type="time"
                value={formData.endTime}
                onChange={(e) => updateField("endTime", e.target.value)}
                className="bg-gray-100"
                placeholder="Enter end time here"
              />
            </div>
          </div>
        </div>

        <DialogFooter className="px-6 pb-6">
          <Button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {initialData ? "Update" : "Add"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditTaskModal;
