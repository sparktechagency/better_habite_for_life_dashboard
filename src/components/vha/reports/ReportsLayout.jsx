"use client";
import SmallPageInfo from "@/components/common/SmallPageInfo";
import React from "react";
import RecentReports from "./RecentReports";
import ClientOverviewReport from "./ClientOverviewReport";
import { useGetBhaReportDataQuery } from "@/redux/Apis/bha/reportApi/reportApi";

function ReportsLayout() {
  const { data: bhaReportData, isLoading } = useGetBhaReportDataQuery();

  const clientReports = bhaReportData?.data || [];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <SmallPageInfo
          title="Reports"
          description="Here is an overview of your reports"
        />
      </div>
      <ClientOverviewReport
        clientReports={clientReports}
        isLoading={isLoading}
      />
      <RecentReports />
    </div>
  );
}

export default ReportsLayout;
