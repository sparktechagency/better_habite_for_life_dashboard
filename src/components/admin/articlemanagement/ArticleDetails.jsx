"use client";
import React, { useState } from "react";
import BackButton from "@/components/common/backButton/backButton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getImageUrl } from "@/utils/getImageUrl";
import { useParams, useRouter } from "next/navigation";
import {
  useGetArticleByIdQuery,
  useDeleteArticleMutation,
} from "@/redux/Apis/admin/articleApi/articleApi";
import DeleteConfirmationModal from "@/components/common/deleteconfirmation/deleteConfirmationModal";
import AddArticleModal from "./AddArticleModal";
import useToast from "@/hooks/useToast";
import { FiEdit3 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

function ArticleDetails() {
  const params = useParams();
  const router = useRouter();
  const articleId = params.id;
  const toast = useToast();

  const { data: articleResponse, isLoading } = useGetArticleByIdQuery({
    id: articleId,
  });
  const [deleteArticle, { isLoading: isDeleting }] = useDeleteArticleMutation();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Extract article data from response
  const articleData = articleResponse?.data || null;

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await deleteArticle({ id: articleId }).unwrap();
      if (response?.success) {
        toast.success(response.message || "Article deleted successfully");
        router.push("/admin/article-management");
      } else {
        toast.error(response?.message || "Failed to delete article");
      }
    } catch (error) {
      const errorMessage =
        error?.data?.message || error?.message || "Failed to delete article";
      toast.error(errorMessage);
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-gray-500">Loading article details...</p>
      </div>
    );
  }

  if (!articleData) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-gray-500">Article not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <BackButton showText={true} text="Article Details" />
        <div>
          <Button
            variant="outline"
            className="bg-transparent border-none shadow-none hover:bg-transparent px-0 hover:scale-105"
            onClick={handleEditClick}
          >
            <FiEdit3 size={15} />
            Edit Article
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

      {/* Article Content */}
      <div className="space-y-4">
        {/* Article Image */}
        <div className="w-full h-[20rem] rounded-lg overflow-hidden bg-gray-100">
          <img
            src={getImageUrl(articleData.image, "/admin/article/adhd.png")}
            alt={articleData.title}
            className="w-full h-full object-cover rounded-lg"
            onError={(e) => {
              e.target.src = "/admin/article/adhd.png";
            }}
          />
        </div>

        {/* Title, Badge, Read Time, Date */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-xl font-bold">{articleData.title}</h1>
            <Badge className="bg-red-100 text-red-600 hover:bg-red-100">
              Stress Management
            </Badge>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>{articleData.readTime || "N/A"} read</span>
          </div>
        </div>

        {/* Author */}
        <p className="text-gray-600">
          {articleData.sourseName || "Unknown Author"}
        </p>

        {/* Article Content */}
        <div className="space-y-4">
          <p className="text-gray-600 leading-relaxed whitespace-pre-line">
            {articleData.description || "No description available"}
          </p>
        </div>
      </div>

      {/* Edit Modal */}
      <AddArticleModal
        openModal={isEditModalOpen}
        setOpenModal={setIsEditModalOpen}
        isEdit={true}
        articleData={articleData}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        openModal={isDeleteModalOpen}
        setOpenModal={setIsDeleteModalOpen}
        body={`Are you sure you want to delete "${
          articleData?.title || "this article"
        }"? This action cannot be undone.`}
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
        title="Delete Article"
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}

export default ArticleDetails;
