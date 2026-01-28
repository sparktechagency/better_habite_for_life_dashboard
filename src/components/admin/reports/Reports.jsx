"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import React, { useState, useCallback } from "react";
import ReportViewModal from "./ReportViewModal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getImageUrl } from "@/utils/getImageUrl";
import formatDate from "@/utils/FormatDate/formatDate";
import { useSolveReportMutation } from "@/redux/Apis/admin/reportApi/reportApi";
import useToast from "@/hooks/useToast";
import { Badge } from "@/components/ui/badge";

function Reports({ reports = [], total = 0 }) {
  const toast = useToast();
  const [selectedReport, setSelectedReport] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [solveReport, { isLoading: isSolving }] = useSolveReportMutation();
  const [solvingReportId, setSolvingReportId] = useState(null);

  const handleViewDetails = useCallback((report) => {
    setSelectedReport(report);
    setIsViewModalOpen(true);
  }, []);

  const handleSolveReport = useCallback(
    async (report) => {
      setSolvingReportId(report._id);
      try {
        const response = await solveReport({ id: report._id }).unwrap();
        if (response?.success) {
          toast.success(response.message || "Report solved successfully");
        } else {
          toast.error(response?.message || "Failed to solve report");
        }
      } catch (error) {
        const errorMessage =
          error?.data?.message || error?.message || "Failed to solve report";
        toast.error(errorMessage);
      } finally {
        setSolvingReportId(null);
      }
    },
    [solveReport, toast]
  );

  if (reports.length === 0) {
    return (
      <Card className="w-full border shadow-sm rounded-lg">
        <CardHeader className="pb-4 border-b">
          <CardTitle className="text-lg font-semibold">Reports (0)</CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="flex items-center justify-center py-12">
            <p className="text-gray-500">No reports found</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full border shadow-sm rounded-lg">
      <CardHeader className="pb-4 border-b">
        <CardTitle className="text-lg font-semibold">
          Reports ({total})
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#F9FAFB] hover:bg-[#F9FAFB] border-b">
                <TableHead className="font-semibold text-gray-700 text-sm py-3 px-4">
                  User
                </TableHead>
                <TableHead className="font-semibold text-gray-700 text-sm py-3 px-4">
                  Email Address
                </TableHead>
                <TableHead className="font-semibold text-gray-700 text-sm py-3 px-4">
                  Create Date
                </TableHead>
                <TableHead className="font-semibold text-gray-700 text-sm py-3 px-4">
                  Report Description
                </TableHead>
                <TableHead className="font-semibold text-gray-700 text-sm py-3 px-4">
                  Status
                </TableHead>
                <TableHead className="font-semibold text-gray-700 text-sm py-3 px-4">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((report) => {
                const user = report.userId || {};
                const userName = user.fullName || "Unknown User";
                const userEmail = user.email || "N/A";
                const userAvatar = getImageUrl(user.profile);
                const isCurrentlySolving = solvingReportId === report._id;
                const isPending = report.status === "pending";
                const isSolved = report.status === "solved";

                return (
                  <TableRow
                    key={report._id}
                    className="hover:bg-gray-50/50 border-b transition-colors bg-white"
                  >
                    <TableCell className="text-sm text-gray-900 py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Avatar className="size-8">
                          <AvatarImage src={userAvatar} />
                          <AvatarFallback>
                            {userName.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span>{userName}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-gray-900 py-3 px-4">
                      {userEmail}
                    </TableCell>
                    <TableCell className="text-sm text-gray-900 py-3 px-4">
                      {formatDate(report.createdAt)}
                    </TableCell>
                    <TableCell className="text-sm text-gray-900 py-3 px-4">
                      <div className="truncate max-w-md">{report.text}</div>
                    </TableCell>
                    <TableCell className="py-3 px-4">
                      <Badge
                        className={
                          isSolved
                            ? "bg-green-100 text-green-700 hover:bg-green-100"
                            : "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
                        }
                      >
                        {report.status
                          ? report.status.charAt(0).toUpperCase() +
                            report.status.slice(1)
                          : "Pending"}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-3 px-4">
                      <div className="flex gap-2">
                        {isPending && (
                          <Button
                            className="bg-green-500 hover:bg-green-600 text-white border border-green-500 rounded-md px-4 py-1.5 text-sm font-medium h-auto"
                            onClick={() => handleSolveReport(report)}
                            disabled={isCurrentlySolving || isSolving}
                          >
                            {isCurrentlySolving ? "Solving..." : "Solve"}
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded-md px-4 py-1.5 text-sm font-medium h-auto"
                          onClick={() => handleViewDetails(report)}
                        >
                          View Details
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <ReportViewModal
        openModal={isViewModalOpen}
        setOpenModal={setIsViewModalOpen}
        report={selectedReport}
        onSolve={handleSolveReport}
      />
    </Card>
  );
}

export default Reports;
