"use client";
import React, { useState } from "react";
import BackButton from "../backButton/backButton";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PiHighlighterFill } from "react-icons/pi";
import { GoHeart } from "react-icons/go";
import { BiCommentDetail } from "react-icons/bi";
import { FaThumbsUp } from "react-icons/fa";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

function PostDetails({ postId }) {
  // Mock post data - in real app, this would come from props or API based on postId
  // For now, we'll use mock data. Later you can fetch based on postId
  const postData = {
    author: "Aarav Sharma",
    location: "Banglore, India",
    isHighlight: true,
    intro: "This is what i learned in my recent course",
    quote1: "The whole secret of existence",
    quote2:
      "The whole secret of existence lies in the pursuit of meaning, purpose, and connection. It is a delicate dance between self-discovery, compassion for others, and embracing the ever-unfolding mysteries of life. Finding harmony in the ebb and flow of experiences, we unlock the profound beauty that resides within our shared journey.",
    likes: 16,
    comments: 24,
    totalComments: 631,
  };

  // Generate mock replies for comments
  const generateReplies = (count) => {
    const replyUsernames = [
      "user123",
      "dev_master",
      "code_lover",
      "tech_guru",
      "learner99",
      "designer_pro",
      "coder_2024",
      "tech_wizard",
    ];
    return Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      username: replyUsernames[i % replyUsernames.length],
      avatar: "https://github.com/shadcn.png",
      text: `This is reply ${i + 1} to the comment. Great insights!`,
      likes: Math.floor(Math.random() * 500) + 100,
    }));
  };

  // All available comments (mock data)
  const allComments = [
    {
      id: 1,
      username: "Rundownby",
      avatar: "https://github.com/shadcn.png",
      text: "This is incredible. I have always looked forward to your work.",
      likes: "1.2k",
      replies: 12,
      replyList: generateReplies(12),
    },
    {
      id: 2,
      username: "Dadaboyy",
      avatar: "https://github.com/shadcn.png",
      text: "Seems like I'm still a beginner, cause what!! This is huge.",
      likes: "1.8k",
      replies: 12,
      replyList: generateReplies(12),
    },
    {
      id: 3,
      username: "marvel_fanatic",
      avatar: "https://github.com/shadcn.png",
      text: "You've got to comission this man.",
      likes: "1.8k",
      replies: 12,
      replyList: generateReplies(12),
    },
    {
      id: 4,
      username: "tech_enthusiast",
      avatar: "https://github.com/shadcn.png",
      text: "Amazing insights! This really helped me understand the concept better.",
      likes: "856",
      replies: 8,
      replyList: generateReplies(8),
    },
    {
      id: 5,
      username: "learning_path",
      avatar: "https://github.com/shadcn.png",
      text: "Thank you for sharing this. It's exactly what I needed to hear today.",
      likes: "923",
      replies: 5,
      replyList: generateReplies(5),
    },
    {
      id: 6,
      username: "code_master",
      avatar: "https://github.com/shadcn.png",
      text: "This is pure gold! Can't wait to implement this in my project.",
      likes: "1.5k",
      replies: 15,
      replyList: generateReplies(15),
    },
    {
      id: 7,
      username: "design_thinking",
      avatar: "https://github.com/shadcn.png",
      text: "The way you explained this makes so much sense. Great work!",
      likes: "678",
      replies: 3,
      replyList: generateReplies(3),
    },
    {
      id: 8,
      username: "future_dev",
      avatar: "https://github.com/shadcn.png",
      text: "I've been struggling with this for weeks. Your explanation cleared everything up!",
      likes: "1.1k",
      replies: 9,
      replyList: generateReplies(9),
    },
  ];

  const [visibleCommentsCount, setVisibleCommentsCount] = useState(3);
  const [expandedReplies, setExpandedReplies] = useState(new Set());
  const commentsToShow = allComments.slice(0, visibleCommentsCount);
  const hasMoreComments = visibleCommentsCount < allComments.length;

  const handleLoadMore = () => {
    // Load 3 more comments at a time
    setVisibleCommentsCount((prev) => Math.min(prev + 3, allComments.length));
  };

  const toggleReplies = (commentId) => {
    setExpandedReplies((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(commentId)) {
        newSet.delete(commentId);
      } else {
        newSet.add(commentId);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen space-y-6 p-4">
      {/* Header with Back Button */}
      <div className="flex items-center gap-2">
        <BackButton text="Post Details" />
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Panel - Post Details */}
        <Card className="bg-white h-fit">
          <CardContent className="p-6 space-y-6">
            {/* Author Information */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="size-12">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>AS</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-base font-medium">
                    {postData.author}
                  </span>
                  <span className="text-sm text-gray-500">
                    {postData.location}
                  </span>
                </div>
              </div>
              {/* Highlights Post Badge */}
              {postData.isHighlight && (
                <div className="flex items-center gap-2 bg-yellow-100 text-yellow-800 px-3 py-1.5 rounded-full">
                  <PiHighlighterFill size={16} className="text-yellow-600" />
                  <span className="text-xs font-medium">Highlights Post</span>
                </div>
              )}
            </div>

            {/* Post Content */}
            <div className="space-y-4">
              <p className="text-base text-gray-700">{postData.intro}</p>
              <p className="text-lg font-medium text-gray-900 italic">
                &quot;{postData.quote1}&quot;
              </p>
              <p className="text-base text-gray-700 italic leading-relaxed">
                &quot;{postData.quote2}&quot;
              </p>
            </div>

            {/* Engagement Metrics */}
            <div className="flex items-center gap-6 pt-4 border-t">
              <div className="flex items-center gap-2">
                <GoHeart size={20} className="text-red-500 fill-red-500" />
                <span className="text-sm text-gray-700">{postData.likes}</span>
              </div>
              <div className="flex items-center gap-2">
                <BiCommentDetail size={20} className="text-gray-500" />
                <span className="text-sm text-gray-700">
                  {postData.comments}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right Panel - Comments Section */}
        <Card className="bg-white flex flex-col min-h-auto max-h-[calc(100vh-10rem)]">
          <CardContent className="p-6 flex flex-col h-full overflow-hidden">
            {/* Comments Header */}
            <div className="mb-4 flex-shrink-0">
              <h2 className="text-lg font-semibold">
                {postData.totalComments} Comments
              </h2>
            </div>

            {/* Scrollable Comments List */}
            <div className="flex-1 overflow-y-auto pr-2 space-y-4 min-h-0">
              {commentsToShow.map((comment) => {
                const isRepliesExpanded = expandedReplies.has(comment.id);
                return (
                  <div key={comment.id} className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Avatar className="size-10">
                        <AvatarImage src={comment.avatar} />
                        <AvatarFallback>
                          {comment.username.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-2">
                        <div>
                          <p className="text-sm font-medium">
                            {comment.username}
                          </p>
                          <p className="text-sm text-gray-700 mt-1">
                            {comment.text}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <FaThumbsUp size={14} className="text-gray-500" />
                            <span className="text-xs text-gray-500">
                              {comment.likes}
                            </span>
                          </div>
                          <button
                            onClick={() => toggleReplies(comment.id)}
                            className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 transition-colors underline"
                          >
                            View replies ({comment.replies})
                            {isRepliesExpanded ? (
                              <ChevronUp size={14} />
                            ) : (
                              <ChevronDown size={14} />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Replies Section */}
                    {isRepliesExpanded && comment.replyList && (
                      <div className="ml-12 space-y-4 border-l-2 border-gray-200 pl-4">
                        {comment.replyList.map((reply) => (
                          <div
                            key={reply.id}
                            className="flex items-start gap-3"
                          >
                            <Avatar className="size-8">
                              <AvatarImage src={reply.avatar} />
                              <AvatarFallback>
                                {reply.username.charAt(0).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 space-y-1">
                              <p className="text-xs font-medium">
                                {reply.username}
                              </p>
                              <p className="text-xs text-gray-700">
                                {reply.text}
                              </p>
                              <div className="flex items-center gap-2">
                                <FaThumbsUp
                                  size={12}
                                  className="text-gray-400"
                                />
                                <span className="text-xs text-gray-400">
                                  {reply.likes}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Load More Comments Button */}
              {hasMoreComments && (
                <div className="mt-6 flex justify-center pb-4">
                  <Button
                    variant="outline"
                    onClick={handleLoadMore}
                    className="w-full"
                  >
                    View more comments (
                    {allComments.length - visibleCommentsCount} remaining)
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default PostDetails;
