import SmallPageInfo from "@/components/common/SmallPageInfo";
import React from "react";
import AdminBarChart from "./AdminBarChart";
import ClinetStatusOverview from "./ClinetStatusOverview";
import RecentActivity from "./RecentActivity";
import SubscriptionPieChart from "./SubscriptionPieChart";

function AdminDashboardLayout() {
  return (
    <div className="space-y-4">
      <SmallPageInfo
        title="Dashboard"
        description="Here is an overview of your dashboard"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-2">
          <AdminBarChart />
        </div>
        <div className="col-span-1 w-full">
          <SubscriptionPieChart />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-2">
          <ClinetStatusOverview />
        </div>
        <div className="col-span-1 h-full">
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardLayout;
