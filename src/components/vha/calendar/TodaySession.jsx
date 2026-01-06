"use client";

import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { TbWallpaper } from "react-icons/tb";
import { CardTitle, CardAction } from "@/components/ui/card";
function TodaySession() {
  const router = useRouter();

  const sessions = [
    {
      id: 1,
      name: "Abir Dehrun",
      reason: "Maintainace Support",
      time: "10:01 AM",
      date: "2025-05-12",
    },
    {
      id: 2,
      name: "Abir Dehrun",
      reason: "Maintainace Support",
      time: "10:01 AM",
      date: "2025-05-12",
    },
    {
      id: 3,
      name: "Abir Dehrun",
      reason: "Maintainace Support",
      time: "10:01 AM",
      date: "2025-05-12",
    },
    {
      id: 4,
      name: "Abir Dehrun",
      reason: "Maintainace Support",
      time: "10:01 AM",
      date: "2025-05-12",
    },
    {
      id: 5,
      name: "Abir Dehrun",
      reason: "Maintainace Support",
      time: "10:01 AM",
      date: "2025-05-12",
    },
    {
      id: 6,
      name: "Abir Dehrun",
      reason: "Maintainace Support",
      time: "10:01 AM",
      date: "2025-05-12",
    },
    {
      id: 7,
      name: "Abir Dehrun",
      reason: "Maintainace Support",
      time: "10:01 AM",
      date: "2025-05-12",
    },
  ];

  const handleView = (id) => {
    router.push(`/bha/calendar/view-details?id=${id}`);
  };

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <CardTitle className="flex items-center gap-2">
          <TbWallpaper size={20} />
          Todays Session
        </CardTitle>
        <CardAction>
          <p
            onClick={() => router.push("/bha/calendar/view-details")}
            className="font-semibold underline text-sky-500 cursor-pointer text-sm sm:text-base"
          >
            View All Session
          </p>
        </CardAction>
      </CardHeader>
      <CardContent className="px-4">
        <ScrollArea className="h-[660px] pr-2">
          <div className="space-y-3">
            {sessions.map((session) => (
              <div
                key={session.id}
                className="flex items-center justify-between gap-4 border border-gray-200 rounded-lg px-4 py-3 bg-white"
              >
                <div className="flex flex-col gap-1">
                  <p className="text-base font-semibold text-gray-900">
                    {session.name}
                  </p>
                  <p className="text-sm text-gray-600">{session.reason}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                    <span className="flex items-center gap-1">
                      <Clock size={14} /> {session.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={14} /> {session.date}
                    </span>
                  </div>
                </div>
                <Button
                  onClick={() => handleView(session.id)}
                  className="bg-blue-100 text-blue-600 hover:bg-blue-200 border border-blue-200"
                >
                  View
                </Button>
              </div>
            ))}
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

export default TodaySession;
