"use client";

import { CardSection } from "@/components/common/Card";
import SmallPageInfo from "@/components/common/SmallPageInfo";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { CgLoadbarDoc } from "react-icons/cg";
import { useLazyGetAllTaskQuery } from '../../../redux/Apis/bhaa/TaskMonitor/taskMonitorApi';
import TaskMonitorTable from "./TaskMonitorTable";

function TaskMonitorLayout() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState("today");
  const [page, setPage] = useState(1);
  const limit = 10;

  // Use lazy query for better control
  const [getAllTasks, { data, isLoading, error }] = useLazyGetAllTaskQuery();

  // Initial fetch and refetch on filter changes
  useEffect(() => {
    const fetchData = async () => {
      await getAllTasks({
        page,
        limit,
        status: statusFilter !== 'all' ? statusFilter : undefined,
        search: search || undefined
      });
    };

    // Add debounce for search
    const timer = setTimeout(() => {
      fetchData();
    }, 500);

    return () => clearTimeout(timer);
  }, [search, statusFilter, timeFilter, page, getAllTasks]);

  // Calculate statistics from API data
  const calculateStats = () => {
    if (!data?.data) {
      return {
        totalCompletedTask: 0,
        totalPendingTask: 0,
        totalOverdueTask: 0,
        totalCancelledTask: 0
      };
    }

    return {
      totalCompletedTask: data.data.totalCompletedTask || 0,
      totalPendingTask: data.data.totalPendingTask || 0,
      totalOverdueTask: data.data.totalOverdueTask || 0,
      totalCancelledTask: data.data.totalCancelledTask || 0
    };
  };

  const stats = calculateStats();

  const taskMonitorStats = [
    {
      title: "Completed Tasks",
      value: stats.totalCompletedTask,
      icon: <CgLoadbarDoc size={20} />,
      iconTextColor: "text-green-500",
      iconBgColor: "bg-green-500/10",
    },
    {
      title: "Pending Tasks",
      value: stats.totalPendingTask,
      icon: <CgLoadbarDoc size={20} />,
      iconTextColor: "text-yellow-500",
      iconBgColor: "bg-yellow-500/10",
    },
    {
      title: "Overdue Tasks",
      value: stats.totalOverdueTask,
      icon: <CgLoadbarDoc size={20} />,
      iconTextColor: "text-red-500",
      iconBgColor: "bg-red-500/10",
    },
    {
      title: "Cancelled Tasks",
      value: stats.totalCancelledTask,
      icon: <CgLoadbarDoc size={20} />,
      iconTextColor: "text-gray-500",
      iconBgColor: "bg-gray-500/10",
    },
  ];

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset to first page on new search
  };

  const handleStatusChange = (value) => {
    setStatusFilter(value);
    setPage(1); // Reset to first page on filter change
  };

  // const handleTimeChange = (value) => {
  //   setTimeFilter(value);
  //   setPage(1); // Reset to first page on filter change
  // };

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
            value={search}
            onChange={handleSearchChange}
          />
          {/* <Select value={timeFilter} onValueChange={handleTimeChange}>
            <SelectTrigger className="bg-gray-50 border-gray-300 w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select> */}
          <Select value={statusFilter} onValueChange={handleStatusChange}>
            <SelectTrigger className="bg-gray-50 border-gray-300 w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <TaskMonitorTable
        data={data?.data?.result || []}
        isLoading={isLoading}
        error={error}
        pagination={{
          currentPage: page,
          totalPages: data?.data?.meta?.totalPage || 1,
          totalItems: data?.data?.meta?.total || 0,
          onPageChange: setPage
        }}
      />
    </div>
  );
}

export default TaskMonitorLayout;