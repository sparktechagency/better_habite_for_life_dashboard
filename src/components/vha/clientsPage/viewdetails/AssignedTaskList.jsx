import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Scrollbar } from "@radix-ui/react-scroll-area";
import { Badge } from "@/components/ui/badge";

export function AssignedTaskList({ tableData }) {
  return (
    <ScrollArea className="w-full rounded-md border whitespace-nowrap">
      <Table>
        <TableCaption className="text-lg font-bold">
          Assigned Task lists
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Task Name</TableHead>
            <TableHead>Task Description</TableHead>
            <TableHead>Target Domain</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>Start Time</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>End Time</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!tableData || tableData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                No tasks assigned yet
              </TableCell>
            </TableRow>
          ) : (
            tableData.map((data) => (
              <TableRow key={data.id}>
                <TableCell className="font-medium">{data.taskName}</TableCell>
                <TableCell className="font-medium">
                  {data.taskDescription?.slice(0, 50)}
                  {(data.taskDescription?.length ?? 0) > 50 ? "..." : ""}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className="bg-red-500/50 text-black h-7"
                  >
                    {data.targetDomain}
                  </Badge>
                </TableCell>
                <TableCell>{data.startDate}</TableCell>
                <TableCell>{data.startTime}</TableCell>
                <TableCell>{data.endDate}</TableCell>
                <TableCell>{data.endTime}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={`${
                      data.status === "pending"
                        ? "bg-yellow-500 text-white border-yellow-500"
                        : data.status === "completed"
                        ? "bg-lime-500 text-white border-lime-500"
                        : data.status === "overdue"
                        ? "bg-red-500 text-white border-red-500"
                        : data.status === "in-progress"
                        ? "bg-blue-500 text-white border-blue-500"
                        : "bg-gray-500 text-white border-gray-500"
                    } px-2 py-1 text-center font-medium text-xs inline-block w-20 capitalize`}
                  >
                    {data.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
        <TableFooter></TableFooter>
      </Table>
      <Scrollbar orientation="horizontal" className="h-2 w-full" />
    </ScrollArea>
  );
}

export default AssignedTaskList;
