import React from "react";
import PostCard from "../postCard/PostCard";
import { Post } from "@/types";

const Posts = (posts: { posts: Post[] }) => {
  return (
    <div className="w-full max-md:min-h-full flex flex-col gap-3 items-center mt-3 bg-purple-400 p-3 md:rounded-lg dark:bg-white dark:bg-opacity-10">
      {posts.posts.map((post, i) => (
        <PostCard postDetails={post} key={i} />
      ))}
    </div>
  );
};

export default Posts;
