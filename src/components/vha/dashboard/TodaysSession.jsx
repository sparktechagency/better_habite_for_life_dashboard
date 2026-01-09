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
import formatDate from "@/utils/FormatDate/formatDate";
import { Badge } from "@/components/ui/badge";

function TodaysSession({ sessionData }) {
  const router = useRouter();
  const todaysSessions =
    sessionData?.map((session) => ({
      id: session._id || session.id,
      startAt: session.startTime,
      endAt: session.endTime,
      date: formatDate(session.bookingDate),
      name: session.userId?.fullName,
      status: session.status,
      session: "Session",
      viewLink: `/vha/session/${session._id || session.id}`,
    })) || [];

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
        {todaysSessions.length > 0 ? (
          todaysSessions.map((session, index) => (
            <div
              key={session.id || index}
              className="flex items-center justify-between gap-4 bg-white border border-gray-200 rounded-lg mb-3 px-4 py-3"
            >
              <div className="flex flex-col items-start gap-1 flex-1">
                <h3 className="font-bold text-gray-900">{session.name}</h3>
                <div className="flex items-center gap-1">
                  <p className="text-sm text-gray-600">{session.session}</p>•
                  <Badge
                    className={`${
                      session.status.toLowerCase() === "confirmed"
                        ? "bg-blue-500 text-white"
                        : session.status.toLowerCase() === "completed"
                        ? "bg-lime-500 text-white"
                        : session.status.toLowerCase() === "cancelled"
                        ? "bg-red-500 text-white"
                        : "bg-gray-500 text-white"
                    }`}
                  >
                    {session.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 mt-1">
                  <div className="flex items-center gap-1.5">
                    <Clock size={14} className="text-gray-500" />
                    <p className="text-sm text-gray-500">{session.startAt}</p>
                  </div>
                  -
                  <div className="flex items-center gap-1.5">
                    <Clock size={14} className="text-gray-500" />
                    <p className="text-sm text-gray-500">{session.endAt}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-gray-500" />
                    <p className="text-sm text-gray-500">{session.date}</p>
                  </div>
                </div>
              </div>
              <Button
                className="bg-sky-100 hover:bg-sky-200 text-sky-600 border-0"
                onClick={() =>
                  router.push(`/bha/clients/details/${session.id}`)
                }
              >
                View
              </Button>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            No sessions scheduled for today
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default TodaysSession;
