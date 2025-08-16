import React from "react";
import { LuUserRound } from "react-icons/lu";
import { CardSection } from "../../common/Card";
import RecentActivity from "./RecentActivity";
import TodaysSession from "./TodaysSession";
import PrioritySection from "./PrioritySection";

function VhaDashboard() {
  const vhaCards = [
    {
      title: "Total Clients",
      value: "100",
      icon: <LuUserRound size={20} />,
      status: "Added 4 New Last Week",
    },
    {
      title: "Total Clients",
      value: "100",
      icon: <LuUserRound size={20} />,
      status: "Added 4 New Last Week",
    },

    {
      title: "Total Clients",
      value: "100",
      icon: <LuUserRound size={20} />,
      status: "Added 4 New Last Week",
    },
    {
      title: "Total Clients",
      value: "100",
      icon: <LuUserRound size={20} />,
      goto: "Added 4 New Last Week",
      underline: true,
    },
  ];
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Welcome Back !</h1>
        <p className="text-base text-gray-500">
          Here is an overview of your store
        </p>
      </div>
      <CardSection cards={vhaCards} />
      <ActivitySection />
      <PrioritySection />
    </div>
  );
}

export default VhaDashboard;

const ActivitySection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
      <RecentActivity />
      <TodaysSession />
    </div>
  );
};
