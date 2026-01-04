"use client";
import SmallPageInfo from "@/components/common/SmallPageInfo";
import React, { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { HiPlus } from "react-icons/hi";
import AddArticleModal from "./AddArticleModal";
import ArticleCard from "./articleCard";

function ArticleManagementLayout() {
  const [openAddArticleModal, setOpenAddArticleModal] = useState(false);

  const handleOpenAddArticleModal = useCallback(() => {
    setOpenAddArticleModal(true);
  }, []);
  const handleCloseAddArticleModal = useCallback(() => {
    setOpenAddArticleModal(false);
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <SmallPageInfo
          title="Article Management"
          description="Here is an overview of your article management"
        />
        <div className="flex items-center gap-2">
          <Button className="" onClick={handleOpenAddArticleModal}>
            <HiPlus /> Upload Articles
          </Button>
        </div>
      </div>
      {/* <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold">Recntly Uploaded Articles</h1>
        <p className="font-semibold underline text-sky-500 cursor-pointer text-sm sm:text-base">
          View All
        </p>
      </div> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
      </div>

      <AddArticleModal
        openModal={openAddArticleModal}
        setOpenModal={handleCloseAddArticleModal}
      />
    </div>
  );
}

export default ArticleManagementLayout;
