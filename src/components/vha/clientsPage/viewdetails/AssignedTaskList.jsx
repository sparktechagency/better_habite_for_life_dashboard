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

const tableData = [
  {
    id: 1,
    taskName: "Complete weekly exercise tracking",
    taskDescription: "Log daily physical activities for 7 consecutive days",
    targetDomain: "Self-Management Domain",
    date: "2025-05-12",
    startTime: "10:00 AM",
    endTime: "11:00 AM",
    status: "Completed",
  },
  {
    id: 2,
    taskName: "Complete weekly exercise tracking",
    taskDescription: "Log daily physical activities for 7 consecutive days",
    targetDomain: "Self-Management Domain",
    date: "2025-05-12",
    startTime: "10:00 AM",
    endTime: "11:00 AM",
    status: "Completed",
  },
  {
    id: 3,
    taskName: "Complete weekly exercise tracking",
    taskDescription: "Log daily physical activities for 7 consecutive days",
    targetDomain: "Self-Management Domain",
    date: "2025-05-12",
    startTime: "10:00 AM",
    endTime: "11:00 AM",
    status: "Completed",
  },
  {
    id: 4,
    taskName: "Complete weekly exercise tracking",
    taskDescription: "Log daily physical activities for 7 consecutive days",
    targetDomain: "Self-Management Domain",
    date: "2025-05-12",
    startTime: "10:00 AM",
    endTime: "11:00 AM",
    status: "Completed",
  },
  {
    id: 5,
    taskName: "Complete weekly exercise tracking",
    taskDescription: "Log daily physical activities for 7 consecutive days",
    targetDomain: "Self-Management Domain",
    date: "2025-05-12",
    startTime: "10:00 AM",
    endTime: "11:00 AM",
    status: "Pending",
  },
  {
    id: 6,
    taskName: "Complete weekly exercise tracking",
    taskDescription: "Log daily physical activities for 7 consecutive days",
    targetDomain: "Self-Management Domain",
    date: "2025-05-12",
    startTime: "10:00 AM",
    endTime: "11:00 AM",
    status: "Pending",
  },
  {
    id: 7,
    taskName: "Complete weekly exercise tracking",
    taskDescription: "Log daily physical activities for 7 consecutive days",
    targetDomain: "Self-Management Domain",
    date: "2025-05-12",
    startTime: "10:00 AM",
    endTime: "11:00 AM",
    status: "Completed",
  },
];

export function AssignedTaskList() {
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
            <TableHead className="w-1/6">Date</TableHead>
            <TableHead className="w-1/6">Start Time</TableHead>
            <TableHead className="w-1/6">End Time</TableHead>
            <TableHead className="w-1/6">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData.map((data, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium w-1/6">
                {data.taskName}
              </TableCell>
              <TableCell className="font-medium w-1/6">
                {data.taskDescription}
              </TableCell>

              <TableCell className="w-1/6">{data.targetDomain}</TableCell>
              <TableCell className="w-1/6">{data.date}</TableCell>
              <TableCell className="w-1/6">{data.startTime}</TableCell>
              <TableCell className="w-1/6">{data.endTime}</TableCell>
              <TableCell className="w-1/6">
                <Badge
                  variant="outline"
                  className={`${
                    data.status === "Pending"
                      ? "bg-yellow-500 text-white"
                      : data.status === "Completed"
                      ? "bg-lime-500 text-white border-lime-500"
                      : "bg-red-500 text-white border-red-500"
                  } px-2 py-1  text-center font-medium text-xs inline-block w-20`}
                >
                  {data.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter></TableFooter>
      </Table>
      <Scrollbar orientation="horizontal" className="h-2 w-full" />
    </ScrollArea>
  );
}

export default AssignedTaskList;
