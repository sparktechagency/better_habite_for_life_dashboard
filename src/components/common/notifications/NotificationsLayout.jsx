import React from "react";
import SmallPageInfo from "../SmallPageInfo";
import AllNotifications from "./AllNotifications";

function NotificationsLayout() {
  return (
    <div className="space-y-4">
      <SmallPageInfo
        title="Notifications"
        description="Here is an overview of your notifications"
      />
      <AllNotifications />
    </div>
  );
}

export default NotificationsLayout;
