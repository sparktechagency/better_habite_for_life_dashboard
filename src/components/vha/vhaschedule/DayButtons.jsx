"use client";

import React from "react";
import { Button } from "@/components/ui/button";

const DayButtons = ({ activeDays = [], onDayToggle }) => {
  const days = [
    { label: "Mon", value: "Monday" },
    { label: "Tue", value: "Tuesday" },
    { label: "Web", value: "Wednesday" },
    { label: "Thu", value: "Thursday" },
    { label: "Fri", value: "Friday" },
    { label: "Sat", value: "Saturday" },
    { label: "Sun", value: "Sunday" },
  ];

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {days.map((day) => {
        const isActive = activeDays.includes(day.value);
        return (
          <Button
            key={day.value}
            onClick={() => onDayToggle(day.value)}
            className={`${
              isActive
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-100 hover:bg-gray-200 text-gray-600"
            } min-w-[60px]`}
          >
            {day.label}
          </Button>
        );
      })}
    </div>
  );
};

export default DayButtons;
