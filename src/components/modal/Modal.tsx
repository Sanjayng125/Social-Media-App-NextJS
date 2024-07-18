"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Comment, imageProps, PostPageProps } from "@/types";
import { FaShare } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { BiSend } from "react-icons/bi";
import Wrapper from "./Wrapper";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { format } from "timeago.js";
import Like from "../Like";
import Spinner2 from "../loader/Spinner2";

export default function Modal({
  posts,
  postComments,
  getPostComments,
  commentsLoading,
  loading,
}: {
  posts: PostPageProps | null;
  postComments: Comment[];
  getPostComments: () => void;
  commentsLoading: boolean;
  loading: boolean;
}) {
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  const newComment = async () => {
    if (comment === "") {
      return;
    }
    if (!session?.user) {
      router.replace("/login");
    }
    try {
      const api = await fetch(`/api/comment/post/${posts?.post?._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ commentText: comment }),
      });
      const res = await api.json();

      if (res && res?.status === "success") {
        setComment("");
        getPostComments();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter" && comment !== "") {
      newComment();
    }
  };

  return (
    <Wrapper>
      {posts !== null && (
        <>
          {/* Post */}
          <div className="border-r-2 border-white w-[65%] h-full flex flex-col justify-between">
            {loading && (
              <h1 className="w-full text-center text-xl font-semibold">
                Loading...
              </h1>
            )}
            <div className="w-full bg-white bg-opacity-70 h-full flex items-center overflow-hidden dark:bg-slate-800 dark:bg-opacity-65">
              <Swiper
                pagination={{ type: "fraction" }}
                centeredSlides={true}
                className="w-full"
              >
                {posts !== null &&
                  posts?.post?.images.map((imgSrc: imageProps, i: number) => (
                    <SwiperSlide
                      key={i}
                      style={{ marginBlock: "auto" }}
                      className="overflow-hidden relative"
                    >
                      <div className="w-full h-[300px] max-w-[400px]">
                        <Image
                          src={imgSrc.url}
                          alt={""}
                          fill
                          className="object-contain"
                          priority
                        />
                      </div>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
            <div className="bg-white w-full p-4 flex justify-between items-center dark:bg-slate-900">
              <h1 className="sm:text-2xl font-bold truncate">
                {posts?.post?.caption}
              </h1>
              <div className="flex gap-3 items-center relative">
                <Like id={posts.post?._id || ""} />
                <div className="border rounded-full flex justify-center items-center cursor-pointer p-2">
                  <FaShare
                    className="text-xl"
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      setCopied(true);
                      setTimeout(() => {
                        setCopied(false);
                      }, 2000);
                    }}
                  />
                </div>
                {copied && (
                  <p className="absolute right-0 z-10 rounded-md bg-green-500 p-2">
                    copied!
                  </p>
                )}
              </div>
            </div>
          </div>
          {/* comment */}
          <div className="bg-white flex flex-col overflow-y-auto w-[35%] h-full dark:bg-slate-600">
            <h1 className="px-2 font-semibold max-sm:text-sm">Comments</h1>
            <div className="w-full flex my-1 border-y border-y-white">
              <input
                type="text"
                className="w-full bg-black bg-opacity-10 outline-none text-[8px] sm:text-sm px-1"
                placeholder="Comment Something..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                className="bg-black bg-opacity-10 p-1 px-2 sm:px-4 border-l border-l-white disabled:opacity-50"
                onClick={() => newComment()}
                disabled={commentsLoading || comment === ""}
              >
                {commentsLoading ? (
                  <Spinner2 width={15} height={15} border={2} />
                ) : (
                  <BiSend />
                )}
              </button>
            </div>
            {(!postComments || postComments.length <= 0) && (
              <h1 className="font-semibold text-center max-sm:text-sm">
                No Comments Yet
              </h1>
            )}
            {commentsLoading && (
              <div className="w-full flex justify-center mt-2">
                <Spinner2 width={40} height={40} border={2} />
              </div>
            )}
            {postComments?.length > 0 &&
              postComments?.map((comment, i) => (
                <div className="flex flex-col" key={i}>
                  <div className="w-full flex justify-between items-center pl-1 pr-2">
                    <div className="flex items-center gap-1">
                      <Image
                        src={comment.commentBy.avatar.url || "/noavatar.png"}
                        alt=""
                        width={28}
                        height={28}
                        className="w-7 h-7 sm:w-9 sm:h-9 rounded-full object-cover"
                      />
                      <span className="text-sm sm:text-lg font-semibold truncate">
                        {comment.commentBy.username}
                      </span>
                    </div>
                    <span className="text-[8px] sm:text-xs">
                      {format(comment.createdAt)}
                    </span>
                  </div>
                  <p
                    className="w-full px-2 text-xs sm:text-sm"
                    style={{ wordBreak: "break-all" }}
                  >
                    {comment.commentText}
                  </p>
                </div>
              ))}
          </div>
        </>
      )}
    </Wrapper>
  );
}
