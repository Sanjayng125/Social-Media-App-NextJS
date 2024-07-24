"use client";
import Spinner2 from "@/components/loader/Spinner2";
import PostCard from "@/components/post/PostCard";
import { Post, PostPageProps } from "@/types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { useInView } from "react-intersection-observer";

const PostPage = ({ params }: { params: { id: string } }) => {
  const [post, setPost] = useState<Post | null>(null);
  const [similarPosts, setSimilarPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  //loadmore
  const { ref, inView } = useInView();
  const [startIndex, setStartIndex] = useState(5);
  const [hasMore, setHasMore] = useState(false);

  const getPosts = async () => {
    try {
      setLoading(true);
      const api = await fetch(
        `/api/getPosts/${params.id}?similarPosts=true&limit=5`
      );
      const res = await api.json();

      setPost(res?.post);
      setSimilarPosts(res?.similarPosts);
      setHasMore(res?.similarPosts?.length >= 5);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params.id) {
      getPosts();
    }
  }, [params]);

  //loadmore
  useEffect(() => {
    const getPosts = async () => {
      try {
        setLoading(true);
        const api = await fetch(
          `/api/getPosts/${params.id}?similarPosts=true&limit=5&startIndex=${startIndex}`
        );
        const res = await api.json();

        setSimilarPosts((prev) => [...prev, ...res.similarPosts]);
        setStartIndex(startIndex + res.similarPosts.length);
        setHasMore(res.similarPosts.length >= 5);
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
    <div className="w-full bg-white shadow-2xl border h-full md:rounded overflow-y-auto dark:bg-white dark:bg-opacity-10 dark:border-none">
      <div className="w-full max-md:min-h-full flex flex-col gap-3 items-center mt-3 md:rounded-lg max-md:mb-16">
        <div className="w-full px-3">
          <button
            className="bg-black bg-opacity-10 p-1 rounded-full dark:bg-white dark:bg-opacity-10"
            onClick={() => router.back()}
          >
            <FaArrowAltCircleLeft className="text-3xl text-white dark:text-white" />
          </button>
        </div>
        <hr />
        {loading && !post && (
          // <h1 className="text-center text-xl font-semibold">Loading...</h1>
          <Spinner2 width={50} height={50} border={3} />
        )}
        {!loading && post === null && (
          <h1 className="text-center text-xl font-semibold">
            Post Not Found! {params.id}
          </h1>
        )}
        {post !== null && <PostCard postDetails={post} />}
        {similarPosts?.length > 0 &&
          similarPosts?.map((post, i) => (
            <PostCard postDetails={post} key={i} />
          ))}
        {hasMore && (
          <div className="flex justify-center my-1" ref={ref}>
            <Spinner2 width={40} height={40} border={3} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostPage;
