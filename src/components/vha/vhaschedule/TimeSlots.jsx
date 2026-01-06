"use client";

import React from "react";
import { Button } from "@/components/ui/button";

const TimeSlots = ({
  slots = [],
  selectedTimes = [],
  onTimeToggle,
  defaultSlots = [
    "09:00 AM - 09:45 AM",
    "10:00 AM - 10:45 AM",
    "11:00 AM - 11:45 AM",
    "12:00 PM - 12:45 PM",
    "01:00 PM - 01:45 PM",
  ],
}) => {
  // Use slots array if provided, otherwise use defaultSlots
  const timeSlots =
    slots.length > 0
      ? slots.map((slot) => `${slot.startTime} - ${slot.endTime}`)
      : defaultSlots;

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {timeSlots.map((timeSlot) => {
        const isSelected = selectedTimes.includes(timeSlot);
        return (
          <Button
            key={timeSlot}
            onClick={() => onTimeToggle(timeSlot)}
            variant="outline"
            className={`${
              isSelected
                ? "bg-blue-100 border-blue-300 text-blue-700 hover:bg-blue-200"
                : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
            }`}
          >
            {timeSlot}
          </Button>
        );
      })}
    </div>
  );
};

export default TimeSlots;
