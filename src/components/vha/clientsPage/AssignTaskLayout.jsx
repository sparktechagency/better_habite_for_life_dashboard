"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import SearchFilterButton from "@/components/common/SearchFilterButton";
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
import { FiEdit3 } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import AddEditTaskModal from "./viewdetails/AddEditTaskModal";

const initialTasks = [
  {
    id: 1,
    taskName: "Complete weekly exercise tracking",
    taskDescription: "Log daily physical activities for 7 consecutive days",
    targetDomain: "Self-Management Domain",
    date: "2025-05-12",
    startTime: "10:00 AM",
    endTime: "11:00 AM",
    status: "Completed",
  },
  {
    id: 2,
    taskName: "Complete weekly exercise tracking",
    taskDescription: "Log daily physical activities for 7 consecutive days",
    targetDomain: "Self-Management Domain",
    date: "2025-05-12",
    startTime: "10:00 AM",
    endTime: "11:00 AM",
    status: "Completed",
  },
  {
    id: 3,
    taskName: "Complete weekly exercise tracking",
    taskDescription: "Log daily physical activities for 7 consecutive days",
    targetDomain: "Self-Management Domain",
    date: "2025-05-12",
    startTime: "10:00 AM",
    endTime: "11:00 AM",
    status: "Completed",
  },
  {
    id: 4,
    taskName: "Complete weekly exercise tracking",
    taskDescription: "Log daily physical activities for 7 consecutive days",
    targetDomain: "Self-Management Domain",
    date: "2025-05-12",
    startTime: "10:00 AM",
    endTime: "11:00 AM",
    status: "Completed",
  },
  {
    id: 5,
    taskName: "Complete weekly exercise tracking",
    taskDescription: "Log daily physical activities for 7 consecutive days",
    targetDomain: "Self-Management Domain",
    date: "2025-05-12",
    startTime: "10:00 AM",
    endTime: "11:00 AM",
    status: "Pending",
  },
  {
    id: 6,
    taskName: "Complete weekly exercise tracking",
    taskDescription: "Log daily physical activities for 7 consecutive days",
    targetDomain: "Self-Management Domain",
    date: "2025-05-12",
    startTime: "10:00 AM",
    endTime: "11:00 AM",
    status: "Pending",
  },
  {
    id: 7,
    taskName: "Complete weekly exercise tracking",
    taskDescription: "Log daily physical activities for 7 consecutive days",
    targetDomain: "Self-Management Domain",
    date: "2025-05-12",
    startTime: "10:00 AM",
    endTime: "11:00 AM",
    status: "Completed",
  },
];

function AssignTaskLayout() {
  const [tasks, setTasks] = useState(initialTasks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const handleAddClick = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleSave = (taskData) => {
    if (taskData.id) {
      setTasks((prev) =>
        prev.map((t) => (t.id === taskData.id ? { ...t, ...taskData } : t))
      );
    } else {
      const newId = tasks.length ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
      setTasks((prev) => [...prev, { ...taskData, id: newId }]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button
          className="bg-sky-500 text-white hover:bg-sky-600"
          onClick={handleAddClick}
        >
          Add New Task
        </Button>
      </div>
      <p className="text-lg font-bold">Sarah Peterson</p>
      <p className="text-lg font-bold">Task Details</p>
      <SearchFilterButton
        showAddButton={false}
        placeholder="Search Task"
        searchByDate={true}
        showFilterButton={false}
      />
      <TaskDetailsTable
        tasks={tasks}
        onEdit={handleEditClick}
        onDelete={handleDelete}
      />
      <AddEditTaskModal
        openModal={isModalOpen}
        setOpenModal={setIsModalOpen}
        onSave={handleSave}
        initialData={editingTask}
      />
    </div>
  );
}

export default AssignTaskLayout;

export function TaskDetailsTable({ tasks, onEdit, onDelete }) {
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
            <TableHead className="w-1/6">Start Time</TableHead>
            <TableHead className="w-1/6">End Time</TableHead>
            <TableHead className="w-1/6">Status</TableHead>
            <TableHead className="w-1/6">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((data) => (
            <TableRow key={data.id}>
              <TableCell className="font-medium w-1/6">
                {data.taskName}
              </TableCell>
              <TableCell className="font-medium w-1/6">
                {data.taskDescription}
              </TableCell>

              <TableCell className="w-1/6">{data.targetDomain}</TableCell>
              <TableCell className="w-1/6">{data.date}</TableCell>
              <TableCell className="w-1/6">{data.startTime}</TableCell>
              <TableCell className="w-1/6">{data.endTime}</TableCell>
              <TableCell className="w-1/6">
                <Badge
                  variant="outline"
                  className={`${
                    data.status === "Pending"
                      ? "bg-yellow-500 text-white"
                      : data.status === "Completed"
                      ? "bg-lime-500 text-white border-lime-500"
                      : "bg-red-500 text-white border-red-500"
                  } px-2 py-1  text-center font-medium text-xs inline-block w-20`}
                >
                  {data.status}
                </Badge>
              </TableCell>
              <TableCell className="w-auto flex justify-end gap-2 text-right ">
                <Button
                  variant="outline"
                  className="   "
                  onClick={() => onEdit && onEdit(data)}
                >
                  <FiEdit3 size={20} />
                </Button>
                <Button
                  variant="outline"
                  className="   "
                  onClick={() => onDelete && onDelete(data.id)}
                >
                  <FiTrash2 size={20} color="red" />
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
}
