"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function BhaaNewTaskPromptAddEdit({
  openModal,
  setOpenModal,
  onSave,
  initialData = null,
}) {
  const [formData, setFormData] = useState({
    prompt: "",
    category: "Morning Meditations",
    responseType: "Yes/No",
    status: "Active",
    response: "Daily",
    frequency: "",
  });

  const isEdit = !!initialData;

  // Load data when editing
  useEffect(() => {
    if (openModal) {
      if (initialData) {
        setFormData({
          prompt: initialData.prompt || "",
          category: initialData.category || "Morning Meditations",
          responseType: initialData.responseType || "Yes/No",
          status: initialData.status || "Active",
          response: initialData.response || "Daily",
          frequency: initialData.frequency || "",
        });
      } else {
        // Reset for new prompt
        setFormData({
          prompt: "",
          category: "Morning Meditations",
          responseType: "Yes/No",
          status: "Active",
          response: "Daily",
          frequency: "",
        });
      }
    }
  }, [openModal, initialData]);

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!formData.prompt.trim()) {
      return;
    }

    const payload = {
      id: initialData?.id,
      ...formData,
    };

    if (onSave) {
      onSave(payload);
    }

    setOpenModal(false);
  };

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogContent className="sm:max-w-lg p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle className="text-xl font-semibold text-left">
            {isEdit ? "Edit Reminder Prompt" : "Create a New Reminder Prompt"}
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 pb-4 space-y-4">
          {/* Prompt */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Prompt:</Label>
            <Textarea
              value={formData.prompt}
              onChange={(e) => updateField("prompt", e.target.value)}
              placeholder="Good Morning! Hope..."
              className="min-h-[100px] bg-gray-50 border-gray-200"
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Category:
            </Label>
            <Select
              value={formData.category}
              onValueChange={(val) => updateField("category", val)}
            >
              <SelectTrigger className="w-full bg-gray-50 border-gray-200">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Morning Meditations">
                  Morning Meditations
                </SelectItem>
                <SelectItem value="Evening Reflections">
                  Evening Reflections
                </SelectItem>
                <SelectItem value="Weekly Check-ins">
                  Weekly Check-ins
                </SelectItem>
                <SelectItem value="Daily Goals">Daily Goals</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Response type and Status - Same Row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Response type:
              </Label>
              <Select
                value={formData.responseType}
                onValueChange={(val) => updateField("responseType", val)}
              >
                <SelectTrigger className="w-full bg-gray-50 border-gray-200">
                  <SelectValue placeholder="Select response type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yes/No">Yes/No</SelectItem>
                  <SelectItem value="Text">Text</SelectItem>
                  <SelectItem value="Number">Number</SelectItem>
                  <SelectItem value="Rating">Rating</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Status:
              </Label>
              <Select
                value={formData.status}
                onValueChange={(val) => updateField("status", val)}
              >
                <SelectTrigger className="w-full bg-gray-50 border-gray-200">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                  <SelectItem value="Paused">Paused</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Response and Frequency - Same Row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Response:
              </Label>
              <Select
                value={formData.response}
                onValueChange={(val) => updateField("response", val)}
              >
                <SelectTrigger className="w-full bg-gray-50 border-gray-200">
                  <SelectValue placeholder="Select response" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Daily">Daily</SelectItem>
                  <SelectItem value="Weekly">Weekly</SelectItem>
                  <SelectItem value="Monthly">Monthly</SelectItem>
                  <SelectItem value="Custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Frequency:
              </Label>
              <Input
                type="number"
                value={formData.frequency}
                onChange={(e) => updateField("frequency", e.target.value)}
                placeholder="21"
                className="bg-gray-50 border-gray-200"
              />
            </div>
          </div>
        </div>

        <DialogFooter className="px-6 pb-6 pt-4">
          <Button variant="outline" onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            {isEdit ? "Update" : "Add"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default BhaaNewTaskPromptAddEdit;
