"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Scrollbar } from "@radix-ui/react-scroll-area";
import { useRouter } from "next/navigation";
import { HiOutlineRectangleStack } from "react-icons/hi2";

export const formatContactInfo = (contactInfo, address) => {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs text-gray-500 font-medium">{address}</span>
      <span className="text-sm whitespace-nowrap">{contactInfo}</span>
    </div>
  );
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
};

export function ClinetStatusOverview({ clients = [] }) {
  const router = useRouter();

  // If no clients, show empty state
  if (clients.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-0">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <HiOutlineRectangleStack size={20} />
              <p className="text-sm font-medium">Client Status Overview</p>
            </div>
          </div>
          <div className="text-center py-8">
            <p className="text-gray-500">No clients available</p>
          </div>
        </div>
      </div>
    );
  }

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
          {clients.map((client) => (
            <TableRow key={client._id}>
              <TableCell className="font-medium w-1/6">
                <div className="flex items-center gap-2">
                  <Avatar className="size-12">
                    <AvatarImage src={client.profile} alt={client.fullName} />
                    <AvatarFallback>
                      {client.fullName?.charAt(0)?.toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">
                      {client.fullName}
                    </span>
                    <span className="text-xs text-gray-500">
                      {client.email}
                    </span>
                  </div>
                </div>
              </TableCell>

              <TableCell className="w-1/6">
                {formatContactInfo(client.phone || "No phone", client.address || "No address")}
              </TableCell>
              <TableCell className="w-1/6">
                {formatDate(client.createdAt)}
              </TableCell>
              <TableCell className="w-1/6">
                <p
                  className={`${client.isActive
                      ? "bg-lime-500/50 text-black"
                      : "bg-red-500/50 text-white"
                    } px-2 py-1 rounded-full text-center font-medium text-xs inline-block w-20 shadow-md`}
                >
                  {client.isActive ? "Active" : "Inactive"}
                </p>
              </TableCell>

              <TableCell className="w-auto flex justify-end gap-2 text-right ">
                <Button variant="outline" className="border border-sky-400 h-8" onClick={() => router.push(`/bhaa/messages?chatId=${client.chatId}`)}>
                  Chat
                </Button>
                <Button
                  variant="outline"
                  className="border border-gray-400 h-8"
                  onClick={() => router.push(`/bhaa/client-details/${client._id}`)}
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