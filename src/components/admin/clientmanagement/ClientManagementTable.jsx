import React from "react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const tableData = [
  {
    userName: "John Doe",
    email: "john.doe@example.com",
    joinedDate: "2025-05-12",

    status: "Active",
  },
  {
    userName: "John Doe",
    email: "john.doe@example.com",
    joinedDate: "2025-05-12",
    status: "Inactive",
  },
  {
    userName: "John Doe",
    email: "john.doe@example.com",
    joinedDate: "2025-05-12",
    status: "Active",
  },
  {
    userName: "John Doe",
    email: "john.doe@example.com",
    joinedDate: "2025-05-12",
    status: "Active",
  },
  {
    userName: "John Doe",
    email: "john.doe@example.com",
    joinedDate: "2025-05-12",
    status: "Inactive",
  },
  {
    userName: "John Doe",
    email: "john.doe@example.com",
    joinedDate: "2025-05-12",
    status: "Inactive",
  },
];
function ClientManagementTable() {
  return (
    <ScrollArea className="w-full rounded-md border whitespace-nowrap">
      <Table className="bg-white">
        <TableHeader>
          <TableRow className="bg-gray-200">
            <TableHead className="w-1/6">User Name</TableHead>
            <TableHead className="w-1/6">Joined Date</TableHead>
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
                    <span className="text-sm font-medium">{data.userName}</span>
                    <span className="text-xs text-gray-500">{data.email}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell className="w-1/6">{data.joinedDate}</TableCell>
              <TableCell className="w-1/6">
                <p
                  className={`${
                    data.status === "Active"
                      ? "bg-lime-500/50 text-black"
                      : data.status === "Inactive"
                      ? "bg-red-500/50 text-white"
                      : "bg-yellow-500/55 text-gray-500"
                  } px-2 py-1 rounded-full text-center font-medium text-xs inline-block w-20`}
                >
                  {data.status}
                </p>
              </TableCell>
              <TableCell className="w-1/6 text-right">
                <div className="flex items-center gap-2 justify-end">
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
                </div>
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

export default ClientManagementTable;
