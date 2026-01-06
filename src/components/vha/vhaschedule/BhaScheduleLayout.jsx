"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { HiPlus } from "react-icons/hi";
import ScheduleCard from "./ScheduleCard";
import ScheduleAddEditModal from "./ScheduleAddEditModal";

function BhaScheduleLayout() {
  const [schedules, setSchedules] = useState([
    {
      id: 1,
      availableDays: ["Monday", "Tuesday", "Friday"],
      selectedDay: "Monday",
      selectedTimes: [
        "09:00 AM - 09:45 AM",
        "10:00 AM - 10:45 AM",
        "11:00 AM - 11:45 AM",
      ],
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState(null);

  const handleAddSchedule = () => {
    setEditingSchedule(null);
    setIsModalOpen(true);
  };

  const handleEdit = (schedule) => {
    setEditingSchedule(schedule);
    setIsModalOpen(true);
  };

  const handleSave = (scheduleData) => {
    if (scheduleData.id) {
      // Update existing schedule
      setSchedules(
        schedules.map((s) => (s.id === scheduleData.id ? scheduleData : s))
      );
    } else {
      // Add new schedule
      const newSchedule = {
        ...scheduleData,
        id: schedules.length + 1,
      };
      setSchedules([...schedules, newSchedule]);
    }
    setIsModalOpen(false);
    setEditingSchedule(null);
  };

  const handleDelete = (scheduleId) => {
    setSchedules(schedules.filter((s) => s.id !== scheduleId));
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Available Schedule
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Create New Available Schedule here.
          </p>
        </div>
        <Button
          onClick={handleAddSchedule}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <HiPlus size={18} className="mr-2" />
          Add Schedule
        </Button>
      </div>

      {/* Schedule Cards */}
      <div className="space-y-4">
        {schedules.map((schedule) => (
          <ScheduleCard
            key={schedule.id}
            schedule={schedule}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {/* Add/Edit Modal */}
      <ScheduleAddEditModal
        openModal={isModalOpen}
        setOpenModal={setIsModalOpen}
        scheduleData={editingSchedule}
        onSave={handleSave}
      />
    </div>
  );
}

export default BhaScheduleLayout;
