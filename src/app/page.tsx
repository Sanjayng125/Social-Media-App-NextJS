"use client";
import Posts from "@/components/posts/Posts";
import { Post } from "@/types";
import { useEffect, useState } from "react";

export default function Home() {
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
    <div className="w-full bg-purple-300 h-full md:p-2 md:rounded overflow-y-auto max-md:mb-12 dark:bg-white dark:bg-opacity-10">
      <h1 className="text-2xl font-semibold text-white mb-3 mx-2">Grams</h1>
      <hr />
      {posts && posts.length <= 0 && !loading && (
        <h1 className="text-xl text-center">No Grams Yet!...</h1>
      )}
      {loading && <h1 className="text-xl text-center">Loading...</h1>}
      {!loading && posts.length > 0 && <Posts posts={posts} />}
    </div>
  );
}
