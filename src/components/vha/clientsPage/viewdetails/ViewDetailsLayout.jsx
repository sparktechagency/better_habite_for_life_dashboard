"use client";
import React from "react";
import AssignedTaskList from "./AssignedTaskList";
import BackButton from "@/components/common/backButton/backButton";
import ClientDetailsLayout from "./ClientProfile";
import { useParams } from "next/navigation";
import { useGetSessionManagementDataByIdQuery } from "@/redux/Apis/bha/sessionmanagementApi/sessionmanagementApi";
import getImageUrl from "@/utils/getImageUrl";
import formatDate from "@/utils/FormatDate/formatDate";
function ViewDetailsLayout() {
  const id = useParams().id;
  const {
    data: sessionManagementDataById,
    isLoading: isSessionManagementDataByIdLoading,
  } = useGetSessionManagementDataByIdQuery({ id });
  console.log("sessionManagementDataById:", sessionManagementDataById);

  const sessionManagementInfo = {
    taskData:
      sessionManagementDataById?.data?.tasks?.map((task) => ({
        id: task._id,
        taskName: task.title,
        taskDescription: task.description,
        targetDomain: task.category,
        startDate: formatDate(task.startDate),
        endDate: formatDate(task.endDate),
        status: task.status,
      })) || [],
  };

  const clientInfo = {
    clientName: sessionManagementDataById?.data?.userId?.fullName,
    clientEmail: sessionManagementDataById?.data?.userId?.email,
    clientProfilePicture: getImageUrl(
      sessionManagementDataById?.data?.userId?.profile
    ),
    agoraId: sessionManagementDataById?.data?.channelName,
    sessionDate: formatDate(sessionManagementDataById?.data?.bookingDate),
    startTime: sessionManagementDataById?.data?.startTime,
    endTime: sessionManagementDataById?.data?.endTime,
    duration: sessionManagementDataById?.data?.scheduledDuration,
    status: sessionManagementDataById?.data?.status,
  };

  // console.log("sessionManagementInfo:", clientInfo);
  return (
    <div className="space-y-4">
      <BackButton showText={true} text="View Client Details" />
      <ClientDetailsLayout clientInfo={clientInfo} />
      <AssignedTaskList tableData={sessionManagementInfo?.taskData} />
    </div>
  );
}

export default ViewDetailsLayout;
