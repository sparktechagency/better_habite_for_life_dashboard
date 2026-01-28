"use client";
import SmallPageInfo from "@/components/common/SmallPageInfo";
import React, { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { HiPlus } from "react-icons/hi";
import AddArticleModal from "./AddArticleModal";
import ArticleCard from "./articleCard";
import { useGetArticleDataQuery } from "@/redux/Apis/admin/articleApi/articleApi";

function ArticleManagementLayout() {
  const [openAddArticleModal, setOpenAddArticleModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(12);

  const handleOpenAddArticleModal = useCallback(() => {
    setOpenAddArticleModal(true);
  }, []);
  const handleCloseAddArticleModal = useCallback(() => {
    setOpenAddArticleModal(false);
  }, []);

  const { data: articleData, isLoading: isArticleLoading } =
    useGetArticleDataQuery({ page: currentPage, limit });

  const articles = articleData?.data || [];
  const paginationMeta = articleData?.meta || {
    page: 1,
    limit,
    total: 0,
    totalPage: 1,
  };

  const renderPaginationButtons = () => {
    const { totalPage } = paginationMeta;
    const buttons = [];

    if (totalPage <= 7) {
      for (let i = 1; i <= totalPage; i++) {
        buttons.push(
          <Button
            key={i}
            variant="outline"
            className={`h-8 w-8 ${
              currentPage === i
                ? "bg-orange-500 text-white border-orange-500"
                : "bg-gray-100 text-gray-600 border-gray-300"
            }`}
            onClick={() => setCurrentPage(i)}
          >
            {i}
          </Button>
        );
      }
    } else {
      buttons.push(
        <Button
          key={1}
          variant="outline"
          className={`h-8 w-8 ${
            currentPage === 1
              ? "bg-orange-500 text-white border-orange-500"
              : "bg-gray-100 text-gray-600 border-gray-300"
          }`}
          onClick={() => setCurrentPage(1)}
        >
          1
        </Button>
      );

      if (currentPage > 3) {
        buttons.push(
          <span key="ellipsis1" className="px-2 text-gray-600">
            ...
          </span>
        );
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPage - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (i !== 1 && i !== totalPage) {
          buttons.push(
            <Button
              key={i}
              variant="outline"
              className={`h-8 w-8 ${
                currentPage === i
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-gray-100 text-gray-600 border-gray-300"
              }`}
              onClick={() => setCurrentPage(i)}
            >
              {i}
            </Button>
          );
        }
      }

      if (currentPage < totalPage - 2) {
        buttons.push(
          <span key="ellipsis2" className="px-2 text-gray-600">
            ...
          </span>
        );
      }

      if (totalPage > 1) {
        buttons.push(
          <Button
            key={totalPage}
            variant="outline"
            className={`h-8 w-8 ${
              currentPage === totalPage
                ? "bg-orange-500 text-white border-orange-500"
                : "bg-gray-100 text-gray-600 border-gray-300"
            }`}
            onClick={() => setCurrentPage(totalPage)}
          >
            {totalPage}
          </Button>
        );
      }
    }

    return buttons;
  };

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

      {isArticleLoading ? (
        <div className="text-center py-12 text-gray-500">
          Loading articles...
        </div>
      ) : articles.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No articles available.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {articles.map((article) => (
              <ArticleCard key={article._id} article={article} />
            ))}
          </div>

          {/* Pagination */}
          {paginationMeta.totalPage > 1 && (
            <div className="flex items-center justify-center gap-2 py-4 border-t">
              <Button
                variant="outline"
                className="bg-gray-100 text-gray-600 border-gray-300 h-8"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              >
                Previous
              </Button>
              <div className="flex items-center gap-1">
                {renderPaginationButtons()}
              </div>
              <Button
                variant="outline"
                className="bg-orange-500 text-white border-orange-500 hover:bg-orange-600 h-8"
                disabled={currentPage === paginationMeta.totalPage}
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.min(paginationMeta.totalPage, prev + 1)
                  )
                }
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}

      <AddArticleModal
        openModal={openAddArticleModal}
        setOpenModal={handleCloseAddArticleModal}
      />
    </div>
  );
}

export default ArticleManagementLayout;
