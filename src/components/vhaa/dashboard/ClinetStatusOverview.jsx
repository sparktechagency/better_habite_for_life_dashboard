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

import { HiOutlineRectangleStack } from "react-icons/hi2";
import { useRouter } from "next/navigation";
const tableData = [
  {
    id: 1,
    clientName: "John Doe",
    clientEmail: "john.doe@example.com",
    progress: 90,
    joinedOn: "12-05-2025",
    status: "Active",
    contactInfo: "01717171717",
    address: "Dhaka, Bangladesh",
  },
  {
    id: 2,
    clientName: "Jane Doe",
    clientEmail: "jane.doe@example.com",
    progress: 70,
    joinedOn: "12-05-2025",
    status: "Active",
    contactInfo: "01717171717",
    address: "Dhaka, Bangladesh",
  },
  {
    id: 3,
    clientName: "John Doe",
    clientEmail: "john.doe@example.com",
    progress: 40,
    joinedOn: "12-05-2025",
    status: "Inactive",
    contactInfo: "01717171717",
    address: "Dhaka, Bangladesh",
  },
  {
    id: 4,
    clientName: "Jane Doe",
    clientEmail: "jane.doe@example.com",
    progress: 80,
    joinedOn: "12-05-2025",
    status: "Inactive",
    contactInfo: "01717171717",
    address: "Dhaka, Bangladesh",
  },
  {
    id: 5,
    clientName: "John Doe",
    clientEmail: "john.doe@example.com",
    progress: 33,
    joinedOn: "12-05-2025",
    status: "Inactive",
    contactInfo: "01717171717",
    address: "Dhaka, Bangladesh",
  },
  {
    id: 6,
    clientName: "Jane Doe",
    clientEmail: "jane.doe@example.com",
    progress: 50,
    joinedOn: "12-05-2025",
    status: "Inactive",
    contactInfo: "01717171717",
    address: "Dhaka, Bangladesh",
  },
  {
    id: 7,
    clientName: "Jane Doe",
    clientEmail: "jane.doe@example.com",
    progress: 10,
    joinedOn: "12-05-2025",
    status: "Inactive",
    contactInfo: "01717171717",
    address: "Dhaka, Bangladesh",
  },
];

export const formatContactInfo = (contactInfo, address) => {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs text-gray-500 font-medium">{address}</span>
      <span className="text-sm whitespace-nowrap">{contactInfo}</span>
    </div>
  );
};

export function ClinetStatusOverview() {
  const router = useRouter();
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
                <p
                  className="font-semibold text-normal text-orange-500 underline cursor-pointer"
                  onClick={() => router.push("/bhaa/client-overview")}
                >
                  View All
                </p>
              </div>
            </TableHead>
          </TableRow>
          <TableRow>
            <TableHead className="w-1/6">Client Name</TableHead>
            <TableHead className="w-1/6">Contact Info</TableHead>
            <TableHead className="w-1/6">Joined On</TableHead>
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

              <TableCell className="w-1/6">
                {formatContactInfo(data.contactInfo, data.address)}
              </TableCell>
              <TableCell className="w-1/6">{data.joinedOn}</TableCell>
              <TableCell className="w-1/6">
                <p
                  className={`${
                    data.status === "Inactive"
                      ? "bg-red-500/50 text-white"
                      : data.status === "Active"
                      ? "bg-lime-500/50 text-black"
                      : "bg-yellow-500/50 text-black"
                  } px-2 py-1 rounded-full text-center font-medium text-xs inline-block w-20  shadow-md`}
                >
                  {data.status}
                </p>
              </TableCell>

              <TableCell className="w-auto flex justify-end gap-2 text-right ">
                <Button variant="outline" className="border border-sky-400 h-8">
                  Chat
                </Button>
                <Button
                  variant="outline"
                  className="border border-gray-400 h-8"
                  onClick={() => router.push(`/bhaa/client-details/${data.id}`)}
                >
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

export default ClinetStatusOverview;
