import React from "react";
import { Card, CardHeader, CardFooter } from "@/components/ui/card";

import Image from "next/image";
function ArticleCard() {
  return (
    <Card className="p-2 gap-0">
      <CardHeader className="p-2 aspect-video">
        <Image
          src="/admin/article/adhd.png"
          alt="Article"
          width={300}
          height={300}
          className="w-full h-full object-cover rounded-lg aspect-video"
        />
      </CardHeader>

      <CardFooter className="flex items-start justify-between ps-2 ">
        <div>
          <h1 className="text-lg font-bold">What is ADHD?</h1>{" "}
          <p className="text-sm text-gray-500 font-medium">
            Dr. Rizaldy Ferrer
          </p>
          <p className="text-sm text-gray-500">10 minutes read</p>
        </div>
        <p className="text-sm text-gray-500">2025-01-01</p>
      </CardFooter>
    </Card>
  );
}

export default ArticleCard;
