"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function BhaaTaskPromtViewModal({ openModal, setOpenModal, promptData }) {
  if (!promptData) return null;

  const fields = [
    {
      label: "Category:",
      value: promptData.category || "Morning Meditations",
    },
    {
      label: "Status:",
      value: promptData.status || "Active",
    },
    {
      label: "Frequency:",
      value: promptData.frequency?.toString() || "21",
    },
    {
      label: "Response Type:",
      value: promptData.responseType || "Yes/No",
    },
    {
      label: "Response:",
      value: promptData.response || "Daily",
    },
  ];

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-left">
            Task Alerts Details
          </DialogTitle>
        </DialogHeader>

        <div className="py-4">
          {fields.map((field, index) => (
            <div key={index}>
              <div className="flex items-center justify-between py-3">
                <span className="text-sm text-gray-500 font-medium">
                  {field.label}
                </span>
                <span className="text-sm text-gray-900 font-medium">
                  {field.value}
                </span>
              </div>
              {index < fields.length - 1 && (
                <div className="border-t border-gray-200" />
              )}
            </div>
          ))}

          {/* Prompt Field - Full Width */}
          <div className="pt-3">
            <div className="border-t border-gray-200 mb-3" />
            <div className="space-y-2">
              <span className="text-sm text-gray-500 font-medium block">
                Prompt:
              </span>
              <p className="text-sm text-gray-900 leading-relaxed">
                {promptData.prompt ||
                  "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default BhaaTaskPromtViewModal;
