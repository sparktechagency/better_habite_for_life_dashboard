"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { Rating, RatingButton } from "@/components/ui/shadcn-io/rating";
import { VscEye } from "react-icons/vsc";
import { getImageUrl } from "@/utils/getImageUrl";
import { Badge } from "@/components/ui/badge";

function RecentCourses({ course }) {
  const router = useRouter();

  const handleCardClick = () => {
    if (course?._id) {
      router.push(`/admin/learning-management/materials/${course._id}`);
    }
  };

  const title = course?.title || "Untitled Course";
  const category = course?.categoryName || "Uncategorized";
  const viewCount = course?.viewCount ?? 0;
  const ratingValue = Math.min(Math.max(course?.ratings || 0, 0), 5);

  return (
    <Card
      className="py-0 relative overflow-hidden gap-1 hover:cursor-pointer hover:shadow-lg transition-shadow"
      onClick={handleCardClick}
    >
      <CardContent className="p-0 relative h-[10rem] md:h-[12rem]">
        <Image
          src={getImageUrl(course?.thumbnail)}
          alt={title}
          width={300}
          height={300}
          className="w-full h-full object-cover"
        />
        {/* View count overlay - positioned like in the image */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 shadow-sm">
          <VscEye size={20} className="text-gray-800" />
          <span className="text-sm font-medium text-gray-700">{viewCount}</span>
          <span className="text-sm text-gray-600">View</span>
        </div>
      </CardContent>
      <CardFooter className="py-2 px-4">
        <div className="w-full space-y-1">
          <h3 className="text-lg font-semibold text-gray-900 ">{title}</h3>
          <Badge
            variant="outline"
            className="text-sm border border-white bg-pink-200 text-gray-600 w-fit"
          >
            {category}
          </Badge>
          <div className="flex items-center gap-2">
            <Rating defaultValue={ratingValue} readOnly>
              {Array.from({ length: 5 }).map((_, index) => (
                <RatingButton
                  className="text-yellow-500"
                  key={index}
                  value={index + 1}
                />
              ))}
            </Rating>
            <span className="text-sm font-semibold text-gray-700">
              {ratingValue.toFixed(1)}
            </span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

export default RecentCourses;
