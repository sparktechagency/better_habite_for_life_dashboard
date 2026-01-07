"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import SendReminderModal from "@/components/common/sendReminderModal/SendReminderModal";
import BhaaTaskDetails from "./BhaaTaskDetails";
import { useRouter } from "next/navigation";

const tableData = [
  {
    id: 1,
    taskEventTime: "09:12 AM",
    clientName: "Taylor Smith",
    clientId: "4839271",
    taskTitle: "Morning Meditations",
    taskName: "Complete weekly exercise tracking",
    targetDomain: "Self-Management Domain",
    taskDescription:
      "Log daily physical activities for 7 consecutive days. Log daily physical activities for 7 consecutive days. Log daily physical activities for 7 consecutive days.",
    date: "2024-06-01",
    status: "Cancelled",
  },
  {
    id: 2,
    taskEventTime: "09:12 AM",
    clientName: "Taylor Smith",
    clientId: "4839271",
    taskTitle: "Morning Meditations",
    taskName: "Complete weekly exercise tracking",
    targetDomain: "Self-Management Domain",
    taskDescription:
      "Log daily physical activities for 7 consecutive days. Log daily physical activities for 7 consecutive days. Log daily physical activities for 7 consecutive days.",
    date: "2024-06-01",
    status: "Pending",
  },
  {
    id: 3,
    taskEventTime: "09:12 AM",
    clientName: "Taylor Smith",
    clientId: "4839271",
    taskTitle: "Morning Meditations",
    taskName: "Complete weekly exercise tracking",
    targetDomain: "Self-Management Domain",
    taskDescription:
      "Log daily physical activities for 7 consecutive days. Log daily physical activities for 7 consecutive days. Log daily physical activities for 7 consecutive days.",
    date: "2024-06-01",
    status: "Completed",
  },
  {
    id: 4,
    taskEventTime: "09:12 AM",
    clientName: "Taylor Smith",
    clientId: "4839271",
    taskTitle: "Morning Meditations",
    taskName: "Complete weekly exercise tracking",
    targetDomain: "Self-Management Domain",
    taskDescription:
      "Log daily physical activities for 7 consecutive days. Log daily physical activities for 7 consecutive days. Log daily physical activities for 7 consecutive days.",
    date: "2024-06-01",
    status: "Cancelled",
  },
  {
    id: 5,
    taskEventTime: "09:12 AM",
    clientName: "Taylor Smith",
    clientId: "4839271",
    taskTitle: "Morning Meditations",
    taskName: "Complete weekly exercise tracking",
    targetDomain: "Self-Management Domain",
    taskDescription:
      "Log daily physical activities for 7 consecutive days. Log daily physical activities for 7 consecutive days. Log daily physical activities for 7 consecutive days.",
    date: "2024-06-01",
    status: "Overdue",
  },
];

export function TaskMonitorTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const totalPages = 5;
  const router = useRouter();
  const handleSendReminder = (task) => {
    setSelectedTask(task);
    setIsReminderModalOpen(true);
  };

  const handleViewDetails = (task) => {
    setSelectedTask(task);
    setIsDetailsModalOpen(true);
  };

  const handleSend = (reminderData) => {
    console.log("Sending reminder for task:", selectedTask);
    console.log("Reminder data:", reminderData);
    // Add your reminder sending logic here
  };

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
            {tableData.map((data) => (
              <TableRow key={data.id}>
                <TableCell className="text-sm text-gray-700">
                  {data.taskEventTime}
                </TableCell>
                <TableCell className="text-sm">
                  <span
                    className="text-blue-600 underline cursor-pointer"
                    onClick={() =>
                      router.push(`/bhaa/client-details/${data.clientId}`)
                    }
                  >
                    {data.clientName}
                  </span>
                </TableCell>
                <TableCell className="text-sm text-gray-700">
                  {data.clientId}
                </TableCell>
                <TableCell className="text-sm text-gray-700">
                  {data.taskTitle}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={`${getStatusBadgeClass(
                      data.status
                    )} px-2 py-1 rounded-full text-center font-medium text-xs inline-block`}
                  >
                    {data.status}
                  </Badge>
                </TableCell>
                <TableCell className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    className="border-blue-500 text-blue-500 hover:bg-blue-50 h-8 text-xs"
                  >
                    Chat
                  </Button>
                  {data.status !== "Completed" && (
                    <Button
                      variant="outline"
                      className="border-gray-400 text-gray-600 hover:bg-gray-50 h-8 text-xs"
                      onClick={() => handleSendReminder(data)}
                    >
                      Sent Reminder
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    className="border-gray-400 text-gray-600 hover:bg-gray-50 h-8 text-xs"
                    onClick={() => handleViewDetails(data)}
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 py-4 border-t">
        <Button
          variant="outline"
          className="bg-gray-100 text-gray-600 border-gray-300 h-8"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
        >
          Previous
        </Button>
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            className={`h-8 w-8 ${
              currentPage === 1
                ? "bg-orange-500 text-white border-orange-500"
                : "bg-gray-100 text-gray-600 border-gray-300"
            }`}
            onClick={() => setCurrentPage(1)}
          >
            1
          </Button>
          <Button
            variant="outline"
            className={`h-8 w-8 ${
              currentPage === 2
                ? "bg-orange-500 text-white border-orange-500"
                : "bg-gray-100 text-gray-600 border-gray-300"
            }`}
            onClick={() => setCurrentPage(2)}
          >
            2
          </Button>
          <span className="px-2 text-gray-600">...</span>
          <Button
            variant="outline"
            className={`h-8 w-8 ${
              currentPage === 5
                ? "bg-orange-500 text-white border-orange-500"
                : "bg-gray-100 text-gray-600 border-gray-300"
            }`}
            onClick={() => setCurrentPage(5)}
          >
            5
          </Button>
        </div>
        <Button
          variant="outline"
          className="bg-orange-500 text-white border-orange-500 hover:bg-orange-600 h-8"
          disabled={currentPage === totalPages}
          onClick={() =>
            setCurrentPage((prev) => Math.min(totalPages, prev + 1))
          }
        >
          Next
        </Button>
      </div>

      {/* Send Reminder Modal */}
      <SendReminderModal
        openModal={isReminderModalOpen}
        setOpenModal={setIsReminderModalOpen}
        onSend={handleSend}
      />

      {/* View Task Details Modal */}
      <BhaaTaskDetails
        openModal={isDetailsModalOpen}
        setOpenModal={setIsDetailsModalOpen}
        taskData={selectedTask}
      />
    </Card>
  );
}

export default TaskMonitorTable;
