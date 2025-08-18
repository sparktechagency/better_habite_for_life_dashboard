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
import { AiFillAlert } from "react-icons/ai";

const tableData = [
  {
    prompt: "John Doe",
    category: "john.doe@example.com",
    responseType: "Yes",
    status: "Active",
    response: "Daily",
    frequency: 21,
  },
  {
    prompt: "Jane Doe",
    category: "jane.doe@example.com",
    responseType: "No",
    status: "Active",
    response: "Daily",
    frequency: 21,
  },
  {
    prompt: "John Doe",
    category: "john.doe@example.com",
    responseType: "Yes",
    status: "Active",
    response: "Daily",
    frequency: 21,
  },
  {
    prompt: "Jane Doe",
    category: "jane.doe@example.com",
    responseType: "No",
    lastSession: "2025-05-12",
    status: "Paused",
    response: "Daily",
    frequency: 21,
  },
  {
    prompt: "John Doe",
    category: "john.doe@example.com",
    responseType: "No",
    status: "Pause",
    response: "Daily",
    frequency: 21,
  },
  {
    prompt: "Jane Doe",
    category: "jane.doe@example.com",
    responseType: "Yes",
    status: "Active",
    response: "Daily",
    frequency: 21,
  },
  {
    prompt: "Jane Doe",
    category: "jane.doe@example.com",
    responseType: "No",
    status: "Pause",
    response: "Daily",
    frequency: 21,
  },
];

export function RecentAlertsTable() {
  return (
    <ScrollArea className="w-full rounded-md border whitespace-nowrap">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead colSpan={6} className="py-2">
              <div className="flex items-center gap-2">
                <AiFillAlert size={20} />
                <p className="text-sm font-medium">Recent Alerts</p>
              </div>
            </TableHead>
          </TableRow>
          <TableRow>
            <TableHead className="w-1/6">Promts</TableHead>
            <TableHead className="w-1/6">Category</TableHead>
            <TableHead className="w-1/6">Response Type</TableHead>
            <TableHead className="w-1/6">Status</TableHead>
            <TableHead className="w-1/6">Response</TableHead>
            <TableHead className="w-1/6">Frequency</TableHead>
            <TableHead className="w-1/6 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData.map((data, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium w-1/6">{data.prompt}</TableCell>
              <TableCell className="w-1/6">{data.category}</TableCell>
              <TableCell className="w-1/6">{data.responseType}</TableCell>
              <TableCell className="w-1/6">
                <p
                  className={`${
                    data.status === "Active"
                      ? "bg-lime-500/50 text-gray-500"
                      : "bg-yellow-500/55 text-gray-500"
                  } px-2 py-1 rounded-full text-center font-medium text-xs inline-block w-20`}
                >
                  {data.status}
                </p>
              </TableCell>
              <TableCell className="w-1/6">{data.response}</TableCell>
              <TableCell className="w-1/6">{data.frequency}</TableCell>
              <TableCell className="w-1/6  text-right flex gap-2">
                <Button
                  variant="outline"
                  className="border border-gray-400 h-8"
                >
                  Edit
                </Button>
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

export default RecentAlertsTable;
