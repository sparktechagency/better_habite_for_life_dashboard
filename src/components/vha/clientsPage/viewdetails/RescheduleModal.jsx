"use client";

import React, { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useGetTimeSlotsForRescheduleQuery } from "@/redux/Apis/bha/sessionmanagementApi/sessionmanagementApi";

const RescheduleModal = ({ open, onOpenChange, bookingId, onReschedule }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  // Format date to ISO string for API (YYYY-MM-DDT00:00:00.000Z)
  const formatDateForApi = (date) => {
    if (!date) return null;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}T00:00:00.000Z`;
  };

  const formattedDate = formatDateForApi(selectedDate);

  // Fetch available time slots for the selected date
  const {
    data: timeSlotsResponse,
    isLoading: isTimeSlotsLoading,
    isFetching: isTimeSlotsFetching,
  } = useGetTimeSlotsForRescheduleQuery(
    { date: formattedDate },
    { skip: !formattedDate }
  );

  // Get available time slots from API response
  const availableTimeSlots = useMemo(() => {
    if (!timeSlotsResponse?.data || !Array.isArray(timeSlotsResponse.data)) {
      return [];
    }
    return timeSlotsResponse.data.map(
      (slot) => `${slot.startTime} - ${slot.endTime}`
    );
  }, [timeSlotsResponse]);

  // Get day of week from selected date (e.g., "Monday", "Tuesday")
  const selectedDayOfWeek = useMemo(() => {
    if (!selectedDate) return null;
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days[selectedDate.getDay()];
  }, [selectedDate]);

  const handleDateSelect = (date) => {
    if (date) {
      setSelectedDate(date);
      setSelectedTimeSlot(null); // Reset time slot when date changes
    }
  };

  const handleTimeSlotSelect = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
  };

  const handleReschedule = () => {
    if (!selectedDate || !selectedTimeSlot) {
      return;
    }

    // Extract start and end time from selected slot (e.g., "10:00 AM - 10:45 AM")
    const [startTime, endTime] = selectedTimeSlot.split(" - ");

    // Format date for reschedule API (YYYY-MM-DD)
    const rescheduleDate = format(selectedDate, "yyyy-MM-dd");

    // Call the reschedule callback
    if (onReschedule) {
      onReschedule({
        bookingId,
        date: rescheduleDate,
        startTime,
        endTime,
      });
    }

    // Close modal
    onOpenChange(false);
    
    // Reset state
    setSelectedDate(new Date());
    setSelectedTimeSlot(null);
  };

  const handleClose = () => {
    onOpenChange(false);
    setSelectedDate(new Date());
    setSelectedTimeSlot(null);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Reschedule Session</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
          {/* Left Side - Calendar */}
          <div className="flex flex-col gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Select Date</h3>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                disabled={(date) => {
                  // Disable past dates
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  return date < today;
                }}
                className="rounded-md border"
              />
            </div>
            {selectedDate && (
              <div className="text-sm text-gray-600">
                <p>
                  Selected: <strong>{format(selectedDate, "EEEE, MMMM d, yyyy")}</strong>
                </p>
                {selectedDayOfWeek && (
                  <p className="mt-1">
                    Day: <strong>{selectedDayOfWeek}</strong>
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Right Side - Time Slots */}
          <div className="flex flex-col gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Select Time Slot</h3>
              {isTimeSlotsLoading || isTimeSlotsFetching ? (
                <div className="text-gray-500">Loading available slots...</div>
              ) : !selectedDate ? (
                <div className="text-gray-500">
                  Please select a date to view available time slots
                </div>
              ) : availableTimeSlots.length === 0 ? (
                <div className="text-gray-500">
                  No available time slots for {selectedDayOfWeek}
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <div className="flex flex-wrap gap-2">
                    {availableTimeSlots.map((timeSlot) => {
                      const isSelected = selectedTimeSlot === timeSlot;
                      return (
                        <Button
                          key={timeSlot}
                          onClick={() => handleTimeSlotSelect(timeSlot)}
                          variant="outline"
                          className={
                            isSelected
                              ? "bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
                              : "bg-white border-gray-300 hover:bg-gray-50"
                          }
                        >
                          {timeSlot}
                        </Button>
                      );
                    })}
                  </div>
                  {selectedTimeSlot && (
                    <div className="mt-2 text-sm text-gray-600">
                      Selected: <strong>{selectedTimeSlot}</strong>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={handleReschedule}
            disabled={!selectedDate || !selectedTimeSlot}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Reschedule
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RescheduleModal;
