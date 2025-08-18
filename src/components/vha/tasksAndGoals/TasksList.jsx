"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import React, { useState } from "react";
import { TbSquareRoundedFilled } from "react-icons/tb";
function TasksList() {
  const [tasks, setTasks] = useState(taskData);

  const handleMarkAsComplete = (index) => {
    const updatedTasks = [...taskData];
    updatedTasks[index].markAsComplete = !updatedTasks[index].markAsComplete;
    setTasks(updatedTasks);
  };

  return (
    <div className="space-y-4">
      {tasks.map((task, index) => (
        <div
          key={index}
          className="bg-white p-4 rounded-lg flex items-center justify-between"
        >
          <div className="flex items-start gap-2">
            <Checkbox className="mt-1.5 " />
            <div>
              <div className="flex flex-col ">
                <h3 className="text-lg font-bold flex items-center gap-3 ">
                  {task.title}{" "}
                  <TbSquareRoundedFilled
                    className={`mt-1.5 size-3 ${
                      task.priority === "High"
                        ? "text-red-400"
                        : task.priority === "Medium"
                        ? "text-yellow-400"
                        : "text-green-400"
                    }`}
                  />
                </h3>
                <p className="text-sm text-gray-500">{task.description}</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <p>{task.person}</p>
                <p>{task.dueDate}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className={`h-8 border border-black ${
                task.markAsComplete
                  ? "bg-green-400 hover:bg-green-500"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
              size="sm"
              onClick={() => handleMarkAsComplete(index)}
            >
              {task.markAsComplete ? "Completed" : "Mark as Complete"}
            </Button>
            <Button
              variant="outline"
              className="h-8 border border-black"
              size="sm"
            >
              Cancel
            </Button>
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
    dueDate: "2025-08-20",
    priority: "Medium",
    markAsComplete: false,
  },
  {
    title: "Complete weekly exercise tracking",
    description: "Log daily physical activities for 7 consecutive days",
    person: "Michael Chen",
    dueDate: "2025-08-20",
    priority: "High",
    markAsComplete: true,
  },
  {
    title: "Complete weekly exercise tracking",
    description: "Log daily physical activities for 7 consecutive days",
    person: "Michael Chen",
    dueDate: "2025-08-20",
    priority: "Low",
    markAsComplete: false,
  },
  {
    title: "Complete weekly exercise tracking",
    description: "Log daily physical activities for 7 consecutive days",
    person: "Michael Chen",
    dueDate: "2025-08-20",
    priority: "High",
    markAsComplete: false,
  },
  {
    title: "Complete weekly exercise tracking",
    description: "Log daily physical activities for 7 consecutive days",
    person: "Michael Chen",
    dueDate: "2025-08-20",
    priority: "High",
    markAsComplete: false,
  },
];
