"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TimeSlots from "./TimeSlots";

const slots = [
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
];

const ScheduleAddEditModal = ({
  openModal,
  setOpenModal,
  scheduleData = null,
  onSave,
}) => {
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // Load data when editing
  useEffect(() => {
    if (openModal) {
      if (scheduleData) {
        setSelectedDay(scheduleData.selectedDay || "Monday");
        // Convert selectedTimes array to slot format if needed
        const times = scheduleData.selectedTimes || [];
        setSelectedTimeSlots(times);
      } else {
        // Reset for new schedule
        setSelectedDay("Monday");
        setSelectedTimeSlots([]);
      }
    }
  }, [openModal, scheduleData]);

  const handleTimeToggle = (timeSlot) => {
    setSelectedTimeSlots((prev) =>
      prev.includes(timeSlot)
        ? prev.filter((t) => t !== timeSlot)
        : [...prev, timeSlot]
    );
  };

  const handleSave = () => {
    const schedule = {
      id: scheduleData?.id,
      selectedDay,
      selectedTimes: selectedTimeSlots,
    };

    if (onSave) {
      onSave(schedule);
    }

    setOpenModal(false);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {scheduleData ? "Edit Schedule" : "Add New Schedule"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Select Day Section */}
          <div className="space-y-2">
            <h3 className="text-base font-semibold text-gray-800">
              Select Day
            </h3>
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
              slots={slots}
              selectedTimes={selectedTimeSlots}
              onTimeToggle={handleTimeToggle}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {scheduleData ? "Update" : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleAddEditModal;
