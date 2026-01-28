"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  useGetAvialableSlotsForRescheduleQuery,
  useRescheduleSessionMutation,
} from "@/redux/Apis/bha/sessionmanagementApi/sessionmanagementApi";

function RescheduleModal({
  isOpen,
  onClose,
  initialDate,
  onSlotSelect,
  bookingId,
  title = "Reschedule Session",
}) {
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const scheduledDate = useMemo(() => {
    if (!initialDate) return null;
    const d = new Date(initialDate);
    if (isNaN(d)) return null;
    d.setHours(0, 0, 0, 0);
    return d;
  }, [initialDate]);

  const [selectedDate, setSelectedDate] = useState(() => {
    const init = initialDate ? new Date(initialDate) : new Date();
    if (isNaN(init)) return today;
    init.setHours(0, 0, 0, 0);
    return init < today ? today : init;
  });
  const [selectedSlotId, setSelectedSlotId] = useState(null);

  // Keep selected date in sync with parent-provided initialDate
  useEffect(() => {
    if (initialDate) {
      const parsed = new Date(initialDate);
      if (!isNaN(parsed)) {
        parsed.setHours(0, 0, 0, 0);
        setSelectedDate(parsed < today ? today : parsed);
      }
    }
  }, [initialDate, today]);

  // Format date as UTC midnight to match the API requirement
  const apiDate = useMemo(() => {
    if (!selectedDate || isNaN(selectedDate)) return "";
    const utcDate = new Date(
      Date.UTC(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate()
      )
    );
    return utcDate.toISOString();
  }, [selectedDate]);

  const {
    data,
    isFetching,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetAvialableSlotsForRescheduleQuery(
    { date: apiDate },
    { skip: !apiDate }
  );

  const slots = useMemo(() => (data?.data && Array.isArray(data.data) ? data.data : []), [data]);
  const showNoSlots =
    !isLoading &&
    !isFetching &&
    (!apiDate || isError || slots.length === 0);

  const [rescheduleSession, { isLoading: isSaving }] =
    useRescheduleSessionMutation();

  const handleSlotClick = (slot) => {
    setSelectedSlotId(slot._id);
    onSlotSelect?.({ date: apiDate, slot });
  };

  const handleConfirm = async () => {
    const slot = slots.find((s) => s._id === selectedSlotId);
    if (!slot || !bookingId || !apiDate) return;
    try {
      await rescheduleSession({
        bookingId,
        data: {
          bookingDate: apiDate,
          startTime: slot.startTime,
          endTime: slot.endTime,
        },
      }).unwrap();
      onSlotSelect?.({ date: apiDate, slot });
      handleClose();
    } catch (err) {
      console.error("Failed to reschedule", err);
    }
  };

  const handleClose = () => {
    onClose?.();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-4xl w-full">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: Calendar */}
          <div className="p-3 border rounded-lg">
            <Calendar
              mode="single"
              selected={selectedDate}
              fromDate={today}
              disabled={(date) => date < today}
              modifiers={{
                scheduled: scheduledDate ? [scheduledDate] : [],
              }}
              modifiersClassNames={{
                scheduled:
                  "border-2 border-blue-500 bg-blue-50 text-blue-900 rounded-md",
              }}
              onSelect={(date) => {
                if (!date || isNaN(date)) return;
                const normalized = new Date(date);
                normalized.setHours(0, 0, 0, 0);
                if (normalized < today) return;
                setSelectedDate(normalized);
                setSelectedSlotId(null);
                // refetch happens automatically via hook when date changes
              }}
              className="mx-auto"
            />
            <div className="mt-3 text-sm text-gray-500 space-y-1">
              <div>Choose a date from today onward to see available slots.</div>
            </div>
          </div>

          {/* Right: Slots */}
          <div className="p-3 border rounded-lg flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <p className="font-medium text-gray-900">Available Slots</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => refetch()}
                disabled={isFetching || isLoading || !apiDate}
              >
                {isFetching ? "Refreshing..." : "Refresh"}
              </Button>
            </div>

            <ScrollArea className="h-64 pr-2">
              {isFetching || isLoading ? (
                <div className="text-sm text-gray-500">Loading slots...</div>
              ) : showNoSlots ? (
                <div className="text-sm text-gray-500">
                  No slots available for this date.
                  {isError && error?.data?.message && (
                    <span className="block text-xs text-gray-400">
                      {error.data.message}
                    </span>
                  )}
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {slots.map((slot) => {
                    const isSelected = selectedSlotId === slot._id;
                    return (
                      <button
                        key={slot._id}
                        type="button"
                        onClick={() => handleSlotClick(slot)}
                        className={`w-full text-left border rounded-lg px-3 py-2 transition-colors ${
                          isSelected
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-blue-300"
                        }`}
                      >
                        <div className="font-medium text-gray-900">
                          {slot.startTime} - {slot.endTime}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </ScrollArea>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={handleClose}>
                Close
              </Button>
              {selectedSlotId && (
                <Button onClick={handleConfirm} disabled={isSaving}>
                  {isSaving ? "Saving..." : "Use This Slot"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default RescheduleModal;
