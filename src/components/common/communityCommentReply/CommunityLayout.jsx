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

  const posts = [
    {
      id: 1,
      title: "Post 1",
      description: "Post 1 description",
      author: "John Doe",
      date: "2021-01-01",
      likes: 10,
      comments: 5,
    },
    {
      id: 2,
      title: "Post 2",
      description: "Post 2 description",
      author: "Jane Doe",
      date: "2021-01-02",
      likes: 15,
      comments: 10,
    },
    {
      id: 3,
      title: "Post 3",
      description: "Post 3 description",
      author: "Jim Doe",
      date: "2021-01-03",
      likes: 20,
      comments: 15,
    },
    {
      id: 4,
      title: "Post 4",
      description: "Post 4 description",
      author: "Jill Doe",
      date: "2021-01-04",
      likes: 25,
      comments: 20,
    },
  ];

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
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      <CreateNewPostModal
        openModal={openCreateNewPostModal}
        setOpenModal={handleCloseCreateNewPostModal}
        handleCloseCreateNewPostModal={handleCloseCreateNewPostModal}
      />
    </div>
  );
}
