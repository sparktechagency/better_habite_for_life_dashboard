import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TbWallpaper } from "react-icons/tb";
function TodaysSession() {
  const recentActivity = [
    {
      title: "Session completed with Sarah Johnson",
      hoursAgo: "10 hours ago",
      viewLink: "/vha/session/123",
    },
    {
      title: "Session completed with Sarah Johnson",
      hoursAgo: "10 hours ago",
      viewLink: "/vha/session/123",
    },
    {
      title: "Session completed with Sarah Johnson",
      hoursAgo: "10 hours ago",
      viewLink: "/vha/session/123",
    },
    {
      title: "Session completed with Sarah Johnson",
      hoursAgo: "10 hours ago",
      viewLink: "/vha/session/123",
    },
  ];
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TbWallpaper size={20} />
          Todays Session
        </CardTitle>
        <CardAction className="font-semibold underline text-sky-500">
          View All
        </CardAction>
      </CardHeader>
      <CardContent>
        {recentActivity.map((activity, index) => (
          <div
            key={index}
            className="flex items-center gap-4  bg-gray-100 rounded-lg mb-2 px-4 py-2"
          >
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <div className="flex flex-col items-start gap-1 flex-1 ">
              <h3>{activity.title}</h3>
              <p className="text-sm text-gray-500">{activity.hoursAgo}</p>
            </div>
            <Button className="bg-sky-500 text-white">Join Now</Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default TodaysSession;
