"use client";

import { CardSection } from "@/components/common/Card";
import SmallPageInfo from "@/components/common/SmallPageInfo";
import { LuUserRound } from "react-icons/lu";
import { useGetBhaaOverviewQuery } from '../../../redux/Apis/bhaa/overview/overviewApi';
import ClinetStatusOverview from "./ClinetStatusOverview";
import VhaaBarChart from "./VhaaBarChart";

function VhaaDashboardLayout() {
  const { data, isLoading } = useGetBhaaOverviewQuery();

  // Extract data from API response
  const apiData = data?.data;

  const vhaaDashboardCards = [
    {
      title: "Total Clients",
      value: apiData?.totalClient || 0,
      icon: <LuUserRound size={20} />,
      iconTextColor: "text-blue-500",
      iconBgColor: "bg-blue-500/10",
      status: "Total clients under management",
    },
    {
      title: "Total Assigned Tasks",
      value: apiData?.totalAsignedTask || 0,
      icon: <LuUserRound size={20} />,
      iconTextColor: "text-green-500",
      iconBgColor: "bg-green-500/10",
      status: "Total tasks assigned to clients",
    },
    {
      title: "Total Completed Tasks",
      value: apiData?.totalCompletedTask || 0,
      icon: <LuUserRound size={20} />,
      iconTextColor: "text-purple-500",
      iconBgColor: "bg-purple-500/10",
      status: "Tasks successfully completed",
    },
    {
      title: "Total Risk Users",
      value: apiData?.totalRiskUsers || 0,
      icon: <LuUserRound size={20} />,
      iconTextColor: "text-red-500",
      iconBgColor: "bg-red-500/10",
      status: "Clients requiring immediate attention",
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <SmallPageInfo
        title="Dashboard"
        description="Here is an overview of your dashboard"
      />
      <CardSection cards={vhaaDashboardCards} footer={false} />
      <div className="grid grid-cols-1 gap-4">
        <VhaaBarChart taskEngagementData={apiData?.taskEngagementData || []} />
      </div>
      <ClinetStatusOverview clients={apiData?.totalClients || []} />
    </div>
  );
}

export default VhaaDashboardLayout;