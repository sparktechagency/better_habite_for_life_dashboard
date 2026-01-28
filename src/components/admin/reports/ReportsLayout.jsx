"use client";
import SmallPageInfo from "@/components/common/SmallPageInfo";
import Reports from "./Reports";
import React, { useState } from "react";
import { useGetReportDataQuery } from "@/redux/Apis/admin/reportApi/reportApi";
import { Button } from "@/components/ui/button";

function ReportsLayout() {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);

  const {
    data: reportResponse,
    isLoading,
    error,
  } = useGetReportDataQuery({
    page: currentPage,
    limit: limit,
  });

  // Extract data from response
  const reports = reportResponse?.data || [];
  const meta = reportResponse?.meta || {};
  const totalPages = meta?.totalPage || 1;
  const total = meta?.total || 0;

  // Pagination handlers
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }
    return pages;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-gray-500">Loading reports...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-red-500">Failed to load reports</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <SmallPageInfo
        title="Reports"
        description="Here is an overview of your reports"
      />
      <Reports reports={reports} total={total} />

      {/* Pagination */}
      {reports.length > 0 && totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </Button>

          {getPageNumbers().map((page, index) =>
            page === "..." ? (
              <span key={`ellipsis-${index}`} className="px-2 text-gray-500">
                ...
              </span>
            ) : (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => handlePageClick(page)}
                className="min-w-[40px]"
              >
                {page}
              </Button>
            )
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}

export default ReportsLayout;
