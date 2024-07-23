"use client";
import Spinner2 from "@/components/loader/Spinner2";
import { Post } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const Explore = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  //loadmore
  const { ref, inView } = useInView();
  const [startIndex, setStartIndex] = useState(20);
  const [hasMore, setHasMore] = useState(true);

  const getPosts = async () => {
    try {
      setLoading(true);
      const api = await fetch("/api/getPosts?limit=20");
      const res = await api.json();

      // console.log(res?.posts);

      setPosts(res.posts);
      setHasMore(res.posts.length >= 20);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  //loadmore
  useEffect(() => {
    const getMorePosts = async () => {
      try {
        setLoading(true);
        const api = await fetch(
          "/api/getPosts?startIndex=" + startIndex + "&limit=20"
        );
        const res = await api.json();

        setPosts((prev) => [...prev, ...res.posts]);
        setStartIndex(startIndex + res.posts.length);
        setHasMore(res.posts.length >= 20);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    if (inView && !loading && hasMore) {
      getMorePosts();
    }
  }, [inView]);

  return (
    <div className="bg-white shadow-2xl border w-full h-full md:rounded p-3 overflow-y-auto dark:bg-white dark:bg-opacity-10 dark:border-none ">
      <h1 className="text-2xl font-semibold mb-3">Explore</h1>
      <hr />
      {!loading && !posts?.length && (
        <h1 className="text-xl font-semibold text-center">No Posts Yet!</h1>
      )}
      {/* {loading && (
        <div className="w-full flex justify-center mt-2">
          <Spinner2 width={50} height={50} border={3} />
        </div>
      )} */}
      <div className="w-full rounded gap-0 columns-3 mt-3">
        {posts &&
          posts?.length > 0 &&
          posts.map((post: Post, i: number) => (
            <div key={i}>
              <Link href={`/post/${post._id}`}>
                <Image
                  src={post.images[0].url}
                  alt=""
                  width={100}
                  height={100}
                  className="w-full h-auto object-cover hover:scale-105 transition-all duration-200"
                  quality={100}
                />
              </Link>
            </div>
          ))}
      </div>
      {/* loadmore */}
      {hasMore && (
        <div className="flex justify-center my-1" ref={ref}>
          <Spinner2 width={40} height={40} border={3} />
        </div>
      )}
    </div>
  );
};

export default Explore;
