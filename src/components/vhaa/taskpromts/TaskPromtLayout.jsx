import React from "react";
import SmallPageInfo from "@/components/common/SmallPageInfo";
import { CardSection } from "@/components/common/Card";
import { LuUserRound } from "react-icons/lu";
import { TbAlignBoxLeftBottom } from "react-icons/tb";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { TbChartDotsFilled } from "react-icons/tb";
import SearchFilterButton from "@/components/common/SearchFilterButton";
import RecentAlertsTable from "./RecentAlertsTable";
function TaskPromtLayout() {
  const vhaCards = [
    {
      title: "Total Prompts",
      value: 6,
      icon: <TbAlignBoxLeftBottom size={20} />,
      iconTextColor: "text-blue-500",
      iconBgColor: "bg-blue-500/10",
    },
    {
      title: "Active",
      value: 6,
      icon: <LuUserRound size={20} />,
      iconTextColor: "text-green-500",
      iconBgColor: "bg-green-500/10",
    },

    {
      title: "Scheduled",
      value: 6,
      icon: <RiCalendarScheduleLine size={20} />,
      iconTextColor: "text-yellow-500",
      iconBgColor: "bg-yellow-500/10",
    },
    {
      title: "Response Rate",
      value: 6,
      icon: <TbChartDotsFilled size={20} />,
      iconTextColor: "text-red-500",
      iconBgColor: "bg-red-500/10",
    },
  ];
  return (
    <div className="space-y-4">
      <SmallPageInfo
        title="Dashboard Overview"
        description="Here is an overview of your store"
      />
      <CardSection cards={vhaCards} footer={false} />
      <SearchFilterButton showAddButton={false} />
      <RecentAlertsTable />
    </div>
  );
}

export default TaskPromtLayout;
