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

export function ClientTable({ tableData }) {
  const router = useRouter();

  // Handle empty data state
  if (!tableData || tableData.length === 0) {
    return (
      <div className="w-full rounded-md border p-8 text-center">
        <p className="text-gray-500">No clients found</p>
      </div>
    );
  }

  return (
    <ScrollArea className="w-full rounded-md border whitespace-nowrap">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/6">Client</TableHead>
            <TableHead className="w-1/6">Contact Info</TableHead>
            <TableHead className="w-1/6">Joined On</TableHead>
            <TableHead className="w-1/6">Status</TableHead>
            <TableHead className="w-1/6 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData.map((data, index) => (
            <TableRow key={data.id || index}>
              <TableCell className="font-medium w-1/6">
                <div className="flex items-center gap-2">
                  <Avatar className="size-12">
                    <AvatarImage src={data.profile || "https://github.com/shadcn.png"} />
                    <AvatarFallback>
                      {data.clientName?.charAt(0)?.toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">
                      {data.clientName || "No Name"}
                    </span>
                    <span className="text-xs text-gray-500">
                      {data.clientEmail || "No Email"}
                    </span>
                  </div>
                </div>
              </TableCell>

              <TableCell className="w-1/6">{data.contactInfo}</TableCell>
              <TableCell className="w-1/6">{data.joinedOn || "N/A"}</TableCell>
              <TableCell className="w-1/6">
                {data.status === "Active" ? (
                  <p className="bg-lime-500/50 text-black px-2 py-1 rounded-full text-center font-medium text-xs inline-block w-20">
                    Active
                  </p>
                ) : (
                  <p className="bg-red-500/50 text-black px-2 py-1 rounded-full text-center font-medium text-xs inline-block w-20">
                    Inactive
                  </p>
                )}
              </TableCell>
              <TableCell className="w-auto flex justify-end gap-2 text-right ">
                <Button variant="outline" className="border border-sky-400 h-8" onClick={() => router.push(`/bhaa/messages?chatId=${data.chatId}`)}>
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

export default ClientTable;