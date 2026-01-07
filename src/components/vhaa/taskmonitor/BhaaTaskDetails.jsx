"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

function BhaaTaskDetails({ openModal, setOpenModal, taskData }) {
  if (!taskData) return null;

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Cancelled":
        return "bg-red-100 text-red-600 border-red-200";
      case "Pending":
        return "bg-yellow-100 text-yellow-600 border-yellow-200";
      case "Completed":
        return "bg-green-100 text-green-600 border-green-200";
      case "Overdue":
        return "bg-gray-100 text-gray-600 border-gray-200";
      default:
        return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-left">
            View Task Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Task Title with Status Badge */}
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-2">
                <label className="text-sm font-bold text-gray-900 block">
                  Task Title:
                </label>
                <p className="text-sm text-gray-600">
                  {taskData.taskName ||
                    taskData.taskTitle ||
                    "Complete weekly exercise tracking"}
                </p>
              </div>
              <Badge
                variant="outline"
                className={`${getStatusBadgeClass(
                  taskData.status
                )} px-2 py-1 rounded-full text-center font-medium text-xs inline-block`}
              >
                {taskData.status}
              </Badge>
            </div>
          </div>

          {/* Target Domain */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-900 block">
              Target Domain:
            </label>
            <p className="text-sm text-gray-600">
              {taskData.targetDomain || "Self-Management Domain"}
            </p>
          </div>

          {/* Task Description */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-900 block">
              Task Description:
            </label>
            <p className="text-sm text-gray-600 leading-relaxed">
              {taskData.taskDescription ||
                "Log daily physical activities for 7 consecutive days. Log daily physical activities for 7 consecutive days. Log daily physical activities for 7 consecutive days."}
            </p>
          </div>

          {/* Date */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-900 block">
              Date:
            </label>
            <p className="text-sm text-gray-600">
              {taskData.date || "2024-06-01"}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default BhaaTaskDetails;
