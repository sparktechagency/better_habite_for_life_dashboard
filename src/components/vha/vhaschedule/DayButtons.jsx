"use client";

import React from "react";
import { Button } from "@/components/ui/button";

const DayButtons = ({ activeDays = [], selectedDay = "", onDayToggle }) => {
  const days = [
    { label: "Mon", value: "Monday" },
    { label: "Tue", value: "Tuesday" },
    { label: "Wed", value: "Wednesday" },
    { label: "Thu", value: "Thursday" },
    { label: "Fri", value: "Friday" },
    { label: "Sat", value: "Saturday" },
    { label: "Sun", value: "Sunday" },
  ];

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {days.map((day) => {
        const isActive = activeDays.includes(day.value);
        const isSelected = selectedDay === day.value;
        return (
          <Button
            key={day.value}
            onClick={() => isActive && onDayToggle(day.value)}
            disabled={!isActive}
            className={`min-w-[60px] ${
              isSelected
                ? "bg-blue-600 hover:bg-blue-700 text-white ring-2 ring-blue-400 ring-offset-1"
                : isActive
                ? "bg-blue-100 hover:bg-blue-200 text-blue-700 border border-blue-300"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            {day.label}
          </Button>
        );
      })}
    </div>
  );
};

export default DayButtons;
