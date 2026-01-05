"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { Rating, RatingButton } from "@/components/ui/shadcn-io/rating";
import { VscEye } from "react-icons/vsc";

function RecentCourses({ id = 1 }) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/admin/learning-management/materials/${id}`);
  };

  return (
    <Card
      className="py-0 relative overflow-hidden gap-1 hover:cursor-pointer hover:shadow-lg transition-shadow"
      onClick={handleCardClick}
    >
      <CardContent className="p-0 relative h-[10rem] md:h-[12rem]">
        <Image
          src="/course_thumbnail.png"
          alt="Course 1"
          width={300}
          height={300}
          className="w-full h-full object-cover"
        />
        {/* View count overlay - positioned like in the image */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 shadow-sm">
          <VscEye size={20} className="text-gray-800" />
          <span className="text-sm font-medium text-gray-700">2,453</span>
          <span className="text-sm text-gray-600">View</span>
        </div>
      </CardContent>
      <CardFooter className="py-2 px-4">
        <div className="w-full space-y-1">
          <h3 className="text-lg font-semibold text-gray-900 ">
            Overcoming Workplace Anxiety
          </h3>
          <p className="text-sm text-gray-600 ">Dr. Rizaldy Ferrer</p>
          <div className="flex items-center gap-2">
            <Rating defaultValue={4} readOnly>
              {Array.from({ length: 5 }).map((_, index) => (
                <RatingButton
                  className="text-yellow-500"
                  key={index}
                  value={index + 1}
                />
              ))}
            </Rating>
            <span className="text-sm font-semibold text-gray-700">4.3</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

export default RecentCourses;
