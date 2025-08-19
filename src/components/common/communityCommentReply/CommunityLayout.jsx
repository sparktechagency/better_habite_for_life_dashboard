"use client";

import { useState } from "react";
import CommentTreeExample from "./CommentTreeExample";
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

const initialComments = [
  {
    id: "1",
    author: {
      name: "John Doe",
      username: "johndoe",
      avatar: "/thoughtful-man.png",
    },
    content: "This is a great post! Thanks for sharing.",
    timestamp: "2 hours ago",
    likes: 5,
    isLiked: false,
    replies: [
      {
        id: "2",
        author: {
          name: "Jane Smith",
          username: "janesmith",
          avatar: "/diverse-woman-portrait.png",
        },
        content: "I totally agree! Very insightful.",
        timestamp: "1 hour ago",
        likes: 2,
        isLiked: true,
        replies: [
          {
            id: "3",
            author: {
              name: "Bob Wilson",
              username: "bobwilson",
            },
            content: "Thanks for the feedback everyone!",
            timestamp: "30 minutes ago",
            likes: 1,
            isLiked: false,
          },
        ],
      },
    ],
  },
  {
    id: "4",
    author: {
      name: "Alice Johnson",
      username: "alicej",
      avatar: "/professional-woman.png",
    },
    content: "Could you elaborate more on this topic?",
    timestamp: "3 hours ago",
    likes: 3,
    isLiked: false,
  },
];

export default function CommunityLayout() {
  const [comments, setComments] = useState(initialComments);

  const handleReply = (commentId, content) => {
    const newReply = {
      id: Date.now().toString(),
      author: {
        name: "Current User",
        username: "currentuser",
      },
      content,
      timestamp: new Date().toISOString(),
      likes: 0,
      isLiked: false,
    };

    const addReplyToComment = (comments) => {
      return comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [...(comment.replies || []), newReply],
          };
        }
        if (comment.replies) {
          return {
            ...comment,
            replies: addReplyToComment(comment.replies),
          };
        }
        return comment;
      });
    };

    setComments(addReplyToComment(comments));
  };

  const handleLike = (commentId) => {
    const toggleLike = (comments) => {
      return comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            isLiked: !comment.isLiked,
            likes: comment.isLiked
              ? (comment.likes || 0) - 1
              : (comment.likes || 0) + 1,
          };
        }
        if (comment.replies) {
          return {
            ...comment,
            replies: toggleLike(comment.replies),
          };
        }
        return comment;
      });
    };

    setComments(toggleLike(comments));
  };

  return (
    <div className="min-h-screen space-y-4  ">
      <div className="max-w-full mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <SmallPageInfo
            title="Community"
            description="Here is an overview of your community"
          />
          <div className="flex items-center gap-2">
            <Select defaultValue="latest">
              <SelectTrigger className="bg-white  ">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">Latest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <HiPlus size={15} /> Add New Community Post
            </Button>
          </div>
        </div>
        <CommentTreeExample
          className="border rounded-lg p-4 bg-white/50"
          comments={comments}
          onReply={(commentId) => {
            const content = prompt("Enter your reply:");
            if (content) handleReply(commentId, content);
          }}
          onToggleLike={handleLike}
        />
      </div>
    </div>
  );
}
