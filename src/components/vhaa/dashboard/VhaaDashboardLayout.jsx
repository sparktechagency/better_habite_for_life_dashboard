import { CardSection } from "@/components/common/Card";
import SmallPageInfo from "@/components/common/SmallPageInfo";
import React from "react";
import { LuUserRound } from "react-icons/lu";
import VhaaBarChart from "./VhaaBarChart";
import RecentAlerts from "./RecentAlerts";
import ClinetStatusOverview from "./ClinetStatusOverview";

function VhaaDashboardLayout() {
  const vhaaDashboardCards = [
    {
      title: "Active Clients",
      value: 30,
      icon: <LuUserRound size={20} />,
      iconTextColor: "text-red-500",
      iconBgColor: "bg-red-500/10",
      status: "Total clients under management",
    },
    {
      title: "Active Clients",
      value: 30,
      icon: <LuUserRound size={20} />,
      iconTextColor: "text-red-500",
      iconBgColor: "bg-red-500/10",
      status: "Average task completion today",
    },
    {
      title: "Active Alerts",
      value: 20,
      icon: <LuUserRound size={20} />,
      iconTextColor: "text-red-500",
      iconBgColor: "bg-red-500/10",
      status: "Requiring immediate attention",
    },
    {
      title: "Engagement Rate",
      value: 30,
      icon: <LuUserRound size={20} />,
      iconTextColor: "text-red-500",
      iconBgColor: "bg-red-500/10",
      status: "Average engagement rate",
    },
  ];
  return (
    <div className="space-y-4">
      <SmallPageInfo
        title="Dashboard"
        description="Here is an overview of your dashboard"
      />
      <CardSection cards={vhaaDashboardCards} footer={false} />
      <div className="grid grid-cols-1 gap-4">
        <VhaaBarChart />
        {/* <RecentAlerts /> */}
      </div>
      <ClinetStatusOverview />
    </div>
  );
}

export default VhaaDashboardLayout;
