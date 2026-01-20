"use client";

import React, { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FiEdit3, FiTrash2 } from "react-icons/fi";
import DayButtons from "./DayButtons";
import TimeSlots from "./TimeSlots";

const ScheduleCard = ({ availability = [], onEdit, onDelete }) => {
  // Get available days from the API response
  const availableDays = useMemo(
    () => availability.map((item) => item.day),
    [availability]
  );

  // Set default selected day to first available day
  const [selectedDay, setSelectedDay] = useState(availableDays[0] || "Monday");

  // Get slots for the selected day
  const currentDaySlots = useMemo(() => {
    const dayData = availability.find((item) => item.day === selectedDay);
    return dayData?.availableSlots || [];
  }, [availability, selectedDay]);

  // Format slots as "startTime - endTime" strings
  const formattedSlots = useMemo(
    () => currentDaySlots.map((slot) => `${slot.startTime} - ${slot.endTime}`),
    [currentDaySlots]
  );

  const handleDayClick = (day) => {
    // Only allow selecting days that have availability
    if (availableDays.includes(day)) {
      setSelectedDay(day);
    }
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
              activeDays={availableDays}
              selectedDay={selectedDay}
              onDayToggle={handleDayClick}
            />
          </div>
          <div className="flex items-center gap-2 ml-4">
            <Button
              variant="outline"
              onClick={onEdit}
              className="bg-yellow-50 border-yellow-300 text-yellow-700 hover:bg-yellow-100"
            >
              <FiEdit3 size={16} className="mr-1" />
              Edit
            </Button>
          </div>
        </div>

        {/* Selected Day Info */}
        <div className="space-y-2">
          <h3 className="text-base font-semibold text-gray-800">
            Available Time Slots for {selectedDay}
          </h3>
          {formattedSlots.length > 0 ? (
            <TimeSlots slots={formattedSlots} readOnly />
          ) : (
            <p className="text-gray-500 text-sm">
              No time slots available for this day.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ScheduleCard;
