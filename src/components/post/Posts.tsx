"use client";

import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { Post } from "@/types";
import { useInView } from "react-intersection-observer";
import Spinner2 from "../loader/Spinner2";
import useStore from "@/context/store";

const Posts = () => {
  const { posts, setPosts, hasMore, setHasMore } = useStore();
  const [loading, setLoading] = useState(true);

  //loadmore
  const { ref, inView } = useInView();
  const [startIndex, setStartIndex] = useState(5);

  const getPosts = async () => {
    try {
      setLoading(true);
      const api = await fetch("/api/getPosts?limit=5");
      const res = await api.json();

      setPosts(res.posts);
      setLoading(false);
      setHasMore(res.posts.length >= 5 ? true : false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (posts?.length <= 0) {
      getPosts();
    } else {
      setLoading(false);
    }
  }, [posts?.length]);

  //loadmore
  useEffect(() => {
    const getMorePosts = async () => {
      try {
        setLoading(true);
        const api = await fetch(
          "/api/getPosts?startIndex=" + startIndex + "&limit=5"
        );
        const res = await api.json();

        setPosts([...posts, ...res.posts]);
        setStartIndex(startIndex + res.posts.length);
        setHasMore(res.posts.length >= 5);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    if (inView && !loading && hasMore && posts.length > 0) {
      getMorePosts();
    }
  }, [inView, loading, hasMore, posts.length]);

  return (
    <div className="w-full max-md:min-h-full flex flex-col gap-3 items-center mt-3 bg-white text-black dark:text-white md:rounded-lg dark:bg-transparent">
      {posts && posts.length <= 0 && !loading && (
        <h1 className="text-xl text-center">No Grams Yet!...</h1>
      )}
      {/* {loading && <h1 className="text-xl text-center">Loading...</h1>} */}
      {posts && posts.map((post, i) => <PostCard postDetails={post} key={i} />)}
      {/* loadmore */}
      {!hasMore && !loading && (
        <h1 className="text-xl text-center mb-2">No More Posts!...</h1>
      )}
      {loading && posts.length <= 0 && (
        <div className="flex justify-center my-1">
          <Spinner2 width={40} height={40} border={3} />
        </div>
      )}
      {hasMore && posts.length > 0 && (
        <div className="flex justify-center my-1" ref={ref}>
          <Spinner2 width={40} height={40} border={3} />
        </div>
      )}
    </div>
  );
};

export default Posts;
