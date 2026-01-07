"use client";

import React from "react";
import TaskMonitorTable from "./TaskMonitorTable";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SmallPageInfo from "@/components/common/SmallPageInfo";
import { CardSection } from "@/components/common/Card";
import { CgLoadbarDoc } from "react-icons/cg";

function TaskMonitorLayout() {
  const taskMonitorStats = [
    {
      title: "Completed Tasks",
      value: 6,
      icon: <CgLoadbarDoc size={20} />,
      iconTextColor: "text-red-500",
      iconBgColor: "bg-red-500/10",
    },
    {
      title: "Pending Tasks",
      value: 6,
      icon: <CgLoadbarDoc size={20} />,
      iconTextColor: "text-red-500",
      iconBgColor: "bg-red-500/10",
    },
    {
      title: "Overdue Tasks",
      value: 6,
      icon: <CgLoadbarDoc size={20} />,
      iconTextColor: "text-red-500",
      iconBgColor: "bg-red-500/10",
    },
    {
      title: "Active Clients",
      value: 6,
      icon: <CgLoadbarDoc size={20} />,
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

      {/* Recent Alerts Section with Search and Filters */}
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-xl font-bold text-gray-900">Recent Alerts</h1>
        <div className="flex items-center gap-2 flex-1 max-w-2xl">
          <Input
            className="flex-1 bg-gray-50 border-gray-300"
            placeholder="Search client, sessions"
          />
          <Select defaultValue="today">
            <SelectTrigger className="bg-gray-50 border-gray-300 w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="bg-gray-50 border-gray-300 w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <TaskMonitorTable />
    </div>
  );
}

export default TaskMonitorLayout;
