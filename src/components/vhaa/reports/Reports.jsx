import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TbEye, TbFileSearch } from "react-icons/tb";
import { LuCalendar, LuUserRound } from "react-icons/lu";

import { Button } from "@/components/ui/button";
function Reports() {
  const recentReports = [
    {
      title: "Week Progress Report - Sarah Johnson",
      person: "John Doe",
      viewLink: "/vha/reports/1",
      date: "2025-08-17",
    },
    {
      title: "Week Progress Report - Sarah Johnson",
      person: "John Doe",
      viewLink: "/vha/reports/1",
      date: "2025-08-17",
    },
    {
      title: "Week Progress Report - Sarah Johnson",
      person: "John Doe",
      viewLink: "/vha/reports/1",
      date: "2025-08-17",
    },
    {
      title: "Week Progress Report - Sarah Johnson",
      person: "John Doe",
      viewLink: "/vha/reports/1",
      date: "2025-08-17",
    },
  ];
  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <CardTitle className="flex items-center gap-2">
          <TbFileSearch size={20} />
          Recent Reports
        </CardTitle>
        <CardAction>
          <p className="font-semibold underline text-sky-500 cursor-pointer text-sm sm:text-base">
            View All
          </p>
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-4 ">
        {recentReports.map((report, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row md:items-center gap-4 justify-between  rounded-lg p-3 border border-gray-300 bg-orange-50"
          >
            <div className="flex items-start flex-1 gap-1 ">
              <div className="flex flex-col items-start  flex-1 gap-1">
                <h3 className="text-base sm:text-lg font-semibold">
                  {report.title}
                </h3>
                <div className="flex  sm:items-center gap-6 sm:gap-4">
                  <p className="text-sm text-gray-900 text-semibold flex items-center gap-2">
                    <LuUserRound size={15} />
                    {report.person}
                  </p>
                  <p className="text-sm text-gray-900 text-semibold flex items-center gap-2">
                    <LuCalendar size={15} />
                    {report.date}
                  </p>
                </div>
                <p className="text-xs text-gray-500">1 hours ago</p>
              </div>
            </div>
            {/* Buttons */}
            <div className="flex flex-row  items-stretch md:items-end gap-2 w-full md:w-auto">
              <Button
                variant="outline"
                className="border border-gray-400 h-10 text-xs sm:text-sm flex-1 md:flex-none"
              >
                <TbEye size={15} /> Preview
              </Button>
              <Button
                variant="outline"
                className="border border-orange-400/50  bg-orange-500/70 hover:bg-orange-500/80 hover:text-gray-50 text-white h-10 text-xs sm:text-sm flex-1 md:flex-none"
              >
                Download
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default Reports;
