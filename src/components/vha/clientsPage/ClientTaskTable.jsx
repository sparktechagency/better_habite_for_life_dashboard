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

const tableData = [
  {
    id: 1,
    clientName: "John Doe",
    clientEmail: "john.doe@example.com",
    startDate: "2025-05-12",
    startTime: "10:00 AM",
    status: "Active",
  },
  {
    id: 2,
    clientName: "Jane Doe",
    clientEmail: "jane.doe@example.com",
    startDate: "2025-05-12",
    startTime: "10:00 AM",
    status: "Active",
  },
  {
    id: 3,
    clientName: "John Doe",
    clientEmail: "john.doe@example.com",
    progress: 100,
    startDate: "2025-05-12",
    startTime: "10:00 AM",
    status: "Active",
  },
  {
    id: 4,
    clientName: "Jane Doe",
    clientEmail: "jane.doe@example.com",
    startDate: "2025-05-12",
    startTime: "10:00 AM",
    status: "Active",
  },
  {
    id: 5,
    clientName: "John Doe",
    clientEmail: "john.doe@example.com",
    startDate: "2025-05-12",
    startTime: "10:00 AM",
    status: "Inactive",
  },
  {
    id: 6,
    clientName: "Jane Doe",
    clientEmail: "jane.doe@example.com",
    progress: 70,
    startDate: "2025-05-12",
    startTime: "10:00 AM",
    status: "Active",
  },
  {
    id: 7,
    clientName: "Jane Doe",
    clientEmail: "jane.doe@example.com",
    startDate: "2025-05-12",
    startTime: "10:00 AM",
    status: "Inactive",
  },
];

export function ClientTaskTable() {
  const router = useRouter();
  return (
    <ScrollArea className="w-full rounded-md border whitespace-nowrap">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/6">Client</TableHead>
            <TableHead className="w-1/6">Start Date</TableHead>
            <TableHead className="w-1/6">Start Time</TableHead>
            <TableHead className="w-1/6">Status</TableHead>
            <TableHead className="w-1/6 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData.map((data, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium w-1/6">
                <div className="flex items-center gap-2">
                  <Avatar className="size-12">
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

              <TableCell className="w-1/6">{data.startDate}</TableCell>
              <TableCell className="w-1/6">{data.startTime}</TableCell>
              <TableCell className="w-1/6">
                {data.status === "Active" ? (
                  <p className="bg-lime-500/50 text-gray-500 px-2 py-1 rounded-full text-center font-medium text-xs inline-block w-20">
                    Active
                  </p>
                ) : (
                  <p className="bg-red-500/50 text-gray-500 px-2 py-1 rounded-full text-center font-medium text-xs inline-block w-20">
                    Inactive
                  </p>
                )}
              </TableCell>
              <TableCell className="w-auto flex justify-end gap-2 text-right ">
                <Button
                  variant="outline"
                  className="border border-gray-400"
                  onClick={() => router.push(`/bha/clients/details/${data.id}`)}
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
          ))}
        </TableBody>
        <TableFooter></TableFooter>
      </Table>
      <Scrollbar orientation="horizontal" className="h-2 w-full" />
    </ScrollArea>
  );
}

export default ClientTaskTable;
