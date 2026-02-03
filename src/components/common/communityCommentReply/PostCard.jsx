"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardAction,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { BiCommentDetail } from "react-icons/bi";
import { PiHighlighterFill } from "react-icons/pi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GoHeart } from "react-icons/go";
import formatDate from "@/utils/FormatDate/formatDate";
import { getImageUrl } from "@/utils/getImageUrl";
import useToast from "@/hooks/useToast";
import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";
import { useHighlightPostMutation } from "@/redux/Apis/admin/postApi/postApi";
import { Trash2 } from "lucide-react";
import { useDeletePostMutation } from "@/redux/Apis/admin/postApi/postApi";
import DeleteConfirmationModal from "../deleteconfirmation/deleteConfirmationModal";
import { Button } from "@/components/ui/button";

function PostCard({ post }) {
  const router = useRouter();
  const [highlightPost, { isLoading }] = useHighlightPostMutation();
  const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation();
  const { success, error } = useToast();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const postUrl = `/admin/community/post/${post._id}`;

  console.log(post);

  const handleHighlightPost = async (e) => {
    e.stopPropagation();
    try {
      const response = await highlightPost({ postId: post._id }).unwrap();
      if (response.success) {
        success(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteClick = (e) => {
    // e.stopPropagation();
    setOpenDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await deletePost({ id: post._id }).unwrap();
      if (response?.success) {
        success(response?.message || "Post deleted successfully");
        setOpenDeleteModal(false);
      } else {
        error(response?.message || "Failed to delete post");
      }
    } catch (err) {
      error(err?.data?.message || err?.message || "Failed to delete post");
    } finally {
      setOpenDeleteModal(false);
    }
  };

  return (
    <>
      <Card className="border-none shadow-xs group">
        <CardHeader>
          <div
            className="cursor-pointer min-w-0"
            onClick={() => router.push(postUrl)}
            onKeyDown={(e) => e.key === "Enter" && router.push(postUrl)}
            role="button"
            tabIndex={0}
          >
            <CardTitle className="flex items-center gap-2">
              <Avatar className="size-10">
                <AvatarImage
                  src={getImageUrl(
                    post?.userId?.profile,
                    "/admin/article/adhd.png"
                  )}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium">
                  {post?.userId?.fullName}
                </span>
                <span className="text-xs text-gray-500">
                  {formatDate(post?.createdAt)}
                </span>
              </div>
            </CardTitle>
          </div>

          <CardAction
            className="border border-gray-200 rounded-full p-1 hover:bg-gray-100 hover:scale-110 transition-all duration-300 cursor-pointer"
            onClick={handleHighlightPost}
          >
            <PiHighlighterFill
              size={20}
              className={` ${
                post?.highlights === true ? "text-yellow-500" : "text-gray-300"
              }`}
            />
          </CardAction>
        </CardHeader>
        <div
          className="cursor-pointer px-6"
          onClick={() => router.push(postUrl)}
          onKeyDown={(e) => e.key === "Enter" && router.push(postUrl)}
          role="button"
          tabIndex={0}
        >
          <CardContent className="px-0">
            <p className="text-sm text-gray-500">
              {post?.description?.length > 350
                ? post.description.slice(0, 350) + "..."
                : post?.description}
            </p>

            {post?.description?.length > 350 && (
              <span className="text-sm text-black hover:font-bold hover:underline flex items-center gap-2 mt-2">
                Read More <LuArrowRight size={15} />
              </span>
            )}
          </CardContent>
        </div>
        <CardFooter className="border-t border-transparent h-8 flex items-center gap-x-4 relative group">
          {/* <div className="absolute top-0 right-0 border-t border-gray-200 w-[90%] h-full left-1/2 -translate-x-1/2"></div> */}
          <div className="flex items-center gap-2 justify-between w-full border-t border-gray-200 pt-2">
            <div className="flex items-center gap-2">
              <p className="flex items-center gap-2">
                <GoHeart size={20} className="text-red-500" />
                <span className="text-sm text-gray-500">{post.likesCount}</span>
              </p>
              <p className="flex items-center gap-2">
                <BiCommentDetail size={20} className="text-gray-500" />
                <span className="text-sm text-gray-500">
                  {post.commentsCount}
                </span>
              </p>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="flex items-center justify-center rounded-lg group-hover:visible invisible cursor-pointer hover:bg-red-50 p-1 -m-1"
              onClick={handleDeleteClick}
              aria-label="Delete post"
            >
              <Trash2 size={20} className="text-red-500" />
            </Button>
          </div>
        </CardFooter>
      </Card>
      <DeleteConfirmationModal
        openModal={openDeleteModal}
        setOpenModal={setOpenDeleteModal}
        onConfirm={handleConfirmDelete}
        body="Are you sure you want to delete this post? This action cannot be undone."
        title="Delete Post"
        isLoading={isDeleting}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </>
  );
}

export default PostCard;
