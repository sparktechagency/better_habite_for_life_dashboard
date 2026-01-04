import React from "react";
import PostDetails from "@/components/common/communityCommentReply/PostDetails";

export default async function page({ params }) {
  // Handle params - in Next.js 15+ params is a Promise, in earlier versions it's an object
  const resolvedParams = params instanceof Promise ? await params : params;
  const postId = resolvedParams?.id;

  return (
    <div className="p-4">
      <PostDetails postId={postId} />
    </div>
  );
}
