"use client";
import React, { useState, useRef, useCallback } from "react";
import BackButton from "@/components/common/backButton/backButton";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit3 } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LuClock4 } from "react-icons/lu";
import { PiUsersBold } from "react-icons/pi";
import { MdOutlineReviews } from "react-icons/md";
import { AiFillStar } from "react-icons/ai";
import AddNewMaterialModal from "./AddNewMaterialModal";
import { getImageUrl } from "@/utils/getImageUrl";
import { useParams } from "next/navigation";
import {
  useGetCourseByIdQuery,
  useDeleteCourseMutation,
} from "@/redux/Apis/admin/courseApi/courseApi";
import DeleteConfirmationModal from "@/components/common/deleteconfirmation/deleteConfirmationModal";
import useToast from "@/hooks/useToast";
import { useRouter } from "next/navigation";

function MeaterialDeatilsLayout() {
  const params = useParams();
  const router = useRouter();
  const materialId = params.id; // param name matches [id] folder
  const toast = useToast();

  const { data: courseResponse, isLoading } = useGetCourseByIdQuery({
    id: materialId,
  });
  const [deleteCourse, { isLoading: isDeleting }] = useDeleteCourseMutation();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Extract course data from response
  const courseData = courseResponse?.data?.data || null;
  const reviewRating = courseResponse?.data?.reviewRating || [];

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await deleteCourse({ id: materialId }).unwrap();
      if (response?.success) {
        toast.success(response.message || "Course deleted successfully");
        router.push("/admin/learning-management");
      } else {
        toast.error(response?.message || "Failed to delete course");
      }
    } catch (error) {
      const errorMessage =
        error?.data?.message || error?.message || "Failed to delete course";
      toast.error(errorMessage);
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  // Prepare material data for edit modal
  const materialDataForEdit = courseData
    ? {
        _id: courseData._id,
        title: courseData.title,
        description: courseData.description,
        categoryId: courseData.categoryId,
        imageUrl: courseData.thumbnail,
        videoUrl: courseData.video,
      }
    : null;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-gray-500">Loading course details...</p>
      </div>
    );
  }

  if (!courseData) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-gray-500">Course not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <BackButton showText={true} text="Course Material Details" />
        <div>
          <Button
            variant="outline"
            className="bg-transparent border-none shadow-none hover:bg-transparent px-0 hover:scale-105"
            onClick={handleEditClick}
          >
            <FiEdit3 size={15} />
            Edit Course Material
          </Button>
          <Button
            variant="outline"
            className="bg-transparent border-none shadow-none p-0 hover:scale-110"
            onClick={handleDeleteClick}
          >
            <RiDeleteBin6Line size={15} className="text-red-500" />
          </Button>
        </div>
      </div>
      <MaterialDetailsSection
        courseData={courseData}
        reviewRating={reviewRating}
      />
      <AddNewMaterialModal
        openModal={isEditModalOpen}
        setOpenModal={setIsEditModalOpen}
        isEdit={true}
        materialData={materialDataForEdit}
      />
      <DeleteConfirmationModal
        openModal={isDeleteModalOpen}
        setOpenModal={setIsDeleteModalOpen}
        body={`Are you sure you want to delete "${
          courseData?.title || "this course"
        }"? This action cannot be undone.`}
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
        title="Delete Course"
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}

export default MeaterialDeatilsLayout;

const MaterialDetailsSection = ({ courseData, reviewRating }) => {
  const [videoDuration, setVideoDuration] = useState(null);
  const videoRef = useRef(null);

  // Calculate total reviews
  const totalReviews = reviewRating.reduce((sum, item) => sum + item.count, 0);

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Format video duration from seconds to HH:MM:SS or MM:SS
  const formatDuration = (seconds) => {
    if (!seconds || isNaN(seconds)) return "N/A";

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  };

  // Handle video metadata loaded to get duration
  const handleLoadedMetadata = useCallback(() => {
    if (videoRef.current) {
      setVideoDuration(videoRef.current.duration);
    }
  }, []);

  return (
    <div className="space-y-4 px-3">
      {/* Video Player */}
      <div className="w-full h-[25rem] rounded-lg overflow-hidden bg-black">
        {courseData.video ? (
          <video
            ref={videoRef}
            src={getImageUrl(courseData.video)}
            controls
            controlsList="nodownload noplaybackrate"
            disablePictureInPicture
            onContextMenu={(e) => e.preventDefault()}
            className="w-full h-full object-contain rounded-lg"
            poster={getImageUrl(courseData.thumbnail)}
            onLoadedMetadata={handleLoadedMetadata}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No video available
          </div>
        )}
      </div>

      {/* Title and Category */}
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold">Title: {courseData.title}</p>
        {courseData.categoryName && (
          <span className="text-sm text-gray-500 py-1.5 px-2 bg-gray-300 rounded-md">
            {courseData.categoryName}
          </span>
        )}
      </div>

      {/* Rating Badge */}
      <div className="flex items-center gap-2">
        <Badge className="flex items-center gap-1">
          <AiFillStar className="text-yellow-400" />
          {courseData.ratings?.toFixed(1) || "0.0"}
        </Badge>
      </div>

      {/* Information Section */}
      <div className="space-y-2">
        <p className="text-lg font-semibold">Information:</p>
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="" className="flex items-center gap-1 h-8 font-medium">
            <LuClock4 size={20} />
            {videoDuration ? formatDuration(videoDuration) : "Loading..."}
          </Badge>
          <Badge variant="" className="flex items-center gap-1 h-8 font-medium">
            <PiUsersBold size={20} />
            {courseData.viewCount || 0} Views
          </Badge>
          <Badge variant="" className="flex items-center gap-1 h-8 font-medium">
            <MdOutlineReviews size={20} />
            {totalReviews} Reviews
          </Badge>
        </div>
        <p className="text-xs text-gray-400">
          Created: {formatDate(courseData.createdAt)}
        </p>
      </div>

      {/* Description Section */}
      <div className="space-y-2">
        <p className="text-lg font-semibold">Description:</p>
        <p className="text-sm text-gray-500 whitespace-pre-line">
          {courseData.description || "No description available"}
        </p>
      </div>

      {/* Review Ratings Breakdown */}
      {reviewRating.length > 0 && (
        <div className="space-y-2">
          <p className="text-lg font-semibold">Rating Breakdown:</p>
          <div className="space-y-1">
            {reviewRating
              .slice()
              .reverse()
              .map((item) => (
                <div key={item.rating} className="flex items-center gap-2">
                  <span className="text-sm w-16 flex items-center gap-1">
                    {item.rating} <AiFillStar className="text-yellow-400" />
                  </span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-400 rounded-full"
                      style={{
                        width:
                          totalReviews > 0
                            ? `${(item.count / totalReviews) * 100}%`
                            : "0%",
                      }}
                    />
                  </div>
                  <span className="text-sm text-gray-500 w-8">
                    {item.count}
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
