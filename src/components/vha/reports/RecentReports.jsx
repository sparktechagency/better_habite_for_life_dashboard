// import React from "react";
// import {
//   Card,
//   CardAction,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { TbFileSearch } from "react-icons/tb";
// import { LuCalendar, LuUserRound } from "react-icons/lu";
// import { CgLoadbarDoc } from "react-icons/cg";
// import { Button } from "@/components/ui/button";
// function RecentReports({ recentReports }) {
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle className="flex items-center gap-2">
//           <TbFileSearch size={20} />
//           Recent Reports
//         </CardTitle>
//         <CardAction>
//           <p className="font-semibold underline text-sky-500 cursor-pointer">
//             View All
//           </p>
//         </CardAction>
//       </CardHeader>
//       <CardContent className="space-y-4">
//         {recentReports.map((report, index) => (
//           <div
//             key={index}
//             className="flex flex-col md:flex-row items-center gap-4 justify-between bg-gray-100 rounded-lg  p-2 border"
//           >
//             <div className="bg-violet-500/10 text-violet-500 rounded-lg p-2">
//               <CgLoadbarDoc size={30} />
//             </div>
//             <div className="flex flex-col items-start flex-1 ">
//               <h3 className="text-lg font-semibold">{report.title}</h3>
//               <div className="flex items-center gap-4 text-center">
//                 <p className="text-sm text-gray-500 flex items-center gap-2 text-center">
//                   <LuUserRound size={15} />
//                   {report.person}
//                 </p>
//                 <p className="text-sm text-gray-500 flex items-center gap-2">
//                   <LuCalendar size={15} />
//                   {report.date}
//                 </p>
//               </div>
//             </div>
//             <div className="flex flex-row items-end gap-1">
//               <Button variant="outline" className="border-2 border-black h-7">
//                 Add Notes
//               </Button>
//               <Button variant="outline" className="border-2 border-black h-7">
//                 View
//               </Button>
//             </div>
//           </div>
//         ))}
//       </CardContent>
//     </Card>
//   );
// }

// export default RecentReports;

import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TbFileSearch } from "react-icons/tb";
import { LuCalendar, LuUserRound } from "react-icons/lu";
import { CgLoadbarDoc } from "react-icons/cg";
import { Button } from "@/components/ui/button";

function RecentReports({ recentReports }) {
  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <CardTitle className="flex items-center gap-2">
          <TbFileSearch size={20} />
          Recent Reports
        </CardTitle>
        <CardAction>
          <p className="font-semibold underline text-sky-500 cursor-pointer text-sm sm:text-base">
            View All
          </p>
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentReports.map((report, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row md:items-center gap-4 justify-between bg-gray-100 rounded-lg p-3 border"
          >
            {/* Icon */}
            <div className="bg-violet-500/10 text-violet-500 rounded-lg p-2 self-start md:self-center hidden md:block">
              <CgLoadbarDoc size={30} />
            </div>

            {/* Text */}
            <div className="flex items-start flex-1 gap-1 ">
              <div className="bg-violet-500/10 text-violet-500 rounded-lg p-2 self-start md:self-center block md:hidden">
                <CgLoadbarDoc size={30} />
              </div>
              <div className="flex flex-col items-end md:items-start flex-1 gap-1">
                <h3 className="text-base sm:text-lg font-semibold">
                  {report.title}
                </h3>
                <div className="flex  sm:items-center gap-2 gap-6 sm:gap-4">
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <LuUserRound size={15} />
                    {report.person}
                  </p>
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <LuCalendar size={15} />
                    {report.date}
                  </p>
                </div>
              </div>
            </div>
            {/* Buttons */}
            <div className="flex flex-row  items-stretch md:items-end gap-2 w-full md:w-auto">
              <Button
                variant="outline"
                className="border-2 border-black h-8 text-xs sm:text-sm flex-1 md:flex-none"
              >
                Add Notes
              </Button>
              <Button
                variant="outline"
                className="border-2 border-black h-8 text-xs sm:text-sm flex-1 md:flex-none"
              >
                View
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default RecentReports;
