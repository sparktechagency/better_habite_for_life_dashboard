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
import { useGetPostByIdQuery } from "@/redux/Apis/admin/postApi/postApi";
import { useParams } from "next/navigation";
import { getImageUrl } from "@/utils/getImageUrl";
import formatDate from "@/utils/FormatDate/formatDate";

// Recursive component to render nested replies
const ReplyItem = ({ reply, depth = 0 }) => {
  const [showNestedReplies, setShowNestedReplies] = useState(false);

  const replyUser = reply.userId || {};
  const replyUserName = replyUser.fullName || "Unknown User";
  const replyUserAvatar = getImageUrl(
    replyUser.avatar,
    "/admin/article/adhd.png"
  );
  const replyLikesCount = reply.likesCount || 0;
  const nestedReplies = reply.commentsReply || [];

  // Limit depth for visual purposes (max 3 levels of nesting)
  const maxDepth = 3;
  const currentDepth = Math.min(depth, maxDepth);

  return (
    <div className="space-y-3">
      <div className="flex items-start gap-3">
        <Avatar className={depth === 0 ? "size-8" : "size-6"}>
          <AvatarImage
            src={getImageUrl(replyUser.avatar, "/admin/article/adhd.png")}
          />
          <AvatarFallback>
            {replyUserName.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-1">
          <p
            className={
              depth === 0 ? "text-xs font-medium" : "text-[11px] font-medium"
            }
          >
            {replyUserName}
          </p>
          <p
            className={
              depth === 0
                ? "text-xs text-gray-700"
                : "text-[11px] text-gray-600"
            }
          >
            {reply.message}
          </p>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <FaThumbsUp
                size={depth === 0 ? 12 : 10}
                className="text-gray-400"
              />
              <span
                className={
                  depth === 0
                    ? "text-xs text-gray-400"
                    : "text-[10px] text-gray-400"
                }
              >
                {replyLikesCount}
              </span>
            </div>
            {nestedReplies.length > 0 && (
              <button
                onClick={() => setShowNestedReplies(!showNestedReplies)}
                className="flex items-center gap-1 text-[10px] text-gray-500 hover:text-gray-700 transition-colors underline"
              >
                {showNestedReplies ? "Hide" : "View"} replies (
                {nestedReplies.length})
                {showNestedReplies ? (
                  <ChevronUp size={12} />
                ) : (
                  <ChevronDown size={12} />
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Nested Replies */}
      {showNestedReplies && nestedReplies.length > 0 && (
        <div
          className="ml-6 space-y-3 border-l-2 border-gray-100 pl-3"
          style={{
            marginLeft: `${Math.min(currentDepth + 1, maxDepth) * 16}px`,
          }}
        >
          {nestedReplies.map((nestedReply) => (
            <ReplyItem
              key={nestedReply._id}
              reply={nestedReply}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

function PostDetails() {
  const params = useParams();
  const postId = params.id;
  const {
    data: postResponse,
    isLoading,
    error,
  } = useGetPostByIdQuery({ id: postId });

  // Extract post data from response - API returns single object in data
  const postData = postResponse?.data || null;

  const [visibleCommentsCount, setVisibleCommentsCount] = useState(3);
  const [expandedReplies, setExpandedReplies] = useState(new Set());

  // Extract comments from post data
  const allComments = postData?.comments || [];
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

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading post details...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Failed to load post details</p>
      </div>
    );
  }

  // Not found state
  if (!postData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Post not found</p>
      </div>
    );
  }

  // Extract user info
  const author = postData.userId || {};
  const authorName = author.fullName || "Unknown User";
  const authorAddress = author.address || "Unknown Location";

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
                  <AvatarImage
                    src={getImageUrl(author.avatar, "/admin/article/adhd.png")}
                  />
                  <AvatarFallback>
                    {authorName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-base font-medium">{authorName}</span>
                  <span className="text-sm text-gray-500">
                    {formatDate(postData.createdAt)}
                  </span>
                </div>
              </div>
              {/* Highlights Post Badge */}
              {postData.highlights && (
                <div className="flex items-center gap-2 bg-yellow-100 text-yellow-800 px-3 py-1.5 rounded-full">
                  <PiHighlighterFill size={16} className="text-yellow-600" />
                  <span className="text-xs font-medium">Highlights Post</span>
                </div>
              )}
            </div>

            {/* Post Content */}
            <div className="space-y-4">
              <p className="text-base text-gray-700 whitespace-pre-line">
                {postData.description || "No content available"}
              </p>
            </div>

            {/* Engagement Metrics */}
            <div className="flex items-center gap-6 pt-4 border-t">
              <div className="flex items-center gap-2">
                <GoHeart size={20} className="text-red-500 fill-red-500" />
                <span className="text-sm text-gray-700">
                  {postData.likesCount || 0}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <BiCommentDetail size={20} className="text-gray-500" />
                <span className="text-sm text-gray-700">
                  {postData.commentsCount || 0}
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
                {postData.commentsCount || 0} Comments
              </h2>
            </div>

            {/* Scrollable Comments List */}
            <div className="flex-1 overflow-y-auto pr-2 space-y-4 min-h-0">
              {allComments.length === 0 ? (
                <div className="flex items-center justify-center py-8">
                  <p className="text-gray-500">No comments yet</p>
                </div>
              ) : (
                <>
                  {commentsToShow.map((comment) => {
                    const isRepliesExpanded = expandedReplies.has(comment._id);
                    const commentUser = comment.userId || {};
                    const commentUserName =
                      commentUser.fullName || "Unknown User";
                    const commentReplies = comment.commentsReply || [];
                    const likesCount = comment.likesCount || 0;

                    return (
                      <div key={comment._id} className="space-y-3">
                        <div className="flex items-start gap-3">
                          <Avatar className="size-10">
                            <AvatarImage
                              src={getImageUrl(
                                commentUser.avatar,
                                "/admin/article/adhd.png"
                              )}
                            />
                            <AvatarFallback>
                              {commentUserName.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-2">
                            <div>
                              <p className="text-sm font-medium">
                                {commentUserName}
                              </p>
                              <p className="text-sm text-gray-700 mt-1">
                                {comment.message}
                              </p>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-2">
                                <FaThumbsUp
                                  size={14}
                                  className="text-gray-500"
                                />
                                <span className="text-xs text-gray-500">
                                  {likesCount}
                                </span>
                              </div>
                              {commentReplies.length > 0 && (
                                <button
                                  onClick={() => toggleReplies(comment._id)}
                                  className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 transition-colors underline"
                                >
                                  View replies ({commentReplies.length})
                                  {isRepliesExpanded ? (
                                    <ChevronUp size={14} />
                                  ) : (
                                    <ChevronDown size={14} />
                                  )}
                                </button>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Replies Section - Now handles nested replies recursively */}
                        {isRepliesExpanded && commentReplies.length > 0 && (
                          <div className="ml-12 space-y-4 border-l-2 border-gray-200 pl-4">
                            {commentReplies.map((reply) => (
                              <ReplyItem
                                key={reply._id}
                                reply={reply}
                                depth={0}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {/* Load More Comments Button */}
                  {hasMoreComments && (
                    <div className="flex justify-center">
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
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default PostDetails;
