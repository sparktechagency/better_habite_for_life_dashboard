import SmallPageInfo from "@/components/common/SmallPageInfo";
import React from "react";
import RecentCourses from "./RecentCourses";
import RecentArticles from "./RecentArticles";
import { Button } from "@/components/ui/button";
import { HiPlus } from "react-icons/hi";

function LearningMaterialsLayout() {
  const recentArticles = [
    {
      title: "Article 1",
      person: "John Doe",
      date: "2025-08-17",
    },
    {
      title: "Article 1",
      person: "John Doe",
      date: "2025-08-17",
    },
    {
      title: "Article 1",
      person: "John Doe",
      date: "2025-08-17",
    },
  ];
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <SmallPageInfo
          title="Learning Materials"
          description="Here is an overview of your learning materials"
        />
        <div className="flex items-center gap-2">
          <Button className="">
            <HiPlus /> Upload Articles
          </Button>
          <Button className="">
            <HiPlus /> Upload Course Media
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold">Recntly Uploaded Courses</h1>
        <p className="font-semibold underline text-sky-500 cursor-pointer text-sm sm:text-base">
          View All
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <RecentCourses />
        <RecentCourses />
        <RecentCourses />
        <RecentCourses />
      </div>
      <RecentArticles recentArticles={recentArticles} />
    </div>
  );
}

export default LearningMaterialsLayout;
