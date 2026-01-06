"use client";

import React, { useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TbFileSearch } from "react-icons/tb";
import { LuCalendar, LuUserRound } from "react-icons/lu";
import { CgLoadbarDoc } from "react-icons/cg";
import { Button } from "@/components/ui/button";
import ClientOverviewModal from "./ClientOverviewModal";
import { useRouter } from "next/navigation";
function RecentReports({ recentReports }) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  const handleView = (report) => {
    setSelectedReport(report);
    setIsModalOpen(true);
  };

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <CardTitle className="flex items-center gap-2">
          <TbFileSearch size={20} />
          Recent User Feedback
        </CardTitle>
        <CardAction>
          <p
            className="font-semibold underline text-sky-500 cursor-pointer text-sm sm:text-base"
            onClick={() => router.push("/bha/reports/view-all-feedback")}
          >
            View All
          </p>
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-3">
        {recentReports.map((report, index) => (
          <div
            key={index}
            className="flex items-center gap-4 bg-white border border-gray-200 rounded-lg p-4"
          >
            {/* Purple Icon */}
            <div className="bg-violet-100 text-violet-600 rounded-lg p-3 flex-shrink-0">
              <CgLoadbarDoc size={24} />
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col gap-2">
              {/* First line: Person and Date */}
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <div className="flex items-center gap-1.5">
                  <LuUserRound size={16} />
                  <span>{report.person}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <LuCalendar size={16} />
                  <span>{report.date}</span>
                </div>
              </div>
              {/* Second line: Title/Description */}
              <p className="text-sm text-gray-900">
                {report.description || report.title}
              </p>
            </div>

            {/* View Button */}
            <Button
              variant="outline"
              onClick={() => handleView(report)}
              className="bg-white border-gray-300 hover:bg-gray-50 flex-shrink-0"
            >
              View
            </Button>
          </div>
        ))}
      </CardContent>

      {/* Client Overview Modal */}
      <ClientOverviewModal
        openModal={isModalOpen}
        setOpenModal={setIsModalOpen}
        reportData={selectedReport}
      />
    </Card>
  );
}

export default RecentReports;
