"use client";
import { Post } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Search = () => {
  const queryParams = useSearchParams();
  const router = useRouter();
  const [show, setShow] = useState("posts");
  const [posts, setPosts] = useState([]);
  const [peoples, setPeoples] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (queryParams.get("q") === null || queryParams.get("q") === "") {
      router.push("/explore");
    }
    if (
      show !== "" &&
      queryParams.get("q") !== "" &&
      queryParams.get("q") !== null
    ) {
      getSearch();
    }
  }, [show, queryParams.get("q")]);

  const getSearch = async () => {
    const query = queryParams.get("q");
    const showMenu = show;

    try {
      setLoading(true);
      const api = await fetch(`/api/search?show=${showMenu}&q=${query}`);
      const res = await api.json();

      if (res?.posts) {
        setPosts(res.posts);
      } else if (res?.peoples) {
        setPeoples(res.peoples);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-purple-300 h-full p-2 md:rounded overflow-y-auto dark:bg-white dark:bg-opacity-10">
      <div className="flex gap-2 mb-2">
        <button
          className={`border-2 rounded-3xl px-2 py-1 transition-all duration-150 ${
            show === "posts"
              ? "text-black bg-purple-300 shadow-lg dark:bg-slate-900 dark:text-white dark:shadow-white dark:shadow-sm"
              : "text-white bg-purple-400 dark:bg-transparent"
          }`}
          onClick={() => {
            setShow("posts");
          }}
        >
          Posts
        </button>
        <button
          className={`border-2 rounded-3xl px-2 py-1 transition-all duration-150 ${
            show === "peoples"
              ? "text-black bg-purple-300 shadow-lg dark:bg-slate-900 dark:text-white dark:shadow-white dark:shadow-sm"
              : "text-white bg-purple-400 dark:bg-transparent"
          }`}
          onClick={() => {
            setShow("peoples");
          }}
        >
          People
        </button>
      </div>
      <hr />
      {show === "posts" && (
        <div className="w-full mt-2">
          {loading && (
            <h2 className="text-xl text-center font-semibold">Loading...</h2>
          )}
          {!loading && posts.length === 0 && (
            <h2 className="text-xl text-center font-semibold">
              Posts Not Found!
            </h2>
          )}
          <div className="w-full gap-0 columns-3">
            {posts?.map((post: Post, i) => (
              <div key={i} className="">
                <Link href={`/post/${post?._id}`}>
                  <Image
                    src={post.images[0].url}
                    alt=""
                    width={100}
                    height={100}
                    className="w-full border aspect-square"
                    priority
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
      {show === "peoples" && (
        <div className="w-full mt-2 p-2">
          {loading && (
            <h2 className="text-xl text-center font-semibold">Loading...</h2>
          )}
          {!loading && peoples.length === 0 && (
            <h2 className="text-xl text-center font-semibold">
              User Not Found!
            </h2>
          )}
          <div className="w-full grid grid-cols-2 gap-2">
            {peoples?.map((user: any, i) => (
              <Link
                href={`/user/${user?._id}`}
                key={i}
                className="w-full flex items-center gap-2 border rounded-md p-2 shadow-md bg-purple-400 dark:bg-slate-800"
              >
                <Image
                  src={user.avatar.url || "/noavatar.png"}
                  alt="avatar"
                  width={30}
                  height={30}
                  className="rounded-full w-[40px] h-[40px] object-cover shadow-lg"
                />
                <p className="font-medium">{user.username}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
