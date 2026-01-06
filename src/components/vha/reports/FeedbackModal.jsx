"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const FeedbackModal = ({ openModal, setOpenModal, clientData, onSave }) => {
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (openModal) {
      setFeedback("");
    }
  }, [openModal]);

  const handleSubmit = () => {
    if (!feedback.trim()) return;

    if (onSave) {
      onSave({
        clientId: clientData?.id,
        clientName: clientData?.name,
        feedback: feedback.trim(),
      });
    }

    setOpenModal(false);
    setFeedback("");
  };

  const handleClose = () => {
    setOpenModal(false);
    setFeedback("");
  };

  if (!clientData) return null;

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Provide Feedback
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Client Info */}
          <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
            <Avatar className="size-12">
              <AvatarImage src={clientData.avatar} alt={clientData.name} />
              <AvatarFallback>
                {clientData.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="text-base font-semibold text-gray-800">
                {clientData.name}
              </p>
              <p className="text-sm text-gray-500">{clientData.email}</p>
            </div>
          </div>

          {/* Feedback Textarea */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">
              Feedback
            </label>
            <Textarea
              placeholder="Enter your feedback here..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="min-h-[120px] bg-gray-50 border-gray-200 resize-none mt-2"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!feedback.trim()}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Submit Feedback
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackModal;
