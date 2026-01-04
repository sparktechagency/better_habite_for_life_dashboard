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

import { HiOutlineRectangleStack } from "react-icons/hi2";
const tableData = [
  {
    clientName: "John Doe",
    clientEmail: "john.doe@example.com",
    progress: 90,
    joindDate: "2025-05-12",
    status: "Active",
    role: "BHA",
  },
  {
    clientName: "Jane Doe",
    clientEmail: "jane.doe@example.com",
    progress: 70,
    joindDate: "2025-05-12",
    status: "Active",
    role: "User",
  },
  {
    clientName: "John Doe",
    clientEmail: "john.doe@example.com",
    progress: 40,
    joindDate: "2025-05-12",
    status: "Active",
    role: "User",
  },
  {
    clientName: "Jane Doe",
    clientEmail: "jane.doe@example.com",
    progress: 80,
    joindDate: "2025-05-12",
    status: "Inactive",
    role: "BHAA",
  },
  {
    clientName: "John Doe",
    clientEmail: "john.doe@example.com",
    progress: 33,
    joindDate: "2025-05-12",
    status: "Inactive",
    role: "BHA",
  },
  {
    clientName: "Jane Doe",
    clientEmail: "jane.doe@example.com",
    progress: 50,
    joindDate: "2025-05-12",
    status: "Inactive",
    role: "User",
  },
  {
    clientName: "Jane Doe",
    clientEmail: "jane.doe@example.com",
    progress: 10,
    joindDate: "2025-05-12",
    status: "Inactive",
    role: "BHAA",
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
                  <p className="text-sm font-medium">User Status Overview</p>
                </div>
                <p className="font-semibold text-normal text-orange-500 underline cursor-pointer">
                  View All
                </p>
              </div>
            </TableHead>
          </TableRow>
          <TableRow>
            <TableHead className="w-1/6">Client Name</TableHead>
            <TableHead className="w-1/6">Role</TableHead>
            <TableHead className="w-1/6">Join Date</TableHead>
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

              <TableCell className="w-1/6">{data.role}</TableCell>
              <TableCell className="w-1/6">{data.joindDate}</TableCell>
              <TableCell className="w-1/6">
                <p
                  className={`${
                    data.status === "Inactive"
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
                  View Details
                </Button>
                <Button
                  variant="outline"
                  className="border border-red-400 h-8 text-red-500"
                >
                  Block
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
