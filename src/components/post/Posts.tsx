"use client";

import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { Post } from "@/types";
import { useInView } from "react-intersection-observer";
import Spinner2 from "../loader/Spinner2";

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  //loadmore
  const { ref, inView } = useInView();
  const [startIndex, setStartIndex] = useState(5);
  const [hasMore, setHasMore] = useState(true);

  const getPosts = async () => {
    try {
      setLoading(true);
      const api = await fetch("/api/getPosts?limit=5");
      const res = await api.json();

      setPosts(res.posts);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!posts?.length) {
      getPosts();
    } else {
      setLoading(false);
    }
  }, []);

  //loadmore
  useEffect(() => {
    const getPosts = async () => {
      try {
        setLoading(true);
        const api = await fetch(
          "/api/getPosts?startIndex=" + startIndex + "&limit=5"
        );
        const res = await api.json();

        setPosts((prev) => [...prev, ...res.posts]);
        setStartIndex(startIndex + res.posts.length);
        setHasMore(res.posts.length >= 5);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    if (inView && !loading && hasMore) {
      getPosts();
    }
  }, [inView]);

  return (
    <div className="w-full max-md:min-h-full flex flex-col gap-3 items-center mt-3 bg-white text-black dark:text-white md:rounded-lg dark:bg-transparent">
      {posts && posts.length <= 0 && !loading && (
        <h1 className="text-xl text-center">No Grams Yet!...</h1>
      )}
      {/* {loading && <h1 className="text-xl text-center">Loading...</h1>} */}
      {posts.map((post, i) => (
        <PostCard postDetails={post} key={i} />
      ))}
      {/* loadmore */}
      {!hasMore && !loading && (
        <h1 className="text-xl text-center mb-2">No More Posts!...</h1>
      )}
      {hasMore && (
        <div className="flex justify-center my-1" ref={ref}>
          <Spinner2 width={40} height={40} border={3} />
        </div>
      )}
    </div>
  );
};

export default Posts;
