import React from "react";
import { Card, CardHeader, CardFooter } from "@/components/ui/card";
import { getImageUrl } from "@/utils/getImageUrl";
import { useRouter } from "next/navigation";

function ArticleCard({ article }) {
  const router = useRouter();

  // Format publication date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleCardClick = () => {
    router.push(`/admin/article-management/article/${article._id}`);
  };

  return (
    <Card
      className="p-2 gap-0 cursor-pointer hover:shadow-lg transition-shadow"
      onClick={handleCardClick}
    >
      <CardHeader className="p-2 aspect-video">
        <img
          src={getImageUrl(article.image, "/admin/article/adhd.png")}
          alt={article.title}
          className="w-full h-full object-cover rounded-lg aspect-video"
          onError={(e) => {
            e.target.src = "/admin/article/adhd.png";
          }}
        />
      </CardHeader>

      <CardFooter className="flex items-start justify-between ps-2">
        <div className="flex-1 min-w-0">
          <h1 className="text-lg font-bold truncate" title={article.title}>
            {article.title}
          </h1>
          <p className="text-sm text-gray-500 font-medium truncate">
            {article.sourseName || "Unknown Author"}
          </p>
          <p className="text-sm text-gray-500">
            {article.readTime || "N/A"} read
          </p>
        </div>
        <p className="text-sm text-gray-500 whitespace-nowrap ml-2">
          {formatDate(article.createdAt)}
        </p>
      </CardFooter>
    </Card>
  );
}

export default ArticleCard;
