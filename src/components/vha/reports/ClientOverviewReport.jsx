"use client";

import React, { useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import FeedbackModal from "./FeedbackModal";

function ClientOverviewReport() {
  const router = useRouter();
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  const clients = [
    {
      id: 1,
      name: "Sarah Peterson",
      email: "sarah.johnson@email.com",
      avatar: "https://github.com/shadcn.png",
      totalTasks: 22,
      completedTasks: 12,
      remainingTasks: 8,
    },
    {
      id: 2,
      name: "Sarah Peterson",
      email: "sarah.johnson@email.com",
      avatar: "https://github.com/shadcn.png",
      totalTasks: 22,
      completedTasks: 12,
      remainingTasks: 8,
    },
    {
      id: 3,
      name: "Sarah Peterson",
      email: "sarah.johnson@email.com",
      avatar: "https://github.com/shadcn.png",
      totalTasks: 22,
      completedTasks: 12,
      remainingTasks: 8,
    },
  ];

  const handleFeedback = (clientId) => {
    const client = clients.find((c) => c.id === clientId);
    if (client) {
      setSelectedClient(client);
      setIsFeedbackModalOpen(true);
    }
  };

  const handleSaveFeedback = (feedbackData) => {
    console.log("Feedback submitted:", feedbackData);
    // Handle feedback save logic here (API call, etc.)
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold text-gray-800">
          Client Overview
        </CardTitle>
        <CardAction>
          <p
            onClick={() => router.push("/bha/reports/view-all")}
            className="font-semibold underline text-sky-500 cursor-pointer text-sm sm:text-base"
          >
            View All
          </p>
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-3">
        {clients.map((client) => (
          <div
            key={client.id}
            className="flex items-center gap-4 bg-gray-50 rounded-lg p-4 border border-gray-200"
          >
            {/* Left Section: Client Info */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <Avatar className="size-12">
                <AvatarImage src={client.avatar} alt={client.name} />
                <AvatarFallback>
                  {client.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <p className="text-base font-semibold text-gray-800">
                  {client.name}
                </p>
                <p className="text-sm text-gray-500">{client.email}</p>
              </div>
            </div>

            {/* Middle Section: Task Summary */}
            <div className="flex-1 flex items-center gap-6 border-l border-r border-gray-300 px-6">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Total Tasks</span>
                <span className="text-base font-bold text-gray-800">
                  {client.totalTasks}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Completed</span>
                <span className="text-base font-bold text-gray-800">
                  {client.completedTasks}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Remaining</span>
                <span className="text-base font-bold text-red-600">
                  {client.remainingTasks}
                </span>
              </div>
            </div>

            {/* Right Section: Feedback Button */}
            <div className="flex-shrink-0">
              <Button
                variant="outline"
                onClick={() => handleFeedback(client.id)}
              >
                Feedback
              </Button>
            </div>
          </div>
        ))}
      </CardContent>

      {/* Feedback Modal */}
      <FeedbackModal
        openModal={isFeedbackModalOpen}
        setOpenModal={setIsFeedbackModalOpen}
        clientData={selectedClient}
        onSave={handleSaveFeedback}
      />
    </Card>
  );
}

export default ClientOverviewReport;
