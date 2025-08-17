import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TbWallpaper } from "react-icons/tb";
import { LiaStopwatchSolid } from "react-icons/lia";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
function TodaySession() {
  const todaySession = [
    {
      name: "Session completed with Sarah Johnson",
      reason: "Maintainace Support",
      time: "10:00 AM",
      isScheduled: true,
      isCompleted: false,
      isCancelled: false,
      isRescheduled: false,
    },
    {
      name: "Session completed with Sarah Johnson",
      reason: "Maintainace Support",
      time: "10:00 AM",
      isScheduled: false,
      isCompleted: true,
      isCancelled: false,
      isRescheduled: false,
    },
    {
      name: "Session completed with Sarah Johnson",
      reason: "Maintainace Support",
      time: "10:00 AM",
      isScheduled: false,
      isCompleted: false,
      isCancelled: false,
      isRescheduled: true,
    },
    {
      name: "Session completed with Sarah Johnson",
      reason: "Maintainace Support",
      time: "10:00 AM",
      isScheduled: false,
      isCompleted: false,
      isCancelled: true,
      isRescheduled: false,
    },
    {
      name: "Session completed with Sarah Johnson",
      reason: "Maintainace Support",
      time: "10:00 AM",
      isScheduled: false,
      isCompleted: false,
      isCancelled: true,
      isRescheduled: false,
    },
    {
      name: "Session completed with Sarah Johnson",
      reason: "Maintainace Support",
      time: "10:00 AM",
      isScheduled: false,
      isCompleted: false,
      isCancelled: true,
      isRescheduled: false,
    },
    {
      name: "Session completed with Sarah Johnson",
      reason: "Maintainace Support",
      time: "10:00 AM",
      isScheduled: false,
      isCompleted: false,
      isCancelled: true,
      isRescheduled: false,
    },
    {
      name: "Session completed with Sarah Johnson",
      reason: "Maintainace Support",
      time: "10:00 AM",
      isScheduled: false,
      isCompleted: false,
      isCancelled: true,
      isRescheduled: false,
    },
  ];
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TbWallpaper size={20} />
          <span>Today's Session</span>
        </CardTitle>
        <CardAction>
          <p className="font-semibold text-sky-500 underline cursor-pointer">
            View All
          </p>
        </CardAction>
      </CardHeader>
      <ScrollArea className="h-[calc(90vh-200px)]">
        <CardContent className="space-y-2">
          {todaySession.map((item, index) => {
            return (
              <Card key={index} className="">
                <CardHeader>
                  <CardTitle>{item.name}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    {item.reason}{" "}
                    <span className="flex items-center gap-1">
                      <LiaStopwatchSolid size={16} /> {item.time}
                    </span>
                  </CardDescription>
                  <CardAction>
                    <span
                      className={`text-sm text-white px-2 py-1 rounded-md ${
                        item.isScheduled
                          ? "bg-sky-400"
                          : item.isCompleted
                          ? "bg-green-400"
                          : item.isCancelled
                          ? "bg-red-400"
                          : "bg-gray-400"
                      }`}
                    >
                      {item.isScheduled
                        ? "Scheduled"
                        : item.isCompleted
                        ? "Completed"
                        : item.isCancelled
                        ? "Cancelled"
                        : item.isRescheduled
                        ? "Rescheduled"
                        : null}
                    </span>
                  </CardAction>
                </CardHeader>
                <CardContent className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    className="border-2 border-gray-400 p-2"
                  >
                    Reschedule
                  </Button>
                  <Button
                    variant="outline"
                    className="border-2 border-gray-400 p-2"
                  >
                    Cancel
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </CardContent>
        <ScrollBar orientation="horizontal" className="h-2 w-full" />
      </ScrollArea>
    </Card>
  );
}

export default TodaySession;
