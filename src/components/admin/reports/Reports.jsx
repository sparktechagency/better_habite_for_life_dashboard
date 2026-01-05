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
import SolveReportModal from "./SolveReportModal";

function Reports() {
  const [selectedReport, setSelectedReport] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isSolveModalOpen, setIsSolveModalOpen] = useState(false);
  const [reportToSolve, setReportToSolve] = useState(null);

  const handleViewDetails = useCallback((report) => {
    setSelectedReport(report);
    setIsViewModalOpen(true);
  }, []);

  const handleOpenSolveModal = useCallback((report) => {
    setReportToSolve(report);
    setIsSolveModalOpen(true);
    // Close view modal if open
    setIsViewModalOpen(false);
  }, []);

  const handleSendAnswer = useCallback((report, answer) => {
    console.log("Sending answer for report:", report);
    console.log("Answer:", answer);
    // Handle send answer logic here
    // You can update the report status, make API call, etc.
    // Update the report in the list to mark as solved
  }, []);

  const recentReports = [
    {
      id: 1,
      name: "Sarah Peterson",
      email: "sarahpeterson@gmail.com",
      createDate: "2025-01-15",
      description:
        "Dear Sir,\nLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.\nThank you.",
      isSolved: false,
    },
    {
      id: 2,
      name: "John Smith",
      email: "john.smith@example.com",
      createDate: "2025-01-14",
      description:
        "I am experiencing issues with the login functionality. The system is not accepting my credentials even though I am sure they are correct. Please help resolve this issue as soon as possible.",
      isSolved: false,
    },
    {
      id: 3,
      name: "Emily Johnson",
      email: "emily.johnson@example.com",
      createDate: "2025-01-13",
      description:
        "The dashboard is loading very slowly and sometimes times out. This is affecting my productivity. Can you please investigate and fix the performance issues?",
      isSolved: false,
    },
    {
      id: 4,
      name: "Michael Brown",
      email: "michael.brown@example.com",
      createDate: "2025-01-12",
      description:
        "I cannot access my reports section. Getting a 404 error when trying to navigate to the reports page. Please fix this issue.",
      isSolved: false,
    },
    {
      id: 5,
      name: "Lisa Anderson",
      email: "lisa.anderson@example.com",
      createDate: "2025-01-11",
      description:
        "The notification system is not working properly. I am not receiving any notifications for important updates. Please check and fix this.",
      isSolved: false,
    },
    {
      id: 6,
      name: "David Wilson",
      email: "david.wilson@example.com",
      createDate: "2025-01-10",
      description:
        "There seems to be a data synchronization issue. The data shown in the dashboard does not match the actual data in the database.",
      isSolved: false,
    },
    {
      id: 7,
      name: "Maria Garcia",
      email: "maria.garcia@example.com",
      createDate: "2025-01-09",
      description:
        "I am unable to export my data to CSV format. The export button is not responding when clicked. Please help.",
      isSolved: false,
    },
    {
      id: 8,
      name: "Robert Taylor",
      email: "robert.taylor@example.com",
      createDate: "2025-01-08",
      description:
        "The search functionality is not working correctly. It returns no results even when I know the data exists in the system.",
      isSolved: false,
    },
  ];

  return (
    <Card className="w-full border shadow-sm rounded-lg">
      <CardHeader className="pb-4 border-b">
        <CardTitle className="text-lg font-semibold">
          Reports ({recentReports.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#F9FAFB] hover:bg-[#F9FAFB] border-b">
                <TableHead className="font-semibold text-gray-700 text-sm py-3 px-4">
                  Name
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
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentReports.map((report, index) => (
                <TableRow
                  key={index}
                  className="hover:bg-gray-50/50 border-b transition-colors bg-white"
                >
                  <TableCell className="text-sm text-gray-900 py-3 px-4">
                    {report.name}
                  </TableCell>
                  <TableCell className="text-sm text-gray-900 py-3 px-4">
                    {report.email}
                  </TableCell>
                  <TableCell className="text-sm text-gray-900 py-3 px-4">
                    {report.createDate}
                  </TableCell>
                  <TableCell className="text-sm text-gray-900 py-3 px-4">
                    <div className="truncate max-w-md">
                      {report.description}
                    </div>
                  </TableCell>
                  <TableCell className="py-3 px-4">
                    <div className="flex gap-2">
                      <Button
                        className="bg-green-500 hover:bg-green-600 text-white border border-green-500 rounded-md px-4 py-1.5 text-sm font-medium h-auto"
                        onClick={() => handleOpenSolveModal(report)}
                      >
                        Solve
                      </Button>
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
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <ReportViewModal
        openModal={isViewModalOpen}
        setOpenModal={setIsViewModalOpen}
        report={selectedReport}
        onSolve={handleOpenSolveModal}
      />
      <SolveReportModal
        openModal={isSolveModalOpen}
        setOpenModal={setIsSolveModalOpen}
        report={reportToSolve}
        onSend={handleSendAnswer}
      />
    </Card>
  );
}

export default Reports;
