"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LuCalendar, LuUserRound } from "react-icons/lu";
import { CgLoadbarDoc } from "react-icons/cg";
import { ScrollArea } from "@/components/ui/scroll-area";
import ClientOverviewModal from "./ClientOverviewModal";
import SearchFilterButton from "@/components/common/SearchFilterButton";
import { TbFileSearch } from "react-icons/tb";

function ViewAllFeedback() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  const feedbacks = [
    {
      id: 1,
      person: "Michael Chen",
      date: "2024-06-01",
      description: "Week Progress, Complete Weekly Exercise Tracking....",
      feedback: "Great progress this week! Keep up the excellent work.",
      email: "michael.chen@email.com",
      avatar: "https://github.com/shadcn.png",
      totalTasks: 22,
      completedTasks: 12,
      remainingTasks: 8,
    },
    {
      id: 2,
      person: "Michael Chen",
      date: "2024-06-01",
      description: "Week Progress, Complete Weekly Exercise Tracking....",
      feedback: "Great progress this week! Keep up the excellent work.",
      email: "michael.chen@email.com",
      avatar: "https://github.com/shadcn.png",
      totalTasks: 22,
      completedTasks: 12,
      remainingTasks: 8,
    },
    {
      id: 3,
      person: "Michael Chen",
      date: "2024-06-01",
      description: "Week Progress, Complete Weekly Exercise Tracking....",
      feedback: "Great progress this week! Keep up the excellent work.",
      email: "michael.chen@email.com",
      avatar: "https://github.com/shadcn.png",
      totalTasks: 22,
      completedTasks: 12,
      remainingTasks: 8,
    },
    {
      id: 4,
      person: "Michael Chen",
      date: "2024-06-01",
      description: "Week Progress, Complete Weekly Exercise Tracking....",
      feedback: "Great progress this week! Keep up the excellent work.",
      email: "michael.chen@email.com",
      avatar: "https://github.com/shadcn.png",
      totalTasks: 22,
      completedTasks: 12,
      remainingTasks: 8,
    },
    {
      id: 5,
      person: "Michael Chen",
      date: "2024-06-01",
      description: "Week Progress, Complete Weekly Exercise Tracking....",
      feedback: "Great progress this week! Keep up the excellent work.",
      email: "michael.chen@email.com",
      avatar: "https://github.com/shadcn.png",
      totalTasks: 22,
      completedTasks: 12,
      remainingTasks: 8,
    },
    {
      id: 6,
      person: "Michael Chen",
      date: "2024-06-01",
      description: "Week Progress, Complete Weekly Exercise Tracking....",
      feedback: "Great progress this week! Keep up the excellent work.",
      email: "michael.chen@email.com",
      avatar: "https://github.com/shadcn.png",
      totalTasks: 22,
      completedTasks: 12,
      remainingTasks: 8,
    },
    {
      id: 7,
      person: "Michael Chen",
      date: "2024-06-01",
      description: "Week Progress, Complete Weekly Exercise Tracking....",
      feedback: "Great progress this week! Keep up the excellent work.",
      email: "michael.chen@email.com",
      avatar: "https://github.com/shadcn.png",
      totalTasks: 22,
      completedTasks: 12,
      remainingTasks: 8,
    },
  ];

  const handleView = (feedback) => {
    setSelectedFeedback({
      person: feedback.person,
      email: feedback.email,
      avatar: feedback.avatar,
      date: feedback.date,
      description: feedback.description,
      totalTasks: feedback.totalTasks,
      completedTasks: feedback.completedTasks,
      remainingTasks: feedback.remainingTasks,
    });
    setIsModalOpen(true);
  };

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <CardTitle className="flex items-center gap-2">
          <TbFileSearch size={20} />
          User's Feedback Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <SearchFilterButton
          placeholder="Search feedback"
          showFilterButton={false}
          showAddButton={false}
        />
        {/* Feedback List */}
        <ScrollArea className="h-[calc(100vh-300px)]">
          <div className="space-y-3 pr-4">
            {feedbacks.map((feedback) => (
              <div
                key={feedback.id}
                className="flex items-center gap-4 bg-white border border-gray-200 rounded-lg p-4"
              >
                {/* Purple Icon */}
                <div className="bg-violet-100 text-violet-600 rounded-lg p-3 flex-shrink-0">
                  <CgLoadbarDoc size={24} />
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col gap-2">
                  {/* First line: Person and Date */}
                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <div className="flex items-center gap-1.5">
                      <LuUserRound size={16} />
                      <span>{feedback.person}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <LuCalendar size={16} />
                      <span>{feedback.date}</span>
                    </div>
                  </div>
                  {/* Second line: Description */}
                  <p className="text-sm text-gray-900">
                    {feedback.description}
                  </p>
                </div>

                {/* View Button */}
                <Button
                  variant="outline"
                  onClick={() => handleView(feedback)}
                  className="bg-white border-gray-300 hover:bg-gray-50 flex-shrink-0"
                >
                  View
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>

      {/* Client Overview Modal */}
      <ClientOverviewModal
        openModal={isModalOpen}
        setOpenModal={setIsModalOpen}
        reportData={selectedFeedback}
      />
    </Card>
  );
}

export default ViewAllFeedback;
