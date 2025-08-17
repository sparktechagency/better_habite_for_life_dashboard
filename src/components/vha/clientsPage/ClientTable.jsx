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

const tableData = [
  {
    clientName: "John Doe",
    clientEmail: "john.doe@example.com",
    progress: 33,
    lastSession: "2025-05-12",
    nextSession: "2025-05-12",
  },
  {
    clientName: "Jane Doe",
    clientEmail: "jane.doe@example.com",
    progress: 33,
    lastSession: "2025-05-12",
    nextSession: "2025-05-12",
  },
  {
    clientName: "John Doe",
    clientEmail: "john.doe@example.com",
    progress: 100,
    lastSession: "2025-05-12",
    nextSession: "2025-05-12",
  },
  {
    clientName: "Jane Doe",
    clientEmail: "jane.doe@example.com",
    progress: 33,
    lastSession: "2025-05-12",
    nextSession: "2025-05-12",
  },
  {
    clientName: "John Doe",
    clientEmail: "john.doe@example.com",
    progress: 33,
    lastSession: "2025-05-12",
    nextSession: "2025-05-12",
  },
  {
    clientName: "Jane Doe",
    clientEmail: "jane.doe@example.com",
    progress: 70,
    lastSession: "2025-05-12",
    nextSession: "2025-05-12",
  },
  {
    clientName: "Jane Doe",
    clientEmail: "jane.doe@example.com",
    progress: 33,
    lastSession: "2025-05-12",
    nextSession: "2025-05-12",
  },
];

export function ClientTable() {
  return (
    <ScrollArea className="w-full rounded-md border whitespace-nowrap">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/6">Client</TableHead>
            <TableHead className="w-1/6">Status</TableHead>
            <TableHead className="w-1/6">Progress</TableHead>
            <TableHead className="w-1/6">Last Sessions</TableHead>
            <TableHead className="w-1/6">Next Session</TableHead>
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
                {data.progress === 33 ? (
                  <p className="bg-lime-500/50 text-gray-500 px-2 py-1 rounded-full text-center font-medium text-xs inline-block w-20">
                    Active
                  </p>
                ) : (
                  <p className="bg-red-500/50 text-gray-500 px-2 py-1 rounded-full text-center font-medium text-xs inline-block w-20">
                    Inactive
                  </p>
                )}
              </TableCell>
              <TableCell className="w-1/6">
                <div className="flex items-center gap-2 w-40">
                  <Progress value={data.progress} className="" />
                  <span className="text-sm whitespace-nowrap">
                    {data.progress}%
                  </span>
                </div>
              </TableCell>
              <TableCell className="w-1/6">{data.lastSession}</TableCell>
              <TableCell className="w-1/6">{data.nextSession}</TableCell>
              <TableCell className="w-1/6  text-right">
                <Button variant="outline" className="border-2 border-gray-400">
                  View Details
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

export default ClientTable;
