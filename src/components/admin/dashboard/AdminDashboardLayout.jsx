"use client";
import SmallPageInfo from "@/components/common/SmallPageInfo";
import React from "react";
import AdminBarChart from "./AdminBarChart";
import ClinetStatusOverview from "./ClinetStatusOverview";

import SubscriptionPieChart from "./SubscriptionPieChart";
import UserStats from "./UserStats";
import { useGetDashboardDataQuery } from "@/redux/Apis/admin/dashboardApi/dashboardApi";

function AdminDashboardLayout() {
  const { data: dashboardData, isLoading } = useGetDashboardDataQuery();
  console.log("dashboardData:", dashboardData?.data);

  const userStatsData = {
    totalUsers: dashboardData?.data?.totalUsers,
    totalAppUsers: dashboardData?.data?.appUsers,
    totalBhaUsers: dashboardData?.data?.totalDoctor,
    totalBhaaUsers: dashboardData?.data?.totalAssistant,
  };

  const totalUsersByMonth = dashboardData?.data?.userGrowthByMonth;
  const subscriptionData = dashboardData?.data?.subscriptionGrowth;
  const userStatusData = dashboardData?.data?.latestUsers;

  console.log("clientStatusData:", userStatusData);
  const userInfoData =
    userStatusData && userStatusData.length > 0
      ? userStatusData.map((item) => ({
          id: item._id,
          fullName: item.fullName,
          profilePicture: item.profile,
          email: item.email,
          role: item.role,
          status: item.isActive,
          joinedOn: item.createdAt,
        }))
      : [];

  console.log("userInfoData:", userInfoData);
  return (
    <div className="space-y-4">
      <SmallPageInfo
        title="Dashboard"
        description="Here is an overview of your dashboard"
      />
      <UserStats userStatsData={userStatsData} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-2">
          <AdminBarChart totalUsersByMonth={totalUsersByMonth} />
        </div>
        <div className="col-span-1 w-full">
          <SubscriptionPieChart subscriptionData={subscriptionData} />
        </div>
      </div>
      <div className="grid grid-cols-1  gap-4">
        <div className="col-span-2">
          <ClinetStatusOverview userInfoData={userInfoData} />
        </div>
        {/* <div className="col-span-1 h-full">
          <RecentActivity />
        </div> */}
      </div>
    </div>
  );
}

export default AdminDashboardLayout;
