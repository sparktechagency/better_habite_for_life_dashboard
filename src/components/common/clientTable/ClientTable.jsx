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

export function ClientTable({ 
  tableData,
  paginationMeta = { page: 1, limit: 10, total: 0, totalPage: 1 },
  currentPage = 1,
  setCurrentPage = () => {},
  isLoading = false,
}) {
  const router = useRouter();
  const { total, totalPage } = paginationMeta;

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPage <= maxVisiblePages) {
      for (let i = 1; i <= totalPage; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPage);
      } else if (currentPage >= totalPage - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPage - 3; i <= totalPage; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPage);
      }
    }
    return pages;
  };

  // Handle empty data state
  if (!tableData || tableData.length === 0) {
    return (
      <div className="w-full rounded-md border p-8 text-center">
        <p className="text-gray-500">No clients found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
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
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  Loading...
                </TableCell>
              </TableRow>
            ) : (
              tableData.map((data, index) => (
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
              ))
            )}
          </TableBody>
          <TableFooter></TableFooter>
        </Table>
        <Scrollbar orientation="horizontal" className="h-2 w-full" />
      </ScrollArea>

      {/* Pagination */}
      {totalPage > 1 && (
        <div className="flex items-center justify-between px-4 py-3 bg-white border rounded-lg">
          <div className="text-sm text-gray-500">
            Showing {(currentPage - 1) * paginationMeta.limit + 1} to{" "}
            {Math.min(currentPage * paginationMeta.limit, total)} of {total}{" "}
            results
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            {getPageNumbers().map((page, index) =>
              page === "..." ? (
                <span key={`ellipsis-${index}`} className="px-2">
                  ...
                </span>
              ) : (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className={
                    currentPage === page ? "bg-sky-500 text-white" : ""
                  }
                >
                  {page}
                </Button>
              )
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPage}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ClientTable;