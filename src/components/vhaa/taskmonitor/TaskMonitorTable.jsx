"use client";

import SendReminderModal from "@/components/common/sendReminderModal/SendReminderModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useToast from '../../../hooks/useToast';
import { useGetSingleTaskQuery, useTaskReminderMutation } from '../../../redux/Apis/bhaa/TaskMonitor/taskMonitorApi';
import BhaaTaskDetails from "./BhaaTaskDetails";
import { Loader } from "lucide-react";

export function TaskMonitorTable({
  data = [],
  isLoading,
  error,
  pagination = {}
}) {
  const [currentPage, setCurrentPage] = useState(pagination.currentPage || 1);
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const totalPages = pagination.totalPages || 1;
  const router = useRouter();
  const toast = useToast();
  const [taskReminder, { isLoading: isSendingReminder }] = useTaskReminderMutation();

  // Fetch single task details when selected
  const { data: taskDetails, isLoading: isLoadingDetails } = useGetSingleTaskQuery(
    selectedTask?.userId?._id || selectedTask?.userId,
    {
      skip: !selectedTask || !isDetailsModalOpen
    }
  );

  const handleSendReminder = (task) => {
    setSelectedTask(task);
    setIsReminderModalOpen(true);
  };

  const handleViewDetails = (task) => {
    setSelectedTask(task);
    setIsDetailsModalOpen(true);
  };

  const handleSend = async (reminderData) => {
    if (!selectedTask) return;

    try {
      const payload = {
        taskId: selectedTask._id,
        message: reminderData.message
      };

      const response = await taskReminder(payload).unwrap();
      toast.success(response.message || "Reminder sent successfully");
      console.log("Reminder sent successfully");
      setIsReminderModalOpen(false);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to send reminder");
      console.error("Failed to send reminder:", error);
      // You might want to add error handling/toast notification here
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (pagination.onPageChange) {
      pagination.onPageChange(page);
    }
  };

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

  const formatTime = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  if (isLoading) {
    return (
      <Card className="bg-white p-6">
        <div className="space-y-4">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="bg-white p-6">
        <div className="text-center py-8">
          <p className="text-red-500">Error loading tasks. Please try again.</p>
          <Button
            onClick={() => window.location.reload()}
            className="mt-4"
            variant="outline"
          >
            Retry
          </Button>
        </div>
      </Card>
    );
  }

  if (data.length === 0) {
    return (
      <Card className="bg-white p-6">
        <div className="text-center py-8">
          <p className="text-gray-500">No tasks found</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-white">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="w-1/6">Task Event Time</TableHead>
              <TableHead className="w-1/6">Client Name</TableHead>
              <TableHead className="w-1/6">Client ID</TableHead>
              <TableHead className="w-1/6">Task Title</TableHead>
              <TableHead className="w-1/6">Status</TableHead>
              <TableHead className="w-1/6 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((task) => (
              <TableRow key={task._id}>
                <TableCell className="text-sm text-gray-700">
                  {formatTime(task.createdAt)}
                </TableCell>
                <TableCell className="text-sm">
                  <span
                    className="text-blue-600 underline cursor-pointer"
                    onClick={() =>
                      router.push(`/bhaa/client-details/${task.userId?._id || task.userId}`)
                    }
                  >
                    {task.userId?.fullName || "Unknown User"}
                  </span>
                </TableCell>
                <TableCell className="text-sm text-gray-700">
                  {task.userId?._id || task.userId || "N/A"}
                </TableCell>
                <TableCell className="text-sm text-gray-700">
                  {task.title}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={`${getStatusBadgeClass(
                      task.status
                    )} px-2 py-1 rounded-full text-center font-medium text-xs inline-block`}
                  >
                    {task.status?.charAt(0).toUpperCase() + task.status?.slice(1) || "Unknown"}
                  </Badge>
                </TableCell>
                <TableCell className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    className="border-blue-500 text-blue-500 hover:bg-blue-50 h-8 text-xs"
                    onClick={() => router.push(`/bhaa/messages?chatId=${task.chatId}`)}
                  >
                    Chat
                  </Button>
                  {task.status !== "completed" && (
                    <Button
                      variant="outline"
                      className="border-gray-400 text-gray-600 hover:bg-gray-50 h-8 text-xs"
                      onClick={() => handleSendReminder(task)}
                      disabled={isSendingReminder}
                    >
                      {isSendingReminder ? <>Sending...{" "}<Loader className="w-4 h-4 animate-spin text-white" /></> : "Send Reminder"}
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    className="border-gray-400 text-gray-600 hover:bg-gray-50 h-8 text-xs"
                    onClick={() => handleViewDetails(task)}
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableCaption>
            Showing {data.length} of {pagination.totalItems || 0} tasks
          </TableCaption>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 py-4 border-t">
          <Button
            variant="outline"
            className="bg-gray-100 text-gray-600 border-gray-300 h-8"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
          >
            Previous
          </Button>
          <div className="flex items-center gap-1">
            {/* Show first page */}
            <Button
              variant="outline"
              className={`h-8 w-8 ${currentPage === 1
                ? "bg-orange-500 text-white border-orange-500"
                : "bg-gray-100 text-gray-600 border-gray-300"
                }`}
              onClick={() => handlePageChange(1)}
            >
              1
            </Button>

            {/* Show ellipsis if needed */}
            {currentPage > 3 && <span className="px-2 text-gray-600">...</span>}

            {/* Show pages around current page */}
            {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
              let pageNum;
              if (currentPage <= 3) {
                pageNum = i + 2;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 3 + i;
              } else {
                pageNum = currentPage - 1 + i;
              }

              if (pageNum > 1 && pageNum < totalPages) {
                return (
                  <Button
                    key={pageNum}
                    variant="outline"
                    className={`h-8 w-8 ${currentPage === pageNum
                      ? "bg-orange-500 text-white border-orange-500"
                      : "bg-gray-100 text-gray-600 border-gray-300"
                      }`}
                    onClick={() => handlePageChange(pageNum)}
                  >
                    {pageNum}
                  </Button>
                );
              }
              return null;
            })}

            {/* Show ellipsis if needed */}
            {currentPage < totalPages - 2 && <span className="px-2 text-gray-600">...</span>}

            {/* Show last page if not already shown */}
            {totalPages > 1 && (
              <Button
                variant="outline"
                className={`h-8 w-8 ${currentPage === totalPages
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-gray-100 text-gray-600 border-gray-300"
                  }`}
                onClick={() => handlePageChange(totalPages)}
              >
                {totalPages}
              </Button>
            )}
          </div>
          <Button
            variant="outline"
            className="bg-orange-500 text-white border-orange-500 hover:bg-orange-600 h-8"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
          >
            Next
          </Button>
        </div>
      )}

      {/* Send Reminder Modal */}
      <SendReminderModal
        openModal={isReminderModalOpen}
        setOpenModal={setIsReminderModalOpen}
        onSend={handleSend}
        isLoading={isSendingReminder}
      />

      {/* View Task Details Modal */}
      {selectedTask && (
        <BhaaTaskDetails
          openModal={isDetailsModalOpen}
          setOpenModal={setIsDetailsModalOpen}
          taskData={taskDetails?.data?.tasks?.[0] || selectedTask}
          taskDetails={taskDetails}
          isLoading={isLoadingDetails}
        />
      )}
    </Card>
  );
}

export default TaskMonitorTable;