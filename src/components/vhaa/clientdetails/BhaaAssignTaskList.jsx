"use client";

import SearchFilterButton from "@/components/common/SearchFilterButton";
import { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

import SendReminderModal from "@/components/common/sendReminderModal/SendReminderModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Scrollbar } from "@radix-ui/react-scroll-area";
import useToast from '../../../hooks/useToast';
import { useReminderMutation } from '../../../redux/Apis/bhaa/client/clientApi';
import BhaaClinetTaskDetails from "./BhaaClinetTaskDetails";
function BhaaAssignTaskList({ tasks = [] }) {
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [reminder, { isLoading }] = useReminderMutation();
  const toast = useToast();

  const handleSendReminder = (task) => {
    setSelectedTask(task);
    setIsReminderModalOpen(true);
  };

  const handleViewDetails = (task) => {
    setSelectedTask(task);
    setIsDetailsModalOpen(true);
  };

  const handleSend = async (reminderData) => {
    const data = {
      message: reminderData.message,
      taskId: selectedTask._id
    }
    try {
      const response = await reminder(data).unwrap();
      setIsReminderModalOpen(false);
      toast.success(response.message || "Reminder sent successfully");
    } catch (error) {
      console.error("Error sending reminder:", error);
    }
  };

  // Filter tasks based on search and status
  const filteredTasks = tasks.filter(task => {
    // Search filter
    const matchesSearch =
      task.title?.toLowerCase().includes(searchText.toLowerCase()) ||
      task.description?.toLowerCase().includes(searchText.toLowerCase()) ||
      task.category?.toLowerCase().includes(searchText.toLowerCase());

    // Status filter
    const matchesStatus =
      statusFilter === "All Status" ||
      (statusFilter === "Active" && task.status !== "completed") ||
      (statusFilter === "Inactive" && task.status === "completed");

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-lg font-bold">Assigned Tasks</p>
        <div className="flex-1 max-w-4xl">
          <SearchFilterButton
            showAddButton={false}
            placeholder="Search tasks..."
            searchByDate={true}
            selectOptions={["All Status", "Active", "Inactive"]}
            searchText={searchText}
            setSearchText={setSearchText}
            status={statusFilter}
            setStatus={setStatusFilter}
          />
        </div>
      </div>

      <BhaaAssignTaskListTable
        tasks={filteredTasks}
        onSendReminder={handleSendReminder}
        onViewDetails={handleViewDetails}
      />

      <SendReminderModal
        openModal={isReminderModalOpen}
        setOpenModal={setIsReminderModalOpen}
        onSend={handleSend}
      />
      <BhaaClinetTaskDetails
        openModal={isDetailsModalOpen}
        setOpenModal={setIsDetailsModalOpen}
        taskData={selectedTask}
      />
    </div>
  );
}

export default BhaaAssignTaskList;

const BhaaAssignTaskListTable = ({ tasks, onSendReminder, onViewDetails }) => {

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "No due date";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return "bg-lime-500 text-white border-lime-500";
      case 'overdue':
        return "bg-red-500 text-white border-red-500";
      case 'pending':
        return "bg-yellow-500 text-white border-yellow-500";
      default:
        return "bg-gray-500 text-white border-gray-500";
    }
  };

  // Get status display text
  const getStatusText = (status) => {
    if (!status) return "Unknown";
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  if (!tasks || tasks.length === 0) {
    return (
      <div className="w-full rounded-md border p-8 text-center">
        <p className="text-gray-500">No tasks assigned to this client</p>
      </div>
    );
  }

  return (
    <ScrollArea className="w-full rounded-md border whitespace-nowrap">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/6">Task Title</TableHead>
            <TableHead className="w-1/6">Description</TableHead>
            <TableHead className="w-1/6">Category</TableHead>
            <TableHead className="w-1/6">Due Date</TableHead>
            <TableHead className="w-1/6">Status</TableHead>
            <TableHead className="w-auto flex justify-start items-center gap-2">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks?.map((task, index) => (
            <TableRow key={task._id || index}>
              <TableCell className="font-medium w-1/6">
                {task.title || "Untitled Task"}
              </TableCell>
              <TableCell className="font-medium w-1/6">
                <div className="max-w-xs truncate">
                  {task.description || "No description"}
                </div>
              </TableCell>
              <TableCell className="w-1/6">
                {task.category || "Uncategorized"}
              </TableCell>
              <TableCell className="w-1/6">
                {formatDate(task.endDate)}
              </TableCell>
              <TableCell className="w-1/6">
                <Badge
                  variant="outline"
                  className={`${getStatusColor(task.status)} px-2 py-1 text-center font-medium text-xs inline-block w-24`}
                >
                  {getStatusText(task.status)}
                </Badge>
              </TableCell>
              <TableCell className="w-auto flex justify-end gap-2 text-right">
                <Button
                  variant="outline"
                  className="h-8"
                  onClick={() => onSendReminder(task)}
                >
                  Send Reminder
                </Button>
                <Button
                  variant="outline"
                  className="h-8"
                  onClick={() => onViewDetails(task)}
                >
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter></TableFooter>
      </Table>
      <Scrollbar orientation="horizontal" className="h-2 w-full" />
    </ScrollArea>
  );
};