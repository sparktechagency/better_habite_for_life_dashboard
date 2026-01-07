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
import { Label } from "@/components/ui/label";

function SendReminderModal({ openModal, setOpenModal, onSend }) {
  const [selectedCategory, setSelectedCategory] = useState(
    "Morning Meditations"
  );
  const [prompt, setPrompt] = useState("");

  useEffect(() => {
    if (openModal) {
      setPrompt("");
      setSelectedCategory("Morning Meditations");
    }
  }, [openModal]);

  const handleSend = () => {
    if (!prompt.trim()) {
      return;
    }
    if (onSend) {
      onSend({
        category: selectedCategory,
        prompt: prompt.trim(),
      });
    }
    setOpenModal(false);
  };

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogContent className="sm:max-w-lg p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle className="text-xl font-semibold text-left">
            Set Reminder
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 pb-4">
          {/* Select Prompt Category */}
          <div className="space-y-2 mb-4">
            <label className="text-sm font-medium text-gray-700">
              Select Prompt Category
            </label>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-full bg-gray-50 border-gray-200">
                <SelectValue placeholder="Select a category" />
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
          <div className="space-y-2">
            <Label
              htmlFor="prompt"
              className="text-sm font-medium text-gray-700"
            >
              Prompt:
            </Label>
            <Textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your prompt here..."
              className="min-h-[120px] bg-white border-gray-200"
            />
          </div>
        </div>

        <DialogFooter className="px-6 pb-6 pt-4">
          <Button
            onClick={handleSend}
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            Send
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default SendReminderModal;
