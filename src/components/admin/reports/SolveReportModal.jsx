"use client";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

function SolveReportModal({ openModal, setOpenModal, report, onSend }) {
  const [answer, setAnswer] = useState("");

  // Reset answer when modal closes
  useEffect(() => {
    if (!openModal) {
      setAnswer("");
    }
  }, [openModal]);

  const handleSend = () => {
    if (answer.trim() && report) {
      if (onSend) {
        onSend(report, answer);
      }
      setOpenModal(false);
      setAnswer("");
    }
  };

  const handleOpenChange = (open) => {
    setOpenModal(open);
  };

  if (!report) return null;

  // Format description with proper line breaks
  const formattedDescription =
    report.description ||
    "Dear Sir,\nLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.\nThank you.";

  return (
    <Dialog open={openModal} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-left text-xl font-semibold">
            Solve the Report
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Report Description Section */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">
              Report Description:
            </label>
            <div className="bg-gray-50 border border-gray-200 rounded-md p-4 min-h-[120px]">
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                {formattedDescription}
              </p>
            </div>
          </div>

          {/* Add Your Answer Section */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">
              Add Your Answer
            </label>
            <Textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Enter the answer her.."
              className="min-h-[120px] bg-gray-50 border-gray-200 resize-none"
            />
          </div>

          {/* Send Button */}
          <div className="flex justify-end pt-2">
            <Button
              onClick={handleSend}
              disabled={!answer.trim()}
              className="bg-gray-800 hover:bg-gray-700 text-white rounded-md px-6 py-2 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SolveReportModal;
