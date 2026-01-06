import SmallPageInfo from "@/components/common/SmallPageInfo";
import { Button } from "@/components/ui/button";
import React from "react";
import { HiPlus } from "react-icons/hi";
import ReportStatCards from "./ReportStatCards";
import { LuUserRound } from "react-icons/lu";
import { CgLoadbarDoc } from "react-icons/cg";
import { Input } from "@/components/ui/input";
import RecentReports from "./RecentReports";
import ClientOverviewReport from "./ClientOverviewReport";

function ReportsLayout() {
  const statCards = [
    {
      statName: "Total Clients",
      statValue: "100",
      statIcon: <CgLoadbarDoc size={25} />,
      textColor: "text-lime-500",
      bgColor: "bg-lime-500/10",
    },
    {
      statName: "Total Clients",
      statValue: "100",
      statIcon: <CgLoadbarDoc size={25} />,
      textColor: "text-red-400",
      bgColor: "bg-red-400/10",
    },
    {
      statName: "Total Clients",
      statValue: "100",
      statIcon: <LuUserRound size={25} />,
      textColor: "text-violet-400",
      bgColor: "bg-violet-400/10",
    },
  ];
  const recentReports = [
    {
      title: "Week Progress",
      description: "Week Progress, Complete Weekly Exercise Tracking...",
      person: "Michael Chen",
      viewLink: "/vha/reports/1",
      date: "2024-06-01",
    },
    {
      title: "Week Progress",
      description: "Week Progress, Complete Weekly Exercise Tracking...",
      person: "Michael Chen",
      viewLink: "/vha/reports/2",
      date: "2024-06-01",
    },
    {
      title: "Week Progress",
      description: "Week Progress, Complete Weekly Exercise Tracking...",
      person: "Michael Chen",
      viewLink: "/vha/reports/3",
      date: "2024-06-01",
    },
    {
      title: "Week Progress",
      description: "Week Progress, Complete Weekly Exercise Tracking...",
      person: "Michael Chen",
      viewLink: "/vha/reports/4",
      date: "2024-06-01",
    },
    {
      title: "Week Progress",
      description: "Week Progress, Complete Weekly Exercise Tracking...",
      person: "Michael Chen",
      viewLink: "/vha/reports/5",
      date: "2024-06-01",
    },
    {
      title: "Week Progress",
      description: "Week Progress, Complete Weekly Exercise Tracking...",
      person: "Michael Chen",
      viewLink: "/vha/reports/6",
      date: "2024-06-01",
    },
  ];
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <SmallPageInfo
          title="Reports"
          description="Here is an overview of your reports"
        />
      </div>
      {/* <ReportStatCards statCards={statCards} /> */}
      <ClientOverviewReport />
      <RecentReports recentReports={recentReports} />
    </div>
  );
}

export default ReportsLayout;
