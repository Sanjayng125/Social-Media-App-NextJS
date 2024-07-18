"use client";
import Spinner2 from "@/components/loader/Spinner2";
import PostCard from "@/components/post/PostCard";
import { PostPageProps } from "@/types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const PostPage = ({ params }: { params: { id: string } }) => {
  const [posts, setPosts] = useState<PostPageProps | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const getPosts = async () => {
    try {
      setLoading(true);
      const api = await fetch(`/api/getPosts/${params.id}?similarPosts=true`);
      const res = await api.json();

      setPosts(res);
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
        {loading && (
          // <h1 className="text-center text-xl font-semibold">Loading...</h1>
          <Spinner2 width={50} height={50} border={3} />
        )}
        {!loading && posts === null && (
          <h1 className="text-center text-xl font-semibold">
            Post Not Found! {params.id}
          </h1>
        )}
        {posts !== null && <PostCard postDetails={posts.post} />}
        {posts !== null &&
          posts?.similarPosts?.length > 0 &&
          posts?.similarPosts?.map((post, i) => (
            <PostCard postDetails={post} key={i} />
          ))}
      </div>
    </div>
  );
};

export default PostPage;
