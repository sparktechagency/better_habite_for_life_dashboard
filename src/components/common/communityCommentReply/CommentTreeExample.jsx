"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  MessageCircle,
  Heart,
  Reply,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function CommentNode({ comment, depth = 0, onReply, onLike, onToggleLike }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const hasReplies = comment.replies && comment.replies.length > 0;
  const maxDepth = 6;

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return "just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="group">
      <div
        className="flex gap-3 py-3"
        style={{ marginLeft: `${Math.min(depth * 24, maxDepth * 24)}px` }}
      >
        {/* Avatar */}
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarImage
            src={comment.author.avatar || "https://github.com/shadcn.png"}
            alt={comment.author.name}
          />
          <AvatarFallback className="text-xs">
            {getInitials(comment.author.name)}
          </AvatarFallback>
        </Avatar>

        {/* Comment Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-sm">{comment.author.name}</span>
            {comment.author.username && (
              <span className="text-muted-foreground text-xs">
                @{comment.author.username}
              </span>
            )}
            <span className="text-muted-foreground text-xs">
              {formatTimestamp(comment.timestamp)}
            </span>
          </div>

          {/* Comment text */}
          <div className="text-sm text-foreground mb-2 leading-relaxed">
            {comment.content}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2 text-muted-foreground hover:text-foreground"
              onClick={() => onToggleLike?.(comment.id)}
            >
              <Heart
                className={`h-3 w-3 mr-1 ${
                  comment.isLiked ? "fill-red-500 text-red-500" : ""
                }`}
              />
              {comment.likes || 0}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2 text-muted-foreground hover:text-foreground"
              onClick={() => onReply?.(comment.id)}
            >
              <Reply className="h-3 w-3 mr-1" />
              Reply
            </Button>

            {hasReplies && (
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-muted-foreground hover:text-foreground ml-2"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? (
                  <ChevronDown className="h-3 w-3 mr-1" />
                ) : (
                  <ChevronRight className="h-3 w-3 mr-1" />
                )}
                {comment.replies?.length}{" "}
                {comment.replies?.length === 1 ? "reply" : "replies"}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Replies */}
      {hasReplies && isExpanded && depth < maxDepth && (
        <div className="relative">
          {/* Connection line */}
          <div
            className="absolute top-0 bottom-0 w-px bg-border"
            style={{ left: `${Math.min(depth * 24, maxDepth * 24) + 16}px` }}
          />

          {comment.replies?.map((reply) => (
            <CommentNode
              key={reply.id}
              comment={reply}
              depth={depth + 1}
              onReply={onReply}
              onLike={onLike}
              onToggleLike={onToggleLike}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function CommentTreeExample({
  comments,
  onReply,
  onLike,
  onToggleLike,
  className = "",
}) {
  if (!comments || comments.length === 0) {
    return (
      <div
        className={`flex flex-col items-center justify-center py-8 text-muted-foreground ${className}`}
      >
        <MessageCircle className="h-8 w-8 mb-2" />
        <p className="text-sm">No comments yet</p>
      </div>
    );
  }

  return (
    <div className={`divide-y divide-border ${className}`}>
      {comments.map((comment) => (
        <CommentNode
          key={comment.id}
          comment={comment}
          onReply={onReply}
          onLike={onLike}
          onToggleLike={onToggleLike}
        />
      ))}
    </div>
  );
}
