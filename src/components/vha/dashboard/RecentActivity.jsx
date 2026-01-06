import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LuActivity } from "react-icons/lu";
import { Badge } from "@/components/ui/badge";
function RecentActivity() {
  const recentActivity = [
    {
      title: "Session completed with Sarah Johnson",
      hoursAgo: "10 hours ago",
      viewLink: "/vha/session/123",
      status: "Completed",
    },
    {
      title: "Session completed with Sarah Johnson",
      hoursAgo: "10 hours ago",
      viewLink: "/vha/session/123",
      status: "Pending",
    },
    {
      title: "Session completed with Sarah Johnson",
      hoursAgo: "10 hours ago",
      viewLink: "/vha/session/123",
      status: "Completed",
    },
    {
      title: "Session completed with Sarah Johnson",
      hoursAgo: "10 hours ago",
      viewLink: "/vha/session/123",
      status: "Pending",
    },
  ];
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <LuActivity size={20} />
          Recent Activity
        </CardTitle>
        <CardAction className="font-semibold underline text-sky-500 cursor-pointer">
          View All
        </CardAction>
      </CardHeader>
      <CardContent>
        {recentActivity.map((activity, index) => (
          <div
            key={index}
            className="flex items-center justify-between gap-4  bg-gray-100 rounded-lg mb-2 px-4 py-2"
          >
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <div className="flex flex-col items-start gap-1  ">
                <h3>{activity.title}</h3>
                <p className="text-sm text-gray-500">{activity.hoursAgo}</p>
              </div>
            </div>
            <Badge
              className={`${
                activity.status === "Completed"
                  ? "bg-green-500 text-white"
                  : "bg-yellow-500 text-white"
              }`}
            >
              {activity.status}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default RecentActivity;
