import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IoNotificationsOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";

// Map color names to Tailwind classes
const colorClasses = {
  yellow: {
    border: "border-gray-200",
    borderLeft: "border-l-yellow-500",
    bg: "bg-yellow-50",
  },
  violet: {
    border: "border-gray-200",
    borderLeft: "border-l-violet-500",
    bg: "bg-violet-50",
  },
  green: {
    border: "border-gray-200",
    borderLeft: "border-l-green-500",
    bg: "bg-green-50",
  },
  red: {
    border: "border-gray-200",
    borderLeft: "border-l-red-500",
    bg: "bg-red-50",
  },
};

const PrioritySection = () => {
  const priorityList = [
    { title: "Priority 1", color: "yellow" },
    { title: "Priority 2", color: "violet" },
    { title: "Priority 3", color: "green" },
    { title: "Priority 4", color: "red" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <IoNotificationsOutline />
          <span>Priority</span>
        </CardTitle>
        <CardAction>
          <p className="font-semibold text-sky-500 underline cursor-pointer">
            View All
          </p>
        </CardAction>
      </CardHeader>

      <CardContent className="space-y-2">
        {priorityList.map((item, index) => {
          const classes = colorClasses[item.color];
          return (
            <div
              key={index}
              className="flex items-center justify-between rounded-lg"
            >
              <div
                className={`p-6 flex items-center justify-between w-full 
                  border-l-8 ${classes.borderLeft} border ${classes.border} 
                  rounded-xl ${classes.bg}`}
              >
                <p>{item.title}</p>
                <Button variant="outline" size="sm">
                  View Task
                </Button>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default PrioritySection;
