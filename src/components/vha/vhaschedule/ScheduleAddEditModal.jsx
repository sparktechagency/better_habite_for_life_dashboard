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
import { useUpdateBhaAvailabilityMutation } from "@/redux/Apis/bha/scheuleApi/scheduleApi";
import useToast from "@/hooks/useToast";

// All available time slots
const allSlots = [
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

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const ScheduleAddEditModal = ({
  openModal,
  setOpenModal,
  scheduleData = null,
}) => {
  const toast = useToast();
  const [updateAvailability, { isLoading }] =
    useUpdateBhaAvailabilityMutation();

  const [selectedDay, setSelectedDay] = useState("Monday");
  // Store availability for all days: { Monday: ["09:00 AM - 09:45 AM", ...], ... }
  const [availabilityByDay, setAvailabilityByDay] = useState({});
  // Track days that originally had availability (for editing - to send empty array if cleared)
  const [originalDays, setOriginalDays] = useState([]);

  // Load existing availability when editing
  useEffect(() => {
    if (openModal) {
      if (scheduleData?.availability) {
        // Convert API format to local format
        const daySlots = {};
        const existingDays = [];
        scheduleData.availability.forEach((item) => {
          existingDays.push(item.day);
          daySlots[item.day] = item.availableSlots.map(
            (slot) => `${slot.startTime} - ${slot.endTime}`
          );
        });
        setAvailabilityByDay(daySlots);
        setOriginalDays(existingDays);
        // Set selected day to first available day or Monday
        const firstDay = scheduleData.availability[0]?.day || "Monday";
        setSelectedDay(firstDay);
      } else {
        // Reset for new schedule
        setSelectedDay("Monday");
        setAvailabilityByDay({});
        setOriginalDays([]);
      }
    }
  }, [openModal, scheduleData]);

  // Get selected slots for current day
  const selectedTimeSlots = availabilityByDay[selectedDay] || [];

  const handleTimeToggle = (timeSlot) => {
    setAvailabilityByDay((prev) => {
      const currentDaySlots = prev[selectedDay] || [];
      const isSelected = currentDaySlots.includes(timeSlot);

      if (isSelected) {
        // Remove the slot - keep the day with empty array (don't remove the key)
        const updatedSlots = currentDaySlots.filter((t) => t !== timeSlot);
        return { ...prev, [selectedDay]: updatedSlots };
      } else {
        // Add the slot
        return { ...prev, [selectedDay]: [...currentDaySlots, timeSlot] };
      }
    });
  };

  const handleSave = async () => {
    // Convert local format to API format
    // Include all days that have slots OR were originally in the schedule (to clear them)
    const allDaysToSend = new Set([
      ...Object.keys(availabilityByDay),
      ...originalDays,
    ]);

    const availability = Array.from(allDaysToSend).map((day) => {
      const slots = availabilityByDay[day] || [];
      return {
        day,
        availableSlots: slots.map((slotStr) => {
          const [startTime, endTime] = slotStr.split(" - ");
          return { startTime, endTime };
        }),
      };
    });

    // For new schedules, require at least one slot
    if (
      !scheduleData &&
      availability.every((a) => a.availableSlots.length === 0)
    ) {
      toast.error("Please select at least one time slot");
      return;
    }

    try {
      await updateAvailability(availability).unwrap();
      toast.success("Availability updated successfully");
      setOpenModal(false);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update availability");
    }
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  // Format slots for TimeSlots component
  const formattedSlots = allSlots.map(
    (slot) => `${slot.startTime} - ${slot.endTime}`
  );

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
                    {availabilityByDay[day]?.length > 0 && (
                      <span className="ml-2 text-blue-600">
                        ({availabilityByDay[day].length} slots)
                      </span>
                    )}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Selected Time Section */}
          <div className="space-y-2">
            <h3 className="text-base font-semibold text-gray-800">
              Select Time Slots for {selectedDay}
            </h3>
            <p className="text-sm text-gray-500">
              Click on time slots to select/deselect
            </p>
            <TimeSlots
              slots={formattedSlots}
              selectedTimes={selectedTimeSlots}
              onTimeToggle={handleTimeToggle}
            />
          </div>

          {/* Summary */}
          {(Object.keys(availabilityByDay).length > 0 ||
            originalDays.length > 0) && (
            <div className="space-y-2 p-3 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-semibold text-gray-700">
                Selected Availability:
              </h4>
              <div className="space-y-1">
                {Array.from(
                  new Set([...Object.keys(availabilityByDay), ...originalDays])
                ).map((day) => {
                  const slots = availabilityByDay[day] || [];
                  const wasOriginal = originalDays.includes(day);
                  const isCleared = wasOriginal && slots.length === 0;

                  return (
                    <p
                      key={day}
                      className={`text-sm ${
                        isCleared ? "text-red-500" : "text-gray-600"
                      }`}
                    >
                      <span className="font-medium">{day}:</span>{" "}
                      {isCleared ? (
                        <span>Will be removed</span>
                      ) : (
                        <span>{slots.length} slot(s)</span>
                      )}
                    </p>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isLoading ? "Saving..." : scheduleData ? "Update" : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleAddEditModal;
