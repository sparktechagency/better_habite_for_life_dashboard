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

// const tableData = [
//   {
//     id: 1,
//     taskName: "Complete weekly exercise tracking",
//     taskDescription: "Log daily physical activities for 7 consecutive days",
//     targetDomain: "Self-Management Domain",
//     date: "2025-05-12",
//     startTime: "10:00 AM",
//     endTime: "11:00 AM",
//     status: "Completed",
//   },
//   {
//     id: 2,
//     taskName: "Complete weekly exercise tracking",
//     taskDescription: "Log daily physical activities for 7 consecutive days",
//     targetDomain: "Self-Management Domain",
//     date: "2025-05-12",
//     startTime: "10:00 AM",
//     endTime: "11:00 AM",
//     status: "Completed",
//   },
//   {
//     id: 3,
//     taskName: "Complete weekly exercise tracking",
//     taskDescription: "Log daily physical activities for 7 consecutive days",
//     targetDomain: "Self-Management Domain",
//     date: "2025-05-12",
//     startTime: "10:00 AM",
//     endTime: "11:00 AM",
//     status: "Completed",
//   },
//   {
//     id: 4,
//     taskName: "Complete weekly exercise tracking",
//     taskDescription: "Log daily physical activities for 7 consecutive days",
//     targetDomain: "Self-Management Domain",
//     date: "2025-05-12",
//     startTime: "10:00 AM",
//     endTime: "11:00 AM",
//     status: "Completed",
//   },
//   {
//     id: 5,
//     taskName: "Complete weekly exercise tracking",
//     taskDescription: "Log daily physical activities for 7 consecutive days",
//     targetDomain: "Self-Management Domain",
//     date: "2025-05-12",
//     startTime: "10:00 AM",
//     endTime: "11:00 AM",
//     status: "Pending",
//   },
//   {
//     id: 6,
//     taskName: "Complete weekly exercise tracking",
//     taskDescription: "Log daily physical activities for 7 consecutive days",
//     targetDomain: "Self-Management Domain",
//     date: "2025-05-12",
//     startTime: "10:00 AM",
//     endTime: "11:00 AM",
//     status: "Pending",
//   },
//   {
//     id: 7,
//     taskName: "Complete weekly exercise tracking",
//     taskDescription: "Log daily physical activities for 7 consecutive days",
//     targetDomain: "Self-Management Domain",
//     date: "2025-05-12",
//     startTime: "10:00 AM",
//     endTime: "11:00 AM",
//     status: "Completed",
//   },
// ];

export function AssignedTaskList({ tableData }) {
  console.log("tableData:", tableData);
  return (
    <ScrollArea className="w-full rounded-md border whitespace-nowrap">
      <Table>
        <TableCaption className="text-lg font-bold">
          Assigned Task lists
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/6">Task Name</TableHead>
            <TableHead className="w-1/6">Task Description</TableHead>
            <TableHead className="w-1/6">Target Domain</TableHead>
            <TableHead className="w-1/6">Start Date</TableHead>
            <TableHead className="w-1/6">End Date</TableHead>
            <TableHead className="w-1/6">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!tableData || tableData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                No tasks assigned yet
              </TableCell>
            </TableRow>
          ) : (
            tableData.map((data) => (
              <TableRow key={data.id}>
                <TableCell className="font-medium w-1/6">
                  {data.taskName}
                </TableCell>
                <TableCell className="font-medium w-1/6">
                  {data.taskDescription.slice(0, 50)}...
                </TableCell>
                <TableCell className="w-1/6">
                  <Badge
                    variant="outline"
                    className="bg-red-500/50 text-black h-7"
                  >
                    {data.targetDomain}
                  </Badge>
                </TableCell>
                <TableCell className="w-1/6">{data.startDate}</TableCell>
                <TableCell className="w-1/6">{data.endDate}</TableCell>
                <TableCell className="w-1/6">
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
