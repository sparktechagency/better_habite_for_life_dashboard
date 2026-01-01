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

function Reports() {
  const [selectedReport, setSelectedReport] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleViewDetails = useCallback((report) => {
    setSelectedReport(report);
    setIsModalOpen(true);
  }, []);

  const handleSolve = useCallback((report) => {
    console.log("Solve report:", report);
    // Handle solve logic here
    // You can update the report status, make API call, etc.
  }, []);

  const recentReports = [
    {
      name: "Jane Cooper",
      email: "sarahpeterson@gmail.com",
      createDate: "2025-05-12",
      description:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
      isSolved: false,
    },
    {
      name: "Jane Cooper",
      email: "mahbubulqareem@gmail.com",
      createDate: "2025-05-12",
      description:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
      isSolved: false,
    },
    {
      name: "Jane Cooper",
      email: "mahbubulqareem@gmail.com",
      createDate: "2025-05-12",
      description:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
      isSolved: false,
    },
    {
      name: "Jane Cooper",
      email: "mahbubulqareem@gmail.com",
      createDate: "2025-05-12",
      description:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
      isSolved: false,
    },
    {
      name: "Jane Cooper",
      email: "mahbubulqareem@gmail.com",
      createDate: "2025-05-12",
      description:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
      isSolved: false,
    },
    {
      name: "Jane Cooper",
      email: "mahbubulqareem@gmail.com",
      createDate: "2025-05-12",
      description:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
      isSolved: false,
    },
    {
      name: "Jane Cooper",
      email: "mahbubulqareem@gmail.com",
      createDate: "2025-05-12",
      description:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
      isSolved: false,
    },
    {
      name: "Jane Cooper",
      email: "mahbubulqareem@gmail.com",
      createDate: "2025-05-12",
      description:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
      isSolved: false,
    },
    {
      name: "Jane Cooper",
      email: "mahbubulqareem@gmail.com",
      createDate: "2025-05-12",
      description:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
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
                        onClick={() => {
                          // Handle solve action
                          console.log("Solve report", index);
                        }}
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
        openModal={isModalOpen}
        setOpenModal={setIsModalOpen}
        report={selectedReport}
        onSolve={handleSolve}
      />
    </Card>
  );
}

export default Reports;
