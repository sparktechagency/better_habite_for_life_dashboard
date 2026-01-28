"use client";

import React, { useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TbFileSearch } from "react-icons/tb";
import { LuCalendar } from "react-icons/lu";
import { CgLoadbarDoc } from "react-icons/cg";
import { Button } from "@/components/ui/button";
import ClientOverviewModal from "./ClientOverviewModal";
import { useRouter } from "next/navigation";
import { useGetBhaFeedbackQuery } from "@/redux/Apis/bha/reportApi/reportApi";
import formatDate from "@/utils/FormatDate/formatDate";
import { Badge } from "@/components/ui/badge";

function RecentReports() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  const { data: bhaFeedbackData, isLoading } = useGetBhaFeedbackQuery();
  const feedbacks = bhaFeedbackData?.data || [];

  // Show only 5 feedbacks
  const displayedFeedbacks = feedbacks.slice(0, 5);

  const handleView = (feedback) => {
    setSelectedReport(feedback);
    setIsModalOpen(true);
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TbFileSearch size={20} />
            Recent User Feedback
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">Loading...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <CardTitle className="flex items-center gap-2">
          <TbFileSearch size={20} />
          Recent User Feedback
        </CardTitle>
        <CardAction>
          <p
            className="font-semibold underline text-sky-500 cursor-pointer text-sm sm:text-base"
            onClick={() => router.push("/bha/reports/view-all-feedback")}
          >
            View All
          </p>
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-3">
        {displayedFeedbacks.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No feedback found
          </div>
        ) : (
          displayedFeedbacks.map((feedback) => (
            <div
              key={feedback._id}
              className="flex items-center gap-4 bg-white border border-gray-200 rounded-lg p-4"
            >
              {/* Purple Icon */}
              <div className="bg-violet-100 text-violet-600 rounded-lg p-3 flex-shrink-0">
                <CgLoadbarDoc size={24} />
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col gap-2">
                {/* First line: Type and Date */}
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <Badge
                    variant="outline"
                    className="bg-violet-100 text-violet-600 border-violet-200 capitalize"
                  >
                    {feedback.type?.replace("_", " ") || "Feedback"}
                  </Badge>
                  <div className="flex items-center gap-1.5">
                    <LuCalendar size={16} />
                    <span>{formatDate(feedback.createdAt)}</span>
                  </div>
                  <Badge
                    variant="outline"
                    className={`capitalize ${
                      feedback.status === "pending"
                        ? "bg-yellow-100 text-yellow-600 border-yellow-200"
                        : feedback.status === "completed"
                        ? "bg-green-100 text-green-600 border-green-200"
                        : "bg-gray-100 text-gray-600 border-gray-200"
                    }`}
                  >
                    {feedback.status}
                  </Badge>
                </div>
                {/* Second line: Message */}
                <p className="text-sm text-gray-900 line-clamp-2">
                  {feedback.message}
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
          ))
        )}
      </CardContent>

      {/* Client Overview Modal */}
      <ClientOverviewModal
        openModal={isModalOpen}
        setOpenModal={setIsModalOpen}
        reportData={selectedReport}
      />
    </Card>
  );
}

export default RecentReports;
