"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FiEdit3 } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import DayButtons from "./DayButtons";
import TimeSlots from "./TimeSlots";

const ScheduleCard = ({ schedule, onEdit, onDelete }) => {
  const [selectedDay, setSelectedDay] = useState(
    schedule.selectedDay || "Monday"
  );
  const [selectedTimes, setSelectedTimes] = useState(
    schedule.selectedTimes || []
  );

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const handleTimeToggle = (timeSlot) => {
    setSelectedTimes((prev) =>
      prev.includes(timeSlot)
        ? prev.filter((t) => t !== timeSlot)
        : [...prev, timeSlot]
    );
  };

  return (
    <Card className="bg-white">
      <CardContent className="p-6 space-y-6">
        {/* Available Service Days Section */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-base font-semibold text-gray-800 mb-3">
              Available Service Days
            </h3>
            <DayButtons
              activeDays={schedule.availableDays}
              onDayToggle={() => {}}
            />
          </div>
          <div className="flex items-center gap-2 ml-4">
            <Button
              variant="outline"
              onClick={() => onEdit(schedule)}
              className="bg-yellow-50 border-yellow-300 text-yellow-700 hover:bg-yellow-100"
            >
              <FiEdit3 size={16} className="mr-1" />
              Edit
            </Button>
            <Button
              variant="outline"
              onClick={() => onDelete(schedule.id)}
              className="bg-red-50 border-red-300 text-red-700 hover:bg-red-100"
            >
              <FiTrash2 size={16} className="mr-1" />
              Delete
            </Button>
          </div>
        </div>

        {/* Select Day Section */}
        <div className="space-y-2">
          <h3 className="text-base font-semibold text-gray-800">Select Day</h3>
          <Select value={selectedDay} onValueChange={setSelectedDay}>
            <SelectTrigger className="w-full bg-gray-50">
              <SelectValue placeholder="Select a day" />
            </SelectTrigger>
            <SelectContent>
              {days.map((day) => (
                <SelectItem key={day} value={day}>
                  {day}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Selected Time Section */}
        <div className="space-y-2">
          <h3 className="text-base font-semibold text-gray-800">
            Selected Time
          </h3>
          <TimeSlots
            slots={[
              { startTime: "09:00 AM", endTime: "09:45 AM" },
              { startTime: "10:00 AM", endTime: "10:45 AM" },
              { startTime: "11:00 AM", endTime: "11:45 AM" },
              { startTime: "12:00 PM", endTime: "12:45 PM" },
              { startTime: "01:00 PM", endTime: "01:45 PM" },
              { startTime: "02:00 PM", endTime: "02:45 PM" },
              { startTime: "03:00 PM", endTime: "03:45 PM" },
              { startTime: "04:00 PM", endTime: "04:45 PM" },
              { startTime: "05:00 PM", endTime: "05:45 PM" },
              { startTime: "06:00 PM", endTime: "06:45 PM" },
              { startTime: "07:00 PM", endTime: "07:45 PM" },
              { startTime: "08:00 PM", endTime: "08:45 PM" },
              { startTime: "09:00 PM", endTime: "09:45 PM" },
            ]}
            selectedTimes={selectedTimes}
            onTimeToggle={handleTimeToggle}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ScheduleCard;
