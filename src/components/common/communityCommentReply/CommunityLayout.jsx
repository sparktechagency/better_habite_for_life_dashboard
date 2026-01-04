"use client";

import { useState, useCallback } from "react";

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
import CreateNewPostModal from "./CreateNewModal";
import PostCard from "./PostCard";

export default function CommunityLayout() {
  const [openCreateNewPostModal, setOpenCreateNewPostModal] = useState(false);
  const handleOpenCreateNewPostModal = useCallback(() => {
    setOpenCreateNewPostModal(true);
  }, []);

  const handleCloseCreateNewPostModal = useCallback((value) => {
    setOpenCreateNewPostModal(value);
  }, []);

  return (
    <div className="min-h-screen space-y-4  ">
      <div className="max-w-full mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <SmallPageInfo
            title="Post Management"
            description="Here is an overview of  post from the users"
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
            <Button onClick={handleOpenCreateNewPostModal}>
              <HiPlus size={15} /> Add New Community Post
            </Button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
      </div>
      <CreateNewPostModal
        openModal={openCreateNewPostModal}
        setOpenModal={handleCloseCreateNewPostModal}
        handleCloseCreateNewPostModal={handleCloseCreateNewPostModal}
      />
    </div>
  );
}
