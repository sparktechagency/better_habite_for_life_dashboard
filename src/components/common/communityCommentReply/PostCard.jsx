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
function PostCard({ post }) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/admin/community/post/${post.id}`);
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
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{post.author}</span>
              <span className="text-xs text-gray-500">{post.date}</span>
            </div>
          </CardTitle>

          <CardAction
            className="border border-gray-200 rounded-full p-1 hover:bg-gray-100 hover:scale-110 transition-all duration-300 cursor-pointer"
            onClick={(e) => e.stopPropagation()}
          >
            <PiHighlighterFill size={20} className="text-black" />
          </CardAction>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500">{post.description}</p>
        </CardContent>
        <CardFooter className="border-t border-transparent h-8 flex items-center gap-x-4 relative">
          <div className="absolute top-0 right-0 border-t border-gray-200 w-[90%] h-full left-1/2 -translate-x-1/2"></div>
          <p className="flex items-center gap-2">
            <GoHeart size={20} className="text-red-500" />
            <span className="text-sm text-gray-500">{post.likes}</span>
          </p>
          <p className="flex items-center gap-2">
            <BiCommentDetail size={20} className="text-gray-500" />
            <span className="text-sm text-gray-500">{post.comments}</span>
          </p>
        </CardFooter>
      </Card>
    </>
  );
}

export default PostCard;
