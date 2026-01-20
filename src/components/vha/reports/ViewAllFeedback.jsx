"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LuCalendar } from "react-icons/lu";
import { CgLoadbarDoc } from "react-icons/cg";
import { ScrollArea } from "@/components/ui/scroll-area";
import ClientOverviewModal from "./ClientOverviewModal";
import SearchFilterButton from "@/components/common/SearchFilterButton";
import { TbFileSearch } from "react-icons/tb";
import { useGetAllBhaFeedbackQuery } from "@/redux/Apis/bha/reportApi/reportApi";
import formatDate from "@/utils/FormatDate/formatDate";
import { Badge } from "@/components/ui/badge";
import BackButton from "@/components/common/backButton/backButton";

function ViewAllFeedback() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [searchText, setSearchText] = useState("");

  const { data: feedbackData, isLoading } = useGetAllBhaFeedbackQuery({
    search: searchText,
  });

  const feedbacks = feedbackData?.data || [];

  const handleView = (feedback) => {
    setSelectedFeedback(feedback);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-4">
      <BackButton showText={true} text="All User Feedback" />
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
            searchText={searchText}
            setSearchText={setSearchText}
          />
          {/* Feedback List */}
          <ScrollArea className="h-[calc(100vh-300px)]">
            <div className="space-y-3 pr-4">
              {isLoading ? (
                <div className="text-center py-8 text-gray-500">Loading...</div>
              ) : feedbacks.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No feedback found
                </div>
              ) : (
                feedbacks.map((feedback) => (
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
                      {/* First line: Type, Date, Status */}
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
    </div>
  );
}

export default ViewAllFeedback;
