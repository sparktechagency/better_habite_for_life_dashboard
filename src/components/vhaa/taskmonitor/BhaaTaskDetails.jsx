"use client";

import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";

function BhaaTaskDetails({ openModal, setOpenModal, taskData, taskDetails, isLoading }) {
  if (!taskData) return null;

  const getStatusBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case "cancelled":
        return "bg-red-100 text-red-600 border-red-200";
      case "pending":
        return "bg-yellow-100 text-yellow-600 border-yellow-200";
      case "completed":
        return "bg-green-100 text-green-600 border-green-200";
      case "overdue":
        return "bg-gray-100 text-gray-600 border-gray-200";
      default:
        return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-left">
              View Task Details
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  const user = taskDetails?.data?.user || {};
  const task = taskDetails?.data?.tasks?.[0] || taskData;

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-left">
            View Task Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Client Information */}
          <div className="space-y-2 border-b pb-4">
            <h3 className="text-sm font-bold text-gray-900">Client Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block">Name:</label>
                <p className="text-sm text-gray-600">{user.fullName || "N/A"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block">Email:</label>
                <p className="text-sm text-gray-600">{user.email || "N/A"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block">Phone:</label>
                <p className="text-sm text-gray-600">{user.phone || "N/A"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block">Client ID:</label>
                <p className="text-sm text-gray-600">{user._id || "N/A"}</p>
              </div>
            </div>
          </div>

          {/* Task Information */}
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-2">
                <label className="text-sm font-bold text-gray-900 block">
                  Task Title:
                </label>
                <p className="text-sm text-gray-600">
                  {task.title || "No title"}
                </p>
              </div>
              <Badge
                variant="outline"
                className={`${getStatusBadgeClass(
                  task.status
                )} px-2 py-1 rounded-full text-center font-medium text-xs inline-block`}
              >
                {task.status?.charAt(0).toUpperCase() + task.status?.slice(1) || "Unknown"}
              </Badge>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-900 block">
                Category:
              </label>
              <p className="text-sm text-gray-600">
                {task.category || "Not specified"}
              </p>
            </div>

            {/* Task Description */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-900 block">
                Task Description:
              </label>
              <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                {task.description || "No description provided"}
              </p>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-900 block">
                  Start Date:
                </label>
                <p className="text-sm text-gray-600">
                  {formatDate(task.startDate)}
                </p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-900 block">
                  End Date:
                </label>
                <p className="text-sm text-gray-600">
                  {formatDate(task.endDate)}
                </p>
              </div>
            </div>

            {/* Created At */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">
                Created At:
              </label>
              <p className="text-sm text-gray-600">
                {formatDate(task.createdAt)}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default BhaaTaskDetails;