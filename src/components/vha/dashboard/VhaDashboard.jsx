import React from "react";
import { LuUserRound } from "react-icons/lu";
import { CardSection } from "../../common/Card";
import RecentActivity from "./RecentActivity";
import TodaysSession from "./TodaysSession";

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
    <>
      <div className="">
        <h1 className="text-2xl font-bold">Welcome Back !</h1>
        <p className="text-base text-gray-500">
          Here is an overview of your store
        </p>
      </div>
      <CardSection cards={vhaCards} />
      <ActivitySection />
    </>
  );
}

export default VhaDashboard;

const ActivitySection = () => {
  return (
    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
      <RecentActivity />
      <TodaysSession />
    </div>
  );
};
