"use client";
import React, { useState, useEffect } from "react";
import SmallPageInfo from "../SmallPageInfo";
import AllNotifications from "./AllNotifications";
import { useGetNotificationsQuery } from "@/redux/Apis/noticationApi/notificationApi";
import { socket } from "@/socket/socket";

function NotificationsLayout() {
  const [page, setPage] = useState(1);
  const limit = 10;
  const userRole = typeof window !== "undefined" ? localStorage.getItem("userRole") : "";
  const roleWiseEndpoint = userRole === "admin" || userRole === "super_admin" ? "/admin-all" : "";
  
  const { data: notificationsData, isLoading: isNotificationsLoading, refetch } = useGetNotificationsQuery({
    page,
    limit,
    roleWiseEndpoint,
  });

  useEffect(() => {
    // Guard against SSR
    if (typeof window === "undefined") return;

    socket.connect();
    
    const handleNotification = () => {
      // Refetch notifications immediately when a new one arrives
      refetch();
    };

    socket.on("notification", handleNotification);

    return () => {
      socket.off("notification", handleNotification);
      socket.disconnect();
    };
  }, [refetch]);

  const notifications = notificationsData?.data || [];
  const meta = notificationsData?.meta || { page: 1, limit: 10, total: 0, totalPage: 1 };
  return (
    <div className="space-y-4">
      <SmallPageInfo
        title="Notifications"
        description="Here is an overview of your notifications"
      />
      <AllNotifications
        notifications={notifications}
        userRole={userRole}
        isLoading={isNotificationsLoading}
        meta={meta}
        page={page}
        setPage={setPage}
      />
    </div>
  );
}

export default NotificationsLayout;
