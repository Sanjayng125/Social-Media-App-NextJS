"use client";
import React, { use, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Spinner2 from "../loader/Spinner2";
import { Post } from "@/types";
import PostCard from "../postCard/PostCard";

export default function LoadMore() {
  const { ref, inView } = useInView();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [startIndex, setStartIndex] = useState(3);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const getPosts = async () => {
      try {
        setLoading(true);
        const api = await fetch(
          "/api/getPosts?startIndex=" + startIndex + "&limit=3"
        );
        const res = await api.json();

        setPosts((prev) => [...prev, ...res.posts]);
        setStartIndex(startIndex + res.posts.length);
        setHasMore(res.posts.length > 0);
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
    <>
      {posts.map((post, i) => (
        <PostCard postDetails={post} key={i} />
      ))}
      {!hasMore && !loading && (
        <h1 className="text-xl text-center mb-2">No More Posts!...</h1>
      )}
      {hasMore && (
        <div className="flex justify-center my-1" ref={ref}>
          <Spinner2 width={40} height={40} border={3} />
        </div>
      )}
    </>
  );
}
