"use client";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import getImageUrl from "@/utils/getImageUrl";
import { Badge } from "@/components/ui/badge";
import RescheduleModal from "./Reschedule/RescheduleModal";

const ClientDetailsLayout = ({ clientInfo }) => {
  const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);
  const initialSessionDate = clientInfo?.sessionDateRaw
    ? new Date(clientInfo.sessionDateRaw)
    : new Date();

  return (
    <>
      <div className="flex flex-col md:flex-row items-center  md:items-start lg:justify-between gap-4 md:gap-6 bg-white border border-gray-300 rounded-lg p-4 md:p-6">
        <ClientProfile clientInfo={clientInfo} />
        <div className="w-full lg:w-1/2">
          <Session
            clientInfo={clientInfo}
            onOpenReschedule={() => setIsRescheduleOpen(true)}
          />
        </div>
      </div>

      <RescheduleModal
        isOpen={isRescheduleOpen}
        onClose={() => setIsRescheduleOpen(false)}
        initialDate={initialSessionDate}
        bookingId={clientInfo?.bookingId}
      />
    </>
  );
};

export default ClientDetailsLayout;

const ClientProfile = ({ clientInfo }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto md:min-w-[280px]">
      <Avatar className="size-16 sm:size-20 flex-shrink-0">
        <AvatarImage src={getImageUrl(clientInfo.clientProfilePicture)} />
        <AvatarFallback>{clientInfo.clientName?.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-2 text-center sm:text-left">
        <p className="text-xl sm:text-2xl font-bold">{clientInfo.clientName}</p>
        <p className="text-sm text-gray-500">{clientInfo.clientEmail}</p>
      </div>
    </div>
  );
};
const Session = ({ clientInfo, onOpenReschedule }) => {
  const sessionData = {
    startTime: clientInfo.startTime,
    endTime: clientInfo.endTime,
    date: clientInfo.sessionDate,
  };

  const handleJoinNow = () => {
    console.log("Join session");
    // Handle join logic
  };

  return (
    <div className="bg-gray-200 rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex flex-col gap-2 flex-1">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 flex items-center gap-2">
          Coaching Session{" "}
          <Badge
            variant="outline"
            className="text-xs bg-blue-500/50 text-white"
          >
            {clientInfo.status}
          </Badge>
        </h3>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-1.5">
            <Clock size={16} className="text-gray-700 flex-shrink-0" />
            <p className="text-sm text-gray-700">{sessionData.startTime}</p>
          </div>
          -
          <div className="flex items-center gap-1.5">
            <Clock size={16} className="text-gray-700 flex-shrink-0" />
            <p className="text-sm text-gray-700">{sessionData.endTime}</p>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar size={16} className="text-gray-700 flex-shrink-0" />
            <p className="text-sm text-gray-700">{sessionData.date}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
        <Button
          variant="outline"
          onClick={onOpenReschedule}
          className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50 w-full sm:w-auto"
        >
          Reschedule
        </Button>
        <Button
          onClick={handleJoinNow}
          className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto"
        >
          Join Now
        </Button>
      </div>
    </div>
  );
};
