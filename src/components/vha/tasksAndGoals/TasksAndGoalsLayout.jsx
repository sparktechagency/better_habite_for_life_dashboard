"use client";

import React, { useState } from "react";
import TasksList from "./TasksList";
import SmallPageInfo from "@/components/common/SmallPageInfo";
import SearchFilterButton from "@/components/common/SearchFilterButton";
import { useGetAllTasksQuery } from "@/redux/Apis/bha/assigntaskApi/assignTaskApi";
import { Button } from "@/components/ui/button";

function TasksAndGoalsLayout() {
  const [searchText, setSearchText] = useState("");
  const [status, setStatus] = useState("All Status");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const { data: allTasksData, isLoading: isAllTasksLoading } =
    useGetAllTasksQuery({
      page: currentPage,
      limit,
      search: searchText,
      status,
    });

  const tasks = allTasksData?.data || [];
  const paginationMeta = allTasksData?.meta || {
    page: 1,
    limit: 10,
    total: 0,
    totalPage: 1,
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    const { totalPage } = paginationMeta;

    if (totalPage <= maxVisiblePages) {
      for (let i = 1; i <= totalPage; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPage);
      } else if (currentPage >= totalPage - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPage - 3; i <= totalPage; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPage);
      }
    }
    return pages;
  };

  return (
    <div className="space-y-4">
      <SmallPageInfo
        title="Tasks and Goals"
        description="Here is an overview of your tasks and goals"
      />
      <SearchFilterButton
        showAddButton={false}
        placeholder="Search Task"
        selectOptions={[
          "All Status",
          "Pending",
          "Completed",
          "Overdue",
          "In-Progress",
        ]}
        searchText={searchText}
        setSearchText={(value) => {
          setSearchText(value);
          setCurrentPage(1);
        }}
        status={status}
        setStatus={(value) => {
          setStatus(value);
          setCurrentPage(1);
        }}
      />
      <TasksList tasks={tasks} isLoading={isAllTasksLoading} />

      {/* Pagination */}
      {paginationMeta.totalPage > 1 && (
        <div className="flex items-center justify-between px-4 py-3 bg-white border rounded-lg">
          <div className="text-sm text-gray-500">
            Showing {(currentPage - 1) * limit + 1} to{" "}
            {Math.min(currentPage * limit, paginationMeta.total)} of{" "}
            {paginationMeta.total} results
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            {getPageNumbers().map((page, index) =>
              page === "..." ? (
                <span key={`ellipsis-${index}`} className="px-2">
                  ...
                </span>
              ) : (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className={
                    currentPage === page ? "bg-sky-500 text-white" : ""
                  }
                >
                  {page}
                </Button>
              )
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === paginationMeta.totalPage}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TasksAndGoalsLayout;
