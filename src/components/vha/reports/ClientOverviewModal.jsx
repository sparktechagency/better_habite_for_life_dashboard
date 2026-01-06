"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LuCalendar } from "react-icons/lu";

const ClientOverviewModal = ({ openModal, setOpenModal, reportData }) => {
  if (!reportData) return null;

  // Default client data if not provided
  const clientData = {
    name: reportData.person || "Sarah Peterson",
    email: reportData.email || "sarah.johnson@email.com",
    avatar: reportData.avatar || "https://github.com/shadcn.png",
    totalTasks: reportData.totalTasks || 22,
    completedTasks: reportData.completedTasks || 12,
    remainingTasks: reportData.remainingTasks || 8,
    noteDescription:
      reportData.description ||
      reportData.noteDescription ||
      "Week Progress, Complete Weekly Exercise Tracking. Week Progress, Complete Weekly Exercise Tracking. Week Progress, Complete Weekly Exercise Tracking. Week Progress, Complete Weekly Exercise Tracking. Week Progress, Complete Weekly Exercise Tracking. Week Progress, Complete Weekly Exercise Tracking.",
    date: reportData.date || "2024-06-01",
  };

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogContent className="sm:max-w-lg p-0">
        <DialogHeader>
          <DialogTitle className="sr-only">
            Client Overview - {clientData.name}
          </DialogTitle>
        </DialogHeader>
        {/* Close Button */}

        <div className="p-6 space-y-4">
          {/* Header Section: Avatar, Name, Email */}
          <div className="flex flex-col items-center space-y-2 pb-4 border-b border-gray-200">
            <Avatar className="size-20">
              <AvatarImage src={clientData.avatar} alt={clientData.name} />
              <AvatarFallback>
                {clientData.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <p className="text-lg font-bold text-gray-800">{clientData.name}</p>
            <p className="text-sm text-gray-500">{clientData.email}</p>
          </div>

          {/* Task Summary Section */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-200">
            <div className="flex flex-col">
              <span className="text-sm text-gray-600">Total Tasks</span>
              <span className="text-base font-bold text-gray-800">
                {clientData.totalTasks}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-600">Completed</span>
              <span className="text-base font-bold text-gray-800">
                {clientData.completedTasks}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-600">Remaining</span>
              <span className="text-base font-bold text-red-600">
                {clientData.remainingTasks}
              </span>
            </div>
          </div>

          {/* Note Description Section */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-gray-800">
              Note Description
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {clientData.noteDescription}
            </p>
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <LuCalendar size={16} />
              <span>{clientData.date}</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ClientOverviewModal;
