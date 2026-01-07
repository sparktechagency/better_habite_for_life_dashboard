"use client";

import SearchFilterButton from "@/components/common/SearchFilterButton";
import React, { useState } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Scrollbar } from "@radix-ui/react-scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SendReminderModal from "@/components/common/sendReminderModal/SendReminderModal";
import BhaaClinetTaskDetails from "./BhaaClinetTaskDetails";

function BhaaAssignTaskList() {
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

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

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-lg font-bold">Assign Task</p>
        <div className="flex-1 max-w-4xl">
          <SearchFilterButton
            showAddButton={false}
            placeholder="Search Client"
            searchByDate={true}
            selectOptions={["All Status", "Active", "Inactive"]}
          />
        </div>
      </div>
      <BhaaAssignTaskListTable
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

const tableData = [
  {
    id: 1,
    taskName: "Complete weekly exercise tracking",
    taskDescription: "Log daily physical activities for 7 consecutive days",
    targetDomain: "Self-Management Domain",
    date: "2025-05-12",
    status: "Cancelled",
  },
  {
    id: 2,
    taskName: "Complete weekly exercise tracking",
    taskDescription: "Log daily physical activities for 7 consecutive days",
    targetDomain: "Self-Management Domain",
    date: "2025-05-12",
    status: "Cancelled",
  },
  {
    id: 3,
    taskName: "Complete weekly exercise tracking",
    taskDescription: "Log daily physical activities for 7 consecutive days",
    targetDomain: "Self-Management Domain",
    date: "2025-05-12",
    status: "Completed",
  },
  {
    id: 4,
    taskName: "Complete weekly exercise tracking",
    taskDescription: "Log daily physical activities for 7 consecutive days",
    targetDomain: "Self-Management Domain",
    date: "2025-05-12",
    status: "Completed",
  },
  {
    id: 5,
    taskName: "Complete weekly exercise tracking",
    taskDescription: "Log daily physical activities for 7 consecutive days",
    targetDomain: "Self-Management Domain",
    date: "2025-05-12",
    status: "Cancelled",
  },
  {
    id: 6,
    taskName: "Complete weekly exercise tracking",
    taskDescription: "Log daily physical activities for 7 consecutive days",
    targetDomain: "Self-Management Domain",
    date: "2025-05-12",
    status: "Cancelled",
  },
  {
    id: 7,
    taskName: "Complete weekly exercise tracking",
    taskDescription: "Log daily physical activities for 7 consecutive days",
    targetDomain: "Self-Management Domain",
    date: "2025-05-12",
    status: "Completed",
  },
];

const BhaaAssignTaskListTable = ({ onSendReminder, onViewDetails }) => {
  return (
    <ScrollArea className="w-full rounded-md border whitespace-nowrap">
      <Table>
        <TableCaption className="text-lg font-bold">
          Assigned Task lists
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/6">Task Name</TableHead>
            <TableHead className="w-1/6">Task Description</TableHead>
            <TableHead className="w-1/6">Target Domain</TableHead>
            <TableHead className="w-1/6">Date</TableHead>
            <TableHead className="w-1/6">Status</TableHead>
            <TableHead className="w-auto flex justify-end gap-2 text-right ">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData.map((data, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium w-1/6">
                {data.taskName}
              </TableCell>
              <TableCell className="font-medium w-1/6">
                {data.taskDescription}
              </TableCell>

              <TableCell className="w-1/6">{data.targetDomain}</TableCell>
              <TableCell className="w-1/6">{data.date}</TableCell>
              <TableCell className="w-1/6">
                <Badge
                  variant="outline"
                  className={`${
                    data.status === "Cancelled"
                      ? "bg-red-500 text-white border-red-500"
                      : data.status === "Completed"
                      ? "bg-lime-500 text-white border-lime-500"
                      : "bg-yellow-500 text-white border-yellow-500"
                  } px-2 py-1  text-center font-medium text-xs inline-block w-20`}
                >
                  {data.status}
                </Badge>
              </TableCell>
              <TableCell className="w-auto flex justify-end gap-2 text-right ">
                <Button
                  variant="outline"
                  className="h-8"
                  onClick={() => onSendReminder(data)}
                >
                  Sent Reminder
                </Button>
                <Button
                  variant="outline"
                  className="h-8"
                  onClick={() => onViewDetails(data)}
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
