"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";

function SendReminderModal({ openModal, setOpenModal, onSend, isLoading = false }) {
  const [prompt, setPrompt] = useState("");

  useEffect(() => {
    if (openModal) {
      setPrompt("");
    }
  }, [openModal]);

  const handleSend = () => {
    if (!prompt.trim()) {
      return;
    }
    if (onSend) {
      onSend({
        message: prompt.trim(),
      });
    }
  };

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogContent className="sm:max-w-lg p-0">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle className="text-xl font-semibold text-left">
            Set Reminder
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 pb-4">
          <div className="space-y-2">
            <Label
              htmlFor="prompt"
              className="text-sm font-medium text-gray-700"
            >
              Message:
            </Label>
            <Textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your reminder message here..."
              className="min-h-[120px] mt-3 bg-white border-gray-200"
              disabled={isLoading}
            />
          </div>
        </div>

        <DialogFooter className="px-6 pb-6 pt-4">
          <Button
            onClick={() => setOpenModal(false)}
            variant="outline"
            disabled={isLoading}
            className="mr-2"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSend}
            disabled={!prompt.trim() || isLoading}
            className="bg-orange-500 hover:bg-orange-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Sending..." : "Send"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default SendReminderModal;