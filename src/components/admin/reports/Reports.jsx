// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import React from "react";

// function Reports() {
//   const recentReports = [
//     {
//       title: "Report 1",
//       person: "John Doe",
//       email: "john.doe@example.com",
//       description: "This is the first report",
//       issueDate: "2025-08-17",
//       viewLink: "/admin/reports/1",
//       isSolved: true,
//       isDeleted: false,
//       isViewed: false,
//     },
//     {
//       title: "Report 1",
//       person: "John Doe",
//       email: "john.doe@example.com",
//       description: "This is the first report",
//       issueDate: "2025-08-17",
//       viewLink: "/admin/reports/1",
//       isSolved: false,
//       isDeleted: false,
//       isViewed: false,
//     },
//     {
//       title: "Report 1",
//       person: "John Doe",
//       email: "john.doe@example.com",
//       description:
//         "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
//       issueDate: "2025-08-17",
//       viewLink: "/admin/reports/1",
//       isSolved: false,
//       isDeleted: false,
//       isViewed: true,
//     },
//     {
//       title: "Report 1",
//       person: "John Doe",
//       email: "john.doe@example.com",
//       description: "This is the first report",
//       issueDate: "2025-08-17",
//       viewLink: "/admin/reports/1",
//       isSolved: true,
//       isDeleted: false,
//       isViewed: false,
//     },
//   ];
//   return (
//     <Card className="space-y-1 p-4">
//       <CardHeader>
//         <CardTitle>Reports (10)</CardTitle>
//       </CardHeader>
//       <div className="grid grid-cols-7 gap-2 px-4 py-2 font-medium text-sm">
//         <div className="col-span-1">Date</div>
//         <div className="col-span-1">Person</div>
//         <div className="col-span-1">Email</div>
//         <div className="col-span-2">Description</div>
//         <div className="col-span-2">View Link</div>
//         <div className="col-span-2">Status</div>
//       </div>
//       {recentReports.map((report, index) => (
//         <CardContent
//           key={index}
//           className="grid grid-cols-7 gap-2 bg-gray-100 rounded-lg p-2 border border-gray-300 items-center"
//         >
//           <div className="col-span-1 truncate">{report.issueDate}</div>
//           <div className="col-span-1 truncate">{report.person}</div>
//           <div className="col-span-1 truncate">{report.email}</div>
//           <div className="col-span-2 truncate">{report.description}</div>
//           <div className="col-span-2 ">{report.viewLink}</div>
//           <div className="col-span-2 flex gap-2">
//             <span
//               className={`px-2 py-1 rounded-full text-xs font-medium ${
//                 report.isSolved
//                   ? "bg-green-100 text-green-700"
//                   : "bg-orange-100 text-orange-700"
//               }`}
//             >
//               {report.isSolved ? "Solved" : "Pending"}
//             </span>

//             {report.isViewed && (
//               <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
//                 Viewed
//               </span>
//             )}

//             {report.isDeleted && (
//               <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
//                 Deleted
//               </span>
//             )}
//           </div>
//         </CardContent>
//       ))}
//     </Card>
//   );
// }

// export default Reports;

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

function Reports() {
  const recentReports = [
    {
      title: "Report 1",
      person: "John Doe",
      email: "john.doe@example.com",
      description: "This is the first report",
      issueDate: "2025-08-17",
      viewLink: "/admin/reports/1",
      isSolved: true,
      isDeleted: false,
      isViewed: false,
    },
    {
      title: "Report 2",
      person: "Jane Smith",
      email: "jane.smith@example.com",
      description: "This is the second report",
      issueDate: "2025-08-16",
      viewLink: "/admin/reports/2",
      isSolved: false,
      isDeleted: false,
      isViewed: false,
    },
    {
      title: "Report 3",
      person: "Bob Wilson",
      email: "bob.wilson@example.com",
      description:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
      issueDate: "2025-08-15",
      viewLink: "/admin/reports/3",
      isSolved: false,
      isDeleted: false,
      isViewed: true,
    },
    {
      title: "Report 4",
      person: "Alice Johnson",
      email: "alice.johnson@example.com",
      description: "This is the fourth report",
      issueDate: "2025-08-14",
      viewLink: "/admin/reports/4",
      isSolved: true,
      isDeleted: true,
      isViewed: true,
    },
  ];

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <CardTitle>Reports ({recentReports.length})</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 hover:bg-gray-50">
              <TableHead className="w-[120px] font-medium text-gray-700">
                Date
              </TableHead>
              <TableHead className="w-[140px] font-medium text-gray-700">
                Person
              </TableHead>
              <TableHead className="w-[180px] font-medium text-gray-700">
                Email
              </TableHead>
              <TableHead className="font-medium text-gray-700">
                Description
              </TableHead>
              <TableHead className="w-[140px] font-medium text-gray-700">
                View Link
              </TableHead>
              <TableHead className="w-[130px] font-medium text-gray-700">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentReports.map((report, index) => (
              <TableRow key={index} className="hover:bg-gray-50">
                <TableCell className="text-sm text-gray-900">
                  {new Date(report.issueDate).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-sm text-gray-900">
                  <div className="truncate">{report.person}</div>
                </TableCell>
                <TableCell className="text-sm text-gray-600">
                  <div className="truncate">{report.email}</div>
                </TableCell>
                <TableCell className="text-sm text-gray-700 max-w-[300px]">
                  <div className="line-clamp-2 leading-relaxed">
                    {report.description}
                  </div>
                </TableCell>
                <TableCell className="text-sm">
                  <a
                    href={report.viewLink}
                    className="text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    View Details
                  </a>
                </TableCell>
                <TableCell>
                  <div className="flex  gap-1">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium w-fit ${
                        report.isSolved
                          ? "bg-lime-100 text-green-700"
                          : "bg-orange-100 text-orange-500"
                      }`}
                    >
                      {report.isSolved ? "Solved" : "Pending"}
                    </span>

                    {report.isViewed && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium w-fit">
                        Viewed
                      </span>
                    )}

                    {report.isDeleted && (
                      <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium w-fit">
                        Deleted
                      </span>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default Reports;
