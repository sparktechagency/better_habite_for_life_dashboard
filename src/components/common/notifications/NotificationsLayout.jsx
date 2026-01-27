"use client";
import React, { useState } from "react";
import SmallPageInfo from "../SmallPageInfo";
import AllNotifications from "./AllNotifications";
import { useGetNotificationsQuery } from "@/redux/Apis/noticationApi/notificationApi";

function NotificationsLayout() {
  const [page, setPage] = useState(1);
  const limit = 10;
  const userRole = localStorage.getItem("userRole");
  const roleWiseEndpoint = userRole === "admin" || userRole === "super_admin" ? "/admin-all" :  "";
  const { data: notificationsData, isLoading: isNotificationsLoading } = useGetNotificationsQuery({
    page,
    limit,
    roleWiseEndpoint,
  });

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
