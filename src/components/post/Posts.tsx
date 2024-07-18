"use client";

import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { Post } from "@/types";
import LoadMore from "../loadMore/LoadMore";

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const getPosts = async () => {
    try {
      setLoading(true);
      const api = await fetch("/api/getPosts?limit=3");
      const res = await api.json();

      setPosts(res.posts);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="w-full max-md:min-h-full flex flex-col gap-3 items-center mt-3 bg-white text-black dark:text-white md:rounded-lg dark:bg-transparent">
      {posts && posts.length <= 0 && !loading && (
        <h1 className="text-xl text-center">No Grams Yet!...</h1>
      )}
      {/* {loading && <h1 className="text-xl text-center">Loading...</h1>} */}
      {posts.map((post, i) => (
        <PostCard postDetails={post} key={i} />
      ))}
      {posts.length > 0 && <LoadMore />}
    </div>
  );
};

export default Posts;
