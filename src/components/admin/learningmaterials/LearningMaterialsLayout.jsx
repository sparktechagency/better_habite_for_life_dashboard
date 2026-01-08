"use client";
import SmallPageInfo from "@/components/common/SmallPageInfo";
import React, { useCallback, useState } from "react";
import RecentCourses from "./RecentCourses";
import { Button } from "@/components/ui/button";
import { HiPlus } from "react-icons/hi";

import AddNewMaterialModal from "./AddNewMaterialModal";
import { useGetCourseDataQuery } from "@/redux/Apis/admin/courseApi/courseApi";
function LearningMaterialsLayout() {
  const [openAddNewMaterialModal, setOpenAddNewMaterialModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(8); // show 8 cards per page
  const handleOpenAddNewMaterialModal = useCallback(() => {
    setOpenAddNewMaterialModal(true);
  }, []);
  const handleCloseAddNewMaterialModal = useCallback(() => {
    setOpenAddNewMaterialModal(false);
  }, []);

  const { data: courseData, isLoading: isCourseLoading } =
    useGetCourseDataQuery({ page: currentPage, limit });

  const courses = courseData?.data || [];
  const paginationMeta = courseData?.meta || {
    page: 1,
    limit,
    total: 0,
    totalPage: 1,
  };

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
        <h1 className="text-lg font-bold">Recently Uploaded Courses</h1>
        <p className="font-semibold underline text-sky-500 cursor-pointer text-sm sm:text-base">
          View All
        </p>
      </div>

      {isCourseLoading ? (
        <div className="text-center py-12 text-gray-500">
          Loading courses...
        </div>
      ) : courses.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No courses available.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {courses.map((course) => (
              <RecentCourses key={course._id} course={course} />
            ))}
          </div>

          {paginationMeta.totalPage > 1 && (
            <div className="flex items-center justify-center gap-2 py-4">
              <Button
                variant="outline"
                className="bg-gray-100 text-gray-600 border-gray-300 h-9"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              >
                Previous
              </Button>
              <span className="text-sm text-gray-600">
                Page {paginationMeta.page} of {paginationMeta.totalPage}
              </span>
              <Button
                variant="outline"
                className="bg-gray-100 text-gray-600 border-gray-300 h-9"
                disabled={currentPage === paginationMeta.totalPage}
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.min(paginationMeta.totalPage, prev + 1)
                  )
                }
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}

      <AddNewMaterialModal
        openModal={openAddNewMaterialModal}
        setOpenModal={handleCloseAddNewMaterialModal}
      />
    </div>
  );
}

export default LearningMaterialsLayout;
