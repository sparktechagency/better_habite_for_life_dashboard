"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import SearchFilterButton from "@/components/common/SearchFilterButton";
import FeedbackModal from "./FeedbackModal";
import {
  useGetAllBhaReportDataQuery,
  useGiveBhaFeedbackMutation,
} from "@/redux/Apis/bha/reportApi/reportApi";
import { getImageUrl } from "@/utils/getImageUrl";
import useToast from "@/hooks/useToast";
import BackButton from "@/components/common/backButton/backButton";

function ViewAllReports() {
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [searchText, setSearchText] = useState("");

  const { data: reportData, isLoading } = useGetAllBhaReportDataQuery({
    search: searchText,
  });
  const [giveFeedback, { isLoading: isSubmitting }] =
    useGiveBhaFeedbackMutation();
  const toast = useToast();

  const clients = reportData?.data || [];

  const handleFeedback = (client) => {
    setSelectedClient(client);
    setIsFeedbackModalOpen(true);
  };

  const handleSaveFeedback = async (feedbackData) => {
    try {
      await giveFeedback({
        userId: feedbackData.userId,
        message: feedbackData.message,
      }).unwrap();
      toast.success("Feedback submitted successfully");
      setIsFeedbackModalOpen(false);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to submit feedback");
    }
  };

  return (
    <div className="space-y-4">
      <BackButton showText={true} text="All Client Reports" />
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800">
            Client Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search Bar */}
          <SearchFilterButton
            placeholder="Search by name or email"
            showFilterButton={false}
            showAddButton={false}
            searchText={searchText}
            setSearchText={setSearchText}
          />

          {/* Client List */}
          <div className="space-y-3">
            {isLoading ? (
              <div className="text-center py-8 text-gray-500">Loading...</div>
            ) : clients.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No client reports found
              </div>
            ) : (
              clients.map((client) => (
                <div
                  key={client.userId}
                  className="flex items-center gap-4 bg-gray-50 rounded-lg p-4 border border-gray-200"
                >
                  {/* Left Section: Client Info */}
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <Avatar className="size-12">
                      <AvatarImage
                        src={getImageUrl(client.profile)}
                        alt={client.fullName}
                      />
                      <AvatarFallback>
                        {client.fullName
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("") || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <p className="text-base font-semibold text-gray-800">
                        {client.fullName}
                      </p>
                      <p className="text-sm text-gray-500">{client.email}</p>
                    </div>
                  </div>

                  {/* Middle Section: Task Summary */}
                  <div className="flex-1 flex items-center gap-6 border-l border-r border-gray-300 px-6">
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500">Total Tasks</span>
                      <span className="text-base font-bold text-gray-800">
                        {client.totalTask}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500">Completed</span>
                      <span className="text-base font-bold text-gray-800">
                        {client.completedTask}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500">Pending</span>
                      <span className="text-base font-bold text-red-600">
                        {client.pendingTask}
                      </span>
                    </div>
                  </div>

                  {/* Right Section: Feedback Button */}
                  <div className="flex-shrink-0">
                    <Button
                      variant="outline"
                      onClick={() => handleFeedback(client)}
                    >
                      Feedback
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>

        {/* Feedback Modal */}
        <FeedbackModal
          openModal={isFeedbackModalOpen}
          setOpenModal={setIsFeedbackModalOpen}
          clientData={selectedClient}
          onSave={handleSaveFeedback}
          isLoading={isSubmitting}
        />
      </Card>
    </div>
  );
}

export default ViewAllReports;
