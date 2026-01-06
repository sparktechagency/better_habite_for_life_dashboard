"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TbWallpaper } from "react-icons/tb";
import { Clock, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";
function TodaysSession() {
  const router = useRouter();
  const todaysSessions = [
    {
      id: 1,
      name: "Abir Dehrun",
      role: "Maintainace Support",
      time: "10:01 AM",
      date: "2025-05-12",
      viewLink: "/vha/session/123",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "Technical Support",
      time: "11:30 AM",
      date: "2025-05-12",
      viewLink: "/vha/session/124",
    },
    {
      id: 3,
      name: "Michael Brown",
      role: "Customer Support",
      time: "02:15 PM",
      date: "2025-05-12",
      viewLink: "/vha/session/125",
    },
    {
      id: 4,
      name: "Emily Davis",
      role: "Maintenance Support",
      time: "03:45 PM",
      date: "2025-05-12",
      viewLink: "/vha/session/126",
    },
  ];
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TbWallpaper size={20} />
          Todays Session
        </CardTitle>
        <CardAction
          className="font-semibold underline text-sky-500 cursor-pointer"
          onClick={() => router.push("/bha/calendar/view-details")}
        >
          View All
        </CardAction>
      </CardHeader>
      <CardContent>
        {todaysSessions.map((session, index) => (
          <div
            key={index}
            className="flex items-center justify-between gap-4 bg-white border border-gray-200 rounded-lg mb-3 px-4 py-3"
          >
            <div className="flex flex-col items-start gap-1 flex-1">
              <h3 className="font-bold text-gray-900">{session.name}</h3>
              <p className="text-sm text-gray-600">{session.role}</p>
              <div className="flex items-center gap-4 mt-1">
                <div className="flex items-center gap-1.5">
                  <Clock size={14} className="text-gray-500" />
                  <p className="text-sm text-gray-500">{session.time}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar size={14} className="text-gray-500" />
                  <p className="text-sm text-gray-500">{session.date}</p>
                </div>
              </div>
            </div>
            <Button
              className="bg-sky-100 hover:bg-sky-200 text-sky-600 border-0"
              onClick={() => router.push(`/bha/clients/details/${session.id}`)}
            >
              View
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default TodaysSession;
