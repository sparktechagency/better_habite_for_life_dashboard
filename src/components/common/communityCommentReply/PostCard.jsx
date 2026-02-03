"use client";
import React from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
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

function PostCard({ post }) {
  const router = useRouter();
  const [highlightPost, { isLoading }] = useHighlightPostMutation();
  const { success, error } = useToast();
  const handleCardClick = () => {
    router.push(`/admin/community/post/${post._id}`);
  };

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

  return (
    <>
      <Card
        className="border-none shadow-xs hover:cursor-pointer"
        onClick={handleCardClick}
      >
        <CardHeader>
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
        <CardContent>
          <p className="text-sm text-gray-500">
            {post?.description?.length > 350
              ? post.description.slice(0, 350) + "..."
              : post?.description}
          </p>

          {post.description.length > 350 && (
            <Link href={`/admin/community/post/${post._id}`}>
              <span className="text-sm text-black hover:font-bold hover:underline flex items-center gap-2 mt-2">
                Read More <LuArrowRight size={15} />
              </span>
            </Link>
          )}
        </CardContent>
        <CardFooter className="border-t border-transparent h-8 flex items-center gap-x-4 relative">
          <div className="absolute top-0 right-0 border-t border-gray-200 w-[90%] h-full left-1/2 -translate-x-1/2"></div>
          <p className="flex items-center gap-2">
            <GoHeart size={20} className="text-red-500" />
            <span className="text-sm text-gray-500">{post.likesCount}</span>
          </p>
          <p className="flex items-center gap-2">
            <BiCommentDetail size={20} className="text-gray-500" />
            <span className="text-sm text-gray-500">{post.commentsCount}</span>
          </p>
        </CardFooter>
      </Card>
    </>
  );
}

export default PostCard;
