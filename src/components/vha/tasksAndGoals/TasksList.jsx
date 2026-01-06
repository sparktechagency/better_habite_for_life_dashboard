"use client";

import React, { useState } from "react";
import { Clock, User } from "lucide-react";
import { cn } from "@/lib/utils";

function TasksList() {
  const [tasks] = useState(taskData);

  return (
    <div className="space-y-3">
      {tasks.map((task, index) => (
        <div
          key={index}
          className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex items-center justify-between"
        >
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock size={14} />
              <span>{task.time}</span>
            </div>
            <p className="text-base font-semibold text-gray-900">
              {task.title}
            </p>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <User size={14} />
                {task.person}
              </span>
              <span className="text-xs text-gray-500">{task.personId}</span>
            </div>
          </div>

          <div className="flex-shrink-0">
            <span
              className={cn(
                "px-3 py-1 rounded-full text-sm font-medium border",
                task.status === "Completed"
                  ? "bg-green-50 text-green-600 border-green-100"
                  : "bg-amber-50 text-amber-600 border-amber-100"
              )}
            >
              {task.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TasksList;
const taskData = [
  {
    title: "Complete weekly exercise tracking",
    description: "Log daily physical activities for 7 consecutive days",
    person: "Michael Chen",
    personId: "#0123453",
    time: "09:00 AM",
    dueDate: "2025-08-20",
    status: "Pending",
  },
  {
    title: "Complete weekly exercise tracking",
    description: "Log daily physical activities for 7 consecutive days",
    person: "Michael Chen",
    personId: "#0123453",
    time: "09:00 AM",
    dueDate: "2025-08-20",
    status: "Completed",
  },
  {
    title: "Complete weekly exercise tracking",
    description: "Log daily physical activities for 7 consecutive days",
    person: "Michael Chen",
    personId: "#0123453",
    time: "09:00 AM",
    dueDate: "2025-08-20",
    status: "Pending",
  },
  {
    title: "Complete weekly exercise tracking",
    description: "Log daily physical activities for 7 consecutive days",
    person: "Michael Chen",
    personId: "#0123453",
    time: "09:00 AM",
    dueDate: "2025-08-20",
    status: "Pending",
  },
  {
    title: "Complete weekly exercise tracking",
    description: "Log daily physical activities for 7 consecutive days",
    person: "Michael Chen",
    personId: "#0123453",
    time: "09:00 AM",
    dueDate: "2025-08-20",
    status: "Completed",
  },
];
