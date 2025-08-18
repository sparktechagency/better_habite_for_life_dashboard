import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { TbBellRinging2 } from "react-icons/tb";
import { HiOutlineBell } from "react-icons/hi";
import { Button } from "@/components/ui/button";
function AllNotifications() {
  const notifications = [
    {
      title: "You have a new notification",
      time: "12:00 PM",
      read: false,
    },
    {
      title: "You have a new notification",
      time: "12:00 PM",
      read: false,
    },

    {
      title: "You have a new notification",
      time: "12:00 PM",
      read: false,
    },
    {
      title: "You have a new notification",
      time: "12:00 PM",
      read: false,
    },
  ];
  return (
    <Card className="bg-transparent min-h-[calc(100vh-11.5rem)] ">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TbBellRinging2 size={20} />
          All Notifications
        </CardTitle>
        <CardAction>
          <Button className="">Mark all as read</Button>
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-2">
        {notifications.map((notification, index) => (
          <div
            key={index}
            className="flex items-start md:items-center justify-between gap-2 border bg-white p-2 rounded-lg"
          >
            <div className="flex items-start gap-2">
              <HiOutlineBell size={20} className="mt-1" />
              <div className="space-y-1">
                <p className="text-sm font-semibold">{notification.title}</p>
                <p className="text-xs text-gray-500">{notification.time}</p>
              </div>
            </div>

            <Button variant="outline" className="bg-white">
              Mark as read
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default AllNotifications;

// <div className="flex items-center gap-2">
//   <div className="w-3 h-3 rounded-full bg-green-500"></div>
//   <p className="bg-white p-2 rounded-lg">You have a new notification</p>
// </div>;
