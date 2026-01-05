"use client";
import SmallPageInfo from "@/components/common/SmallPageInfo";
import React, { useState } from "react";
import { HiPlus } from "react-icons/hi";
import { LuPencilLine } from "react-icons/lu";
import { HiTrash } from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import SearchFilterButton from "@/components/common/SearchFilterButton";
import Image from "next/image";
import CategoryAddEditModal from "./CategoryAddEditModal";

function CategoryManagementLayout() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editCategoryData, setEditCategoryData] = useState(null);

  const handleAddClick = () => {
    setIsEditMode(false);
    setEditCategoryData(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (categoryData) => {
    setIsEditMode(true);
    setEditCategoryData(categoryData);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <SmallPageInfo
          title="Category Management"
          description="Here is an overview of your category management"
        />
        <Button
          className="bg-black hover:bg-black/80 text-white"
          onClick={handleAddClick}
        >
          <HiPlus /> Add Category
        </Button>
      </div>
      <CategorySection onEditClick={handleEditClick} />
      <CategoryAddEditModal
        openModal={isModalOpen}
        setOpenModal={setIsModalOpen}
        isEdit={isEditMode}
        categoryData={editCategoryData}
      />
    </div>
  );
}

export default CategoryManagementLayout;

const CategorySection = ({ onEditClick }) => {
  // Mock category data - in real app, this would come from props or API
  const categories = [
    { id: 1, name: "Category Name", iconUrl: "/admin/category/cat_1.ico" },
    { id: 2, name: "Category Name", iconUrl: "/admin/category/cat_1.ico" },
    { id: 3, name: "Category Name", iconUrl: "/admin/category/cat_1.ico" },
    { id: 4, name: "Category Name", iconUrl: "/admin/category/cat_1.ico" },
    { id: 5, name: "Category Name", iconUrl: "/admin/category/cat_1.ico" },
    { id: 6, name: "Category Name", iconUrl: "/admin/category/cat_1.ico" },
    { id: 7, name: "Category Name", iconUrl: "/admin/category/cat_1.ico" },
    { id: 8, name: "Category Name", iconUrl: "/admin/category/cat_1.ico" },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md space-y-4">
      <p className="text-lg font-bold">Uploaded Category</p>
      <SearchFilterButton showAddButton={false} showFilterButton={false} />
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            onEditClick={onEditClick}
          />
        ))}
      </div>
    </div>
  );
};

const CategoryCard = ({ category, onEditClick }) => {
  const handleEdit = (e) => {
    e.stopPropagation();
    onEditClick(category);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    // Handle delete logic here
    console.log("Delete category:", category.id);
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md group hover:shadow-lg transition-shadow relative">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold">{category.name}</h1>
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={handleEdit}
            className="text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
          >
            <LuPencilLine />
          </button>
          <button
            onClick={handleDelete}
            className="text-gray-500 hover:text-red-400 transition-colors cursor-pointer"
          >
            <HiTrash />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <Image
          src={category.iconUrl}
          alt={category.name}
          width={100}
          height={100}
          className="w-20 h-20 object-cover rounded-full"
        />
      </div>
    </div>
  );
};
