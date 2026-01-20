"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { HiPlus } from "react-icons/hi";
import ScheduleCard from "./ScheduleCard";
import ScheduleAddEditModal from "./ScheduleAddEditModal";
import { useGetBhaScheduleSlotDataQuery } from "@/redux/Apis/bha/scheuleApi/scheduleApi";

function BhaScheduleLayout() {
  const { data: scheduleSlotData, isLoading: isScheduleSlotLoading } =
    useGetBhaScheduleSlotDataQuery();

  const availability = scheduleSlotData?.data?.availability || [];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState(null);

  const handleAddSchedule = () => {
    setEditingSchedule(null);
    setIsModalOpen(true);
  };

  const handleEdit = () => {
    setEditingSchedule({ availability });
    setIsModalOpen(true);
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

      {/* Schedule Card */}
      <div className="space-y-4">
        {isScheduleSlotLoading ? (
          <div className="text-center py-8 text-gray-500">Loading...</div>
        ) : availability.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No schedule available. Click "Add Schedule" to create one.
          </div>
        ) : (
          <ScheduleCard availability={availability} onEdit={handleEdit} />
        )}
      </div>

      {/* Add/Edit Modal */}
      <ScheduleAddEditModal
        openModal={isModalOpen}
        setOpenModal={setIsModalOpen}
        scheduleData={editingSchedule}
      />
    </div>
  );
}

export default BhaScheduleLayout;
