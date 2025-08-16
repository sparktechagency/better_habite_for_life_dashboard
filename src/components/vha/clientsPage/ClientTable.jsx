import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
const invoices = [
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
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Client</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Progress</TableHead>
          <TableHead>Last Sessions</TableHead>
          <TableHead>Next Session</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="font-medium flex items-center gap-2">
              <Avatar className="size-9">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium">John Doe</span>
                <span className="text-xs text-gray-500">
                  john.doe@example.com
                </span>
              </div>
            </TableCell>
            <TableCell>
              {invoice.progress === 33 ? (
                <p className="bg-lime-500/50 text-gray-500 px-2 py-1 rounded-full max-w-1/3 text-center font-medium">
                  Active
                </p>
              ) : (
                <p className="bg-red-500/50 text-gray-500 px-2 py-1 rounded-full max-w-1/3 text-center font-medium">
                  Inactive
                </p>
              )}
            </TableCell>
            <TableCell className="flex items-center gap-2">
              <Progress value={invoice.progress} /> {invoice.progress}%
            </TableCell>
            <TableCell className="text-right">2025-05-12</TableCell>
            <TableCell className="text-right">2025-05-12</TableCell>
            <TableCell className="text-right">
              <Button variant="outline" className="border-2 border-gray-400">
                View Details
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
