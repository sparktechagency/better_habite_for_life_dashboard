import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TbFileSearch } from "react-icons/tb";
import { LuCalendar, LuUserRound } from "react-icons/lu";
import { CgLoadbarDoc } from "react-icons/cg";
import { Button } from "@/components/ui/button";
import { TbEye } from "react-icons/tb";
import { FiEdit3 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
function RecentArticles({ recentArticles }) {
  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <CardTitle className="flex items-center gap-2">
          <TbFileSearch size={20} />
          Recent Articles
        </CardTitle>
        <CardAction>
          <p className="font-semibold underline text-sky-500 cursor-pointer text-sm sm:text-base">
            View All
          </p>
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentArticles.map((article, index) => (
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
                  {article.title}
                </h3>
                <div className="flex  sm:items-center gap-2 gap-6 sm:gap-4">
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <LuUserRound size={15} />
                    {article.person}
                  </p>
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <LuCalendar size={15} />
                    {article.date}
                  </p>
                </div>
              </div>
            </div>
            {/* Buttons */}
            <div className="flex flex-row  items-stretch md:items-end gap-2 w-full md:w-auto">
              <Button className="">
                <TbEye size={30} />
              </Button>
              <Button className="">
                <FiEdit3 size={30} />
              </Button>
              <Button className="">
                <RiDeleteBin6Line size={30} />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default RecentArticles;
