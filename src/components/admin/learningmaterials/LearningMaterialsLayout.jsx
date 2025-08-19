import SmallPageInfo from "@/components/common/SmallPageInfo";
import React from "react";
import RecentCourses from "./RecentCourses";

function LearningMaterialsLayout() {
  return (
    <div className="space-y-4">
      <SmallPageInfo
        title="Learning Materials"
        description="Here is an overview of your learning materials"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <RecentCourses />
        <RecentCourses />
        <RecentCourses />
        <RecentCourses />
      </div>
    </div>
  );
}

export default LearningMaterialsLayout;
