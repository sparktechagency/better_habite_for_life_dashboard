import SmallPageInfo from "@/components/common/SmallPageInfo";
import React from "react";
import TaskMonitorTable from "./TaskMonitorTable";
import SearchFilterButton from "@/components/common/SearchFilterButton";
import { CardSection } from "@/components/common/Card";
import { TbChartDotsFilled } from "react-icons/tb";

function TaskMonitorLayout() {
  const taskMonitorStats = [
    {
      title: "Completed Tasks",
      value: 6,
      icon: <TbChartDotsFilled size={20} />,
      iconTextColor: "text-red-500",
      iconBgColor: "bg-red-500/10",
    },
    {
      title: "Pending Tasks",
      value: 6,
      icon: <TbChartDotsFilled size={20} />,
      iconTextColor: "text-red-500",
      iconBgColor: "bg-red-500/10",
    },
    {
      title: "Overdue Tasks",
      value: 6,
      icon: <TbChartDotsFilled size={20} />,
      iconTextColor: "text-red-500",
      iconBgColor: "bg-red-500/10",
    },
    {
      title: "Active Clients",
      value: 6,
      icon: <TbChartDotsFilled size={20} />,
      iconTextColor: "text-red-500",
      iconBgColor: "bg-red-500/10",
    },
  ];
  return (
    <div className="space-y-4">
      <SmallPageInfo
        title="Task Monitor"
        description="Here is an overview of your task monitor"
      />
      <CardSection cards={taskMonitorStats} footer={false} />
      <SearchFilterButton />
      <TaskMonitorTable />
    </div>
  );
}

export default TaskMonitorLayout;
