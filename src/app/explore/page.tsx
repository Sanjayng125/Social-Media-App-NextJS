"use client";
import { Post } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Explore = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const getPosts = async () => {
    try {
      setLoading(true);
      const api = await fetch("/api/getPosts");
      const res = await api.json();

      // console.log(res?.posts);

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
    <div className="bg-white shadow-2xl border w-full h-full md:rounded p-3 overflow-y-auto dark:bg-white dark:bg-opacity-10 dark:border-none ">
      <h1 className="text-2xl font-semibold mb-3">Explore</h1>
      <hr />
      {!loading && !posts && (
        <h1 className="text-xl font-semibold text-center">No Posts Yet!</h1>
      )}
      {loading && (
        <h1 className="text-xl font-semibold text-center">Loading...</h1>
      )}
      <div
        className="w-full rounded gap-0 columns-3 mt-3"
        // style={{
        //   display: "grid",
        //   gap: "10px",
        //   gridTemplateColumns: "repeat(auto-fit, min-max(250px, 1fr))",
        //   gridAutoRows: "200px",
        //   gridAutoFlow: "dense",
        // }}
      >
        {!loading &&
          posts &&
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
    </div>
  );
};

export default Explore;
