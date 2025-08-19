import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { LuUserRound } from "react-icons/lu";
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

function RecentActivity() {
  const recentAlerts = [
    {
      title: "Client requires immediate attention",
      description: "Sarah Johnson missed 3 consecutive daily tasks",
      time: "10 hours ago",
    },
    {
      title: "Alert 2",
      description: "This is the second alert",
      time: "10 hours ago",
    },

    {
      title: "Alert 3",
      description: "This is the third alert",
      time: "10 hours ago",
    },
    {
      title: "Alert 4",
      description: "This is the fourth alert",
      time: "10 hours ago",
    },
    {
      title: "Alert 4",
      description: "This is the fourth alert",
      time: "10 hours ago",
    },
    {
      title: "Alert 4",
      description: "This is the fourth alert",
      time: "10 hours ago",
    },
  ];
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Alerts</CardTitle>
        <CardAction>
          <p className="font-semibold underline text-orange-500 cursor-pointer text-sm sm:text-base">
            View All
          </p>
        </CardAction>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] space-y-2">
          <div className="space-y-2">
            {recentAlerts.map((alert, index) => (
              <div key={index}>
                <div className="flex items-start gap-4 bg-gray-100 rounded-lg p-2">
                  <div className="bg-red-500/10 text-red-500 rounded-lg p-2 self-start md:self-start hidden md:block">
                    <LuUserRound size={20} />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h3 className="font-semibold">{alert.title}</h3>
                    <p className="text-sm text-gray-500">{alert.description}</p>
                    <p className="text-xs text-gray-500">{alert.time}</p>
                  </div>
                </div>
                {index < recentAlerts.length - 1 && (
                  <Separator className="my-2" />
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

export default RecentActivity;
