"use client";
import SmallPageInfo from "@/components/common/SmallPageInfo";
import React, { useState } from "react";
import { HiPlus } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import SearchFilterButton from "@/components/common/SearchFilterButton";
import TargetDomainAddEditModal from "./TargetDomainAddEditModal";
import TargetDomainTable from "./TargetDomainTable";
import {
  useDeleteTargetDomainMutation,
  useGetTargetDomainDataQuery,
} from "@/redux/Apis/admin/targetdomainApi/targetdomainApi";
import DeleteConfirmationModal from "@/components/common/deleteconfirmation/deleteConfirmationModal";
import useToast from "@/hooks/useToast";

function TargetDomainLayout() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editTargetDomainData, setEditTargetDomainData] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteTargetDomainData, setDeleteTargetDomainData] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(12);
  const toast = useToast();

  const { data: targetDomainData, isLoading: isTargetDomainLoading } =
    useGetTargetDomainDataQuery({ page: currentPage, limit, searchText });
  const [deleteTargetDomain, { isLoading: isDeleting }] =
    useDeleteTargetDomainMutation();

  const handleAddClick = () => {
    setIsEditMode(false);
    setEditTargetDomainData(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (targetDomainData) => {
    setIsEditMode(true);
    setEditTargetDomainData(targetDomainData);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (targetDomainData) => {
    setDeleteTargetDomainData(targetDomainData);
    setIsDeleteModalOpen(true);
  };

  const handleSearchChange = (value) => {
    setSearchText(value);
    setCurrentPage(1);
  };

  const handleConfirmDelete = async () => {
    if (!deleteTargetDomainData?._id) return;
    try {
      const response = await deleteTargetDomain({
        id: deleteTargetDomainData._id,
      }).unwrap();
      if (response?.success) {
        toast.success(response.message || "Target domain deleted successfully");
      } else {
        toast.error(response?.message || "Failed to delete target domain");
      }
    } catch (error) {
      const errorMessage =
        error?.data?.message ||
        error?.message ||
        "Failed to delete target domain";
      toast.error(errorMessage);
      console.error("Delete target domain error:", error);
    } finally {
      setIsDeleteModalOpen(false);
      setDeleteTargetDomainData(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <SmallPageInfo
          title="Target Domain Management"
          description="Here is an overview of your target domain management"
        />
        <Button
          className="bg-black hover:bg-black/80 text-white"
          onClick={handleAddClick}
        >
          <HiPlus /> Add Target Domain
        </Button>
      </div>
      <TargetDomainSection
        onEditClick={handleEditClick}
        targetDomainData={targetDomainData}
        isLoading={isTargetDomainLoading}
        paginationMeta={
          targetDomainData?.meta || { page: 1, limit, total: 0, totalPage: 1 }
        }
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onDeleteClick={handleDeleteClick}
        searchText={searchText}
        onSearchChange={handleSearchChange}
      />
      <TargetDomainAddEditModal
        openModal={isModalOpen}
        setOpenModal={setIsModalOpen}
        isEdit={isEditMode}
        targetDomainData={editTargetDomainData}
      />
      <DeleteConfirmationModal
        openModal={isDeleteModalOpen}
        setOpenModal={setIsDeleteModalOpen}
        body={`Are you sure you want to delete "${
          deleteTargetDomainData?.name || "this target domain"
        }"? This action cannot be undone.`}
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
        title="Delete Target Domain"
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}

export default TargetDomainLayout;

const TargetDomainSection = ({
  onEditClick,
  onDeleteClick,
  targetDomainData,
  isLoading,
  paginationMeta,
  currentPage,
  setCurrentPage,
  searchText,
  onSearchChange,
}) => {
  const targetDomains = targetDomainData?.data || [];

  const renderPaginationButtons = () => {
    const { totalPage } = paginationMeta;
    const buttons = [];

    if (totalPage <= 7) {
      // Show all pages if 7 or fewer
      for (let i = 1; i <= totalPage; i++) {
        buttons.push(
          <Button
            key={i}
            variant="outline"
            className={`h-8 w-8 ${
              currentPage === i
                ? "bg-orange-500 text-white border-orange-500"
                : "bg-gray-100 text-gray-600 border-gray-300"
            }`}
            onClick={() => setCurrentPage(i)}
          >
            {i}
          </Button>
        );
      }
    } else {
      // Show first page
      buttons.push(
        <Button
          key={1}
          variant="outline"
          className={`h-8 w-8 ${
            currentPage === 1
              ? "bg-orange-500 text-white border-orange-500"
              : "bg-gray-100 text-gray-600 border-gray-300"
          }`}
          onClick={() => setCurrentPage(1)}
        >
          1
        </Button>
      );

      // Show ellipsis and pages around current page
      if (currentPage > 3) {
        buttons.push(
          <span key="ellipsis1" className="px-2 text-gray-600">
            ...
          </span>
        );
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPage - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (i !== 1 && i !== totalPage) {
          buttons.push(
            <Button
              key={i}
              variant="outline"
              className={`h-8 w-8 ${
                currentPage === i
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-gray-100 text-gray-600 border-gray-300"
              }`}
              onClick={() => setCurrentPage(i)}
            >
              {i}
            </Button>
          );
        }
      }

      if (currentPage < totalPage - 2) {
        buttons.push(
          <span key="ellipsis2" className="px-2 text-gray-600">
            ...
          </span>
        );
      }

      // Show last page
      if (totalPage > 1) {
        buttons.push(
          <Button
            key={totalPage}
            variant="outline"
            className={`h-8 w-8 ${
              currentPage === totalPage
                ? "bg-orange-500 text-white border-orange-500"
                : "bg-gray-100 text-gray-600 border-gray-300"
            }`}
            onClick={() => setCurrentPage(totalPage)}
          >
            {totalPage}
          </Button>
        );
      }
    }

    return buttons;
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md space-y-4">
      <p className="text-lg font-bold">Uploaded Target Domain</p>
      <SearchFilterButton
        showAddButton={false}
        showFilterButton={false}
        searchText={searchText}
        setSearchText={onSearchChange}
        placeholder="Search by target domain name.."
      />
      <TargetDomainTable
        domains={targetDomains}
        isLoading={isLoading}
        onEdit={onEditClick}
        onDelete={onDeleteClick}
      />

      {/* Pagination */}
      {paginationMeta.totalPage > 1 && (
        <div className="flex items-center justify-center gap-2 py-4 border-t">
          <Button
            variant="outline"
            className="bg-gray-100 text-gray-600 border-gray-300 h-8"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          >
            Previous
          </Button>
          <div className="flex items-center gap-1">
            {renderPaginationButtons()}
          </div>
          <Button
            variant="outline"
            className="bg-orange-500 text-white border-orange-500 hover:bg-orange-600 h-8"
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
    </div>
  );
};
