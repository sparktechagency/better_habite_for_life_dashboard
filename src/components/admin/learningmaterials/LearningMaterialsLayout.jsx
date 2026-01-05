"use client";
import SmallPageInfo from "@/components/common/SmallPageInfo";
import React, { useCallback, useState } from "react";
import RecentCourses from "./RecentCourses";
import { Button } from "@/components/ui/button";
import { HiPlus } from "react-icons/hi";

import AddNewMaterialModal from "./AddNewMaterialModal";

function LearningMaterialsLayout() {
  const [openAddNewMaterialModal, setOpenAddNewMaterialModal] = useState(false);
  const handleOpenAddNewMaterialModal = useCallback(() => {
    setOpenAddNewMaterialModal(true);
  }, []);
  const handleCloseAddNewMaterialModal = useCallback(() => {
    setOpenAddNewMaterialModal(false);
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <SmallPageInfo
          title="Learning Materials"
          description="Here is an overview of your learning materials"
        />
        <div className="flex items-center gap-2">
          <Button className="" onClick={handleOpenAddNewMaterialModal}>
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
        <RecentCourses id={1} />
        <RecentCourses id={2} />
        <RecentCourses id={3} />
        <RecentCourses id={4} />
        <RecentCourses id={5} />
        <RecentCourses id={6} />
        <RecentCourses id={7} />
        <RecentCourses id={8} />
        <RecentCourses id={9} />
        <RecentCourses id={10} />
        <RecentCourses id={11} />
        <RecentCourses id={12} />
      </div>

      <AddNewMaterialModal
        openModal={openAddNewMaterialModal}
        setOpenModal={handleCloseAddNewMaterialModal}
      />
    </div>
  );
}

export default LearningMaterialsLayout;
