"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Scrollbar } from "@radix-ui/react-scroll-area";
import { useRouter } from "next/navigation";

export function ClientTaskTable({
  sessionManagementInfoData = [],
  paginationMeta = { page: 1, limit: 10, total: 0, totalPage: 1 },
  currentPage = 1,
  setCurrentPage = () => {},
  isLoading = false,
}) {
  const router = useRouter();
  const { total, totalPage } = paginationMeta;

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

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
      <ScrollArea className="w-full rounded-md border whitespace-nowrap">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/6">Client</TableHead>
              <TableHead className="w-1/6">Start Date</TableHead>
              <TableHead className="w-1/6">Start Time</TableHead>
              <TableHead className="w-1/6">End Time</TableHead>
              <TableHead className="w-1/6">Duration</TableHead>
              <TableHead className="w-1/6">Status</TableHead>
              <TableHead className="w-1/6 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  Loading...
                </TableCell>
              </TableRow>
            ) : sessionManagementInfoData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-8 text-gray-500"
                >
                  No sessions found
                </TableCell>
              </TableRow>
            ) : (
              sessionManagementInfoData.map((data, index) => (
                <TableRow key={data.id || index}>
                  <TableCell className="font-medium w-1/6">
                    <div className="flex items-center gap-2">
                      <Avatar className="size-12">
                        <AvatarImage src={data.clientProfilePicture} />
                        <AvatarFallback>
                          {data.clientName?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">
                          {data.clientName}
                        </span>
                        <span className="text-xs text-gray-500">
                          {data.clientEmail}
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="w-1/6">{data.bookingDate}</TableCell>
                  <TableCell className="w-1/6">{data.startTime}</TableCell>
                  <TableCell className="w-1/6">{data.endTime}</TableCell>
                  <TableCell className="w-1/6">{data.duration}</TableCell>
                  <TableCell className="w-1/6">
                    {data.status === "confirmed" ? (
                      <p className="bg-blue-500/50 text-white px-2 py-1 rounded-full text-center font-medium text-xs inline-block w-20">
                        Confirmed
                      </p>
                    ) : data.status === "cancelled" ? (
                      <p className="bg-red-500/50 text-gray-500 px-2 py-1 rounded-full text-center font-medium text-xs inline-block w-20">
                        Cancelled
                      </p>
                    ) : data.status === "completed" ? (
                      <p className="bg-lime-500/50 text-white px-2 py-1 rounded-full text-center font-medium text-xs inline-block w-20">
                        Completed
                      </p>
                    ) : data.status === "pending" ? (
                      <p className="bg-yellow-500/50 text-white px-2 py-1 rounded-full text-center font-medium text-xs inline-block w-20">
                        Pending
                      </p>
                    ) : data.status === "missed" ? (
                      <p className="bg-orange-500/50 text-white px-2 py-1 rounded-full text-center font-medium text-xs inline-block w-20">
                        Missed
                      </p>
                    ) : data.status === "rescheduled" ? (
                      <p className="bg-purple-500/50 text-white px-2 py-1 rounded-full text-center font-medium text-xs inline-block w-20">
                        Rescheduled
                      </p>
                    ) : data.status === "overdue" ? (
                      <p className="bg-rose-500/50 text-white px-2 py-1 rounded-full text-center font-medium text-xs inline-block w-20">
                        Overdue
                      </p>
                    ) : (
                      <p className="bg-gray-500/50 text-white px-2 py-1 rounded-full text-center font-medium text-xs inline-block w-20 capitalize">
                        {data.status}
                      </p>
                    )}
                  </TableCell>
                  <TableCell className="w-auto flex justify-end gap-2 text-right ">
                    <Button
                      variant="outline"
                      className="border border-gray-400"
                      onClick={() =>
                        router.push(`/bha/clients/details/${data.id}`)
                      }
                    >
                      View Details
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-sky-500 text-white"
                      onClick={() =>
                        router.push(`/bha/clients/assign-task/${data.id}`)
                      }
                    >
                      Assign Task
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
          <TableFooter></TableFooter>
        </Table>
        <Scrollbar orientation="horizontal" className="h-2 w-full" />
      </ScrollArea>

      {/* Pagination */}
      {totalPage > 1 && (
        <div className="flex items-center justify-between px-4 py-3 bg-white border rounded-lg">
          <div className="text-sm text-gray-500">
            Showing {(currentPage - 1) * paginationMeta.limit + 1} to{" "}
            {Math.min(currentPage * paginationMeta.limit, total)} of {total}{" "}
            results
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
              disabled={currentPage === totalPage}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ClientTaskTable;
