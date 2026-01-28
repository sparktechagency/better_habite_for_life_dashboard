"use client";

import React from "react";
import { Calendar, User } from "lucide-react";
import { cn } from "@/lib/utils";
import formatDate from "@/utils/FormatDate/formatDate";
import { Badge } from "@/components/ui/badge";

function TasksList({ tasks = [], isLoading = false }) {
  if (isLoading) {
    return (
      <div className="text-center py-8 text-gray-500">Loading tasks...</div>
    );
  }

  if (tasks.length === 0) {
    return <div className="text-center py-8 text-gray-500">No tasks found</div>;
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div
          key={task._id}
          className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex items-center justify-between"
        >
          <div className="flex flex-col gap-1 flex-1">
            <p className="text-base font-semibold text-gray-900">
              {task.title}
            </p>
            <p className="text-sm text-gray-500 line-clamp-1">
              {task.description.slice(0, 100)}...
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
              <span className="flex items-center gap-1">
                <User size={14} />
                {task.userId?.fullName || "N/A"}
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={14} />
                {formatDate(task.startDate)} - {formatDate(task.endDate)}
              </span>
              <Badge
                variant="outline"
                className="bg-red-500/20 text-red-700 border-red-200"
              >
                {task.category}
              </Badge>
            </div>
          </div>

          <div className="flex-shrink-0 ml-4">
            <Badge
              className={cn(
                "px-3 py-1 rounded-full text-sm font-medium border capitalize",
                task.status === "completed"
                  ? "bg-lime-500/70 text-white"
                  : task.status === "pending"
                  ? "bg-yellow-500/70 text-white"
                  : task.status === "overdue"
                  ? "bg-red-500/70 text-white"
                  : task.status === "in-progress"
                  ? "bg-blue-500/70 text-white"
                  : "bg-gray-500/70 text-white"
              )}
            >
              {task.status}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TasksList;
