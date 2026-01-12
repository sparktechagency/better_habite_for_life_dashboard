"use client";

import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function BhaaClinetTaskDetails({ openModal, setOpenModal, taskData }) {
  if (!taskData) return null;

  const getStatusBadgeClass = (status) => {
    if (status === "Cancelled") {
      return "bg-red-500 text-white border-red-500";
    } else if (status === "Completed") {
      return "bg-lime-500 text-white border-lime-500";
    } else {
      return "bg-yellow-500 text-white border-yellow-500";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "No due date";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
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
                <p className="text-sm text-gray-600">{taskData.title}</p>
              </div>
              <Badge
                variant="outline"
                className={`${getStatusBadgeClass(
                  taskData.status
                )} px-2 py-1 text-center font-medium text-xs inline-block`}
              >
                {taskData.status}
              </Badge>
            </div>
          </div>

          {/* Task Description */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-900 block">
              Task Description:
            </label>
            <p className="text-sm text-gray-600 leading-relaxed">
              {taskData.description}
            </p>
          </div>

          {/* Date */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-900 block">
              Date:
            </label>
            <p className="text-sm text-gray-600">{formatDate(taskData.createdAt)}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default BhaaClinetTaskDetails;
