"use client";
import React, { useState } from "react";
import BackButton from "@/components/common/backButton/backButton";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit3 } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LuClock4 } from "react-icons/lu";
import { PiUsersBold } from "react-icons/pi";
import { MdOutlineReviews } from "react-icons/md";
import AddNewMaterialModal from "./AddNewMaterialModal";

function MeaterialDeatilsLayout() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Mock material data - in real app, this would come from props or API
  const materialData = {
    id: 1,
    title: "Overcoming Workplace Anxiety",
    description:
      "This course is designed to help you overcome workplace anxiety and stress. It covers a range of topics related to workplace anxiety and stress, including stress management, workplace anxiety, and mental health.",
    tags: ["Stress Management", "Workplace Anxiety", "Mental Health"],
    imageUrl: null, // You can add image URL if available
    videoUrl: "/admin/materials/material_1.mp4",
  };

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

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
            className="bg-transparent border-none shadow-none p-0 hover:scale-110 "
          >
            <RiDeleteBin6Line size={15} className="text-red-500" />
          </Button>
        </div>
      </div>
      <MaterialDetailsSection />
      <AddNewMaterialModal
        openModal={isEditModalOpen}
        setOpenModal={setIsEditModalOpen}
        isEdit={true}
        materialData={materialData}
      />
    </div>
  );
}

export default MeaterialDeatilsLayout;

const MaterialDetailsSection = () => {
  const information = {
    title: "Overcoming Workplace Anxiety",
    duration: "2.5 Hours",
    tags: ["Stress Management", "Workplace Anxiety", "Mental Health"],
    information: [
      {
        icon: <LuClock4 size={20} />,
        value: "2.5 Hours",
      },
      {
        icon: <PiUsersBold size={20} />,
        value: "10 Students",
      },
      {
        icon: <MdOutlineReviews size={20} />,
        value: "10 Reviews",
      },
    ],
    description:
      "This course is designed to help you overcome workplace anxiety and stress. It covers a range of topics related to workplace anxiety and stress, including stress management, workplace anxiety, and mental health.",
  };
  return (
    <div className="space-y-4 px-3">
      <div className="w-full h-[25rem] rounded-lg overflow-hidden ">
        <video
          src="/admin/materials/material_1.mp4"
          controls
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold">
          Title: Overcoming Workplace Anxiety
        </p>
        <span className="text-sm text-gray-500 py-1.5 px-2 bg-gray-300 rounded-md">
          2.5 Hours
        </span>
      </div>
      <Badge>Stress Management</Badge>
      <div className="space-y-2">
        <p className="text-lg font-semibold">Information:</p>
        <div className="flex items-center gap-2">
          {information.information.map((item, index) => (
            <Badge
              key={index}
              variant=""
              className="flex items-center gap-1 h-8 font-medium"
            >
              {item.icon}
              {item.value}
            </Badge>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-lg font-semibold">Description:</p>
        <p className="text-sm text-gray-500">{information.description}</p>
      </div>
    </div>
  );
};
