import React from "react";
import { LuUserRound } from "react-icons/lu";
import { CardSection } from "../../common/Card";
import RecentActivity from "./RecentActivity";
import TodaysSession from "./TodaysSession";
import PrioritySection from "./PrioritySection";
import SmallPageInfo from "@/components/common/SmallPageInfo";

function VhaDashboard() {
  const vhaCards = [
    {
      title: "Total Clients",
      value: "100",
      icon: <LuUserRound size={20} />,
      status: "Added 4 New Last Week",
    },
    {
      title: "Upcoming Sessions",
      value: "100",
      icon: <LuUserRound size={20} />,
      status: "Added 4 New Last Week",
    },

    {
      title: "Overdue Task",
      value: "100",
      icon: <LuUserRound size={20} />,
      status: "Added 4 New Last Week",
    },
    {
      title: "Total Tasks",
      value: "100",
      icon: <LuUserRound size={20} />,
      goto: "Added 4 New Last Week",
      underline: true,
    },
  ];
  return (
    <div className="space-y-4">
      <SmallPageInfo
        title="Welcome Back !"
        description="Here is an overview of your store"
      />
      <CardSection cards={vhaCards} footer={false} />
      <ActivitySection />
      <PrioritySection />
    </div>
  );
}

export default VhaDashboard;

const ActivitySection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
      <RecentActivity />
      <TodaysSession />
    </div>
  );
};
