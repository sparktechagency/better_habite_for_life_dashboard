"use client";

import { useState, useCallback } from "react";

import SmallPageInfo from "../SmallPageInfo";
import { Button } from "@/components/ui/button";
import { HiPlus } from "react-icons/hi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CreateNewPostModal from "./CreateNewModal";
import PostCard from "./PostCard";
import { useGetPostDataQuery } from "@/redux/Apis/admin/postApi/postApi";

export default function CommunityLayout() {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(12);
  const [filter, setFilter] = useState("popular");

  const {
    data: postsResponse,
    isLoading,
    error,
  } = useGetPostDataQuery({
    page: currentPage,
    limit: limit,
    filter: filter,
  });

  // Handle filter change
  const handleFilterChange = (value) => {
    setFilter(value);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const [openCreateNewPostModal, setOpenCreateNewPostModal] = useState(false);
  const handleOpenCreateNewPostModal = useCallback(() => {
    setOpenCreateNewPostModal(true);
  }, []);

  const handleCloseCreateNewPostModal = useCallback((value) => {
    setOpenCreateNewPostModal(value);
  }, []);

  // Extract data from response
  const posts = postsResponse?.data || [];
  const meta = postsResponse?.meta || {};
  const totalPages = meta?.totalPage || 1;

  // Pagination handlers
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="min-h-screen space-y-4">
      <div className="max-w-full mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <SmallPageInfo
            title="Post Management"
            description="Here is an overview of post from the users"
          />
          <div className="flex items-center gap-2">
            <Select value={filter} onValueChange={handleFilterChange}>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Popular</SelectItem>
                <SelectItem value="highlights">Highlights</SelectItem>
                <SelectItem value="recent">Recent</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleOpenCreateNewPostModal}>
              <HiPlus size={15} /> Add New Community Post
            </Button>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <p className="text-gray-500">Loading posts...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="flex items-center justify-center py-12">
          <p className="text-red-500">Failed to load posts</p>
        </div>
      )}

      {/* Posts Grid */}
      {!isLoading && !error && posts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {posts.map((post) => (
            <PostCard key={post._id || post.id} post={post} />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && posts.length === 0 && (
        <div className="flex items-center justify-center py-12">
          <p className="text-gray-500">No posts found</p>
        </div>
      )}

      {/* Pagination */}
      {!isLoading && posts.length > 0 && totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </Button>

          {getPageNumbers().map((page, index) =>
            page === "..." ? (
              <span key={`ellipsis-${index}`} className="px-2 text-gray-500">
                ...
              </span>
            ) : (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => handlePageClick(page)}
                className="min-w-[40px]"
              >
                {page}
              </Button>
            )
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}

      <CreateNewPostModal
        openModal={openCreateNewPostModal}
        setOpenModal={handleCloseCreateNewPostModal}
        handleCloseCreateNewPostModal={handleCloseCreateNewPostModal}
      />
    </div>
  );
}
