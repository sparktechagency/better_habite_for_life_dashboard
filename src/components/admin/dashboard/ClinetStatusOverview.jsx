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
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Scrollbar } from "@radix-ui/react-scroll-area";

import { HiOutlineRectangleStack } from "react-icons/hi2";
const tableData = [
  {
    clientName: "John Doe",
    clientEmail: "john.doe@example.com",
    progress: 90,
    lastActivity: "Last Activity 4 days ago",
    status: "On Time",
  },
  {
    clientName: "Jane Doe",
    clientEmail: "jane.doe@example.com",
    progress: 70,
    lastActivity: "Last Activity 1 days ago",
    status: "On Time",
  },
  {
    clientName: "John Doe",
    clientEmail: "john.doe@example.com",
    progress: 40,
    lastActivity: "Last Activity 4 days ago",
    status: "On Time",
  },
  {
    clientName: "Jane Doe",
    clientEmail: "jane.doe@example.com",
    progress: 80,
    lastActivity: "Last Activity 4 days ago",
    status: "Overdue",
  },
  {
    clientName: "John Doe",
    clientEmail: "john.doe@example.com",
    progress: 33,
    lastActivity: "Last Activity 10 days ago",
    status: "Overdue",
  },
  {
    clientName: "Jane Doe",
    clientEmail: "jane.doe@example.com",
    progress: 50,
    lastActivity: "Last Activity 7 days ago",
    status: "Overdue",
  },
  {
    clientName: "Jane Doe",
    clientEmail: "jane.doe@example.com",
    progress: 10,
    lastActivity: "Last Activity 20 days ago",
    status: "Overdue",
  },
];

export function ClinetStatusOverview() {
  return (
    <ScrollArea className="w-full rounded-md border whitespace-nowrap">
      <Table className="bg-white">
        <TableHeader>
          <TableRow>
            <TableHead colSpan={6} className="py-2">
              <div className="flex items-center w-full justify-between">
                <div className="flex items-center gap-2">
                  <HiOutlineRectangleStack size={20} />
                  <p className="text-sm font-medium">Client Status Overview</p>
                </div>
                <p className="font-semibold text-normal text-orange-500 underline cursor-pointer">
                  View All
                </p>
              </div>
            </TableHead>
          </TableRow>
          <TableRow>
            <TableHead className="w-1/6">Client Name</TableHead>
            <TableHead className="w-1/6">Progress</TableHead>
            <TableHead className="w-1/6">Last Activity</TableHead>
            <TableHead className="w-1/6">Status</TableHead>
            <TableHead className="w-1/6 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData.map((data, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium w-1/6">
                <div className="flex items-center gap-2">
                  <Avatar className="size-9">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
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
              <TableCell className="w-1/6">
                <div className="flex items-center gap-2 w-40">
                  <Progress value={data.progress} className="" />
                  <span className="text-sm whitespace-nowrap">
                    {data.progress}%
                  </span>
                </div>
              </TableCell>
              <TableCell className="w-1/6">{data.lastActivity}</TableCell>
              <TableCell className="w-1/6">
                <p
                  className={`${
                    data.status === "Overdue"
                      ? "bg-red-500/50 text-white"
                      : "bg-lime-500/50 text-black"
                  } px-2 py-1 rounded-full text-center font-medium text-xs inline-block w-20  shadow-md`}
                >
                  {data.status}
                </p>
              </TableCell>

              <TableCell className="w-auto flex justify-end gap-2 text-right ">
                <Button
                  variant="outline"
                  className="border border-gray-400 h-8"
                >
                  View
                </Button>
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

export default ClinetStatusOverview;
