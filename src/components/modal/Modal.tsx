"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Comment, imageProps, PostPageProps } from "@/types";
import { FaHeart, FaShare } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { BiSend } from "react-icons/bi";
import Wrapper from "./Wrapper";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { format } from "timeago.js";
import Like from "../like/Like";

export default function Modal2({
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
      {loading && (
        <h1 className="w-full text-center text-xl font-semibold text-white">
          Loading...
        </h1>
      )}
      {posts !== null && (
        <>
          {/* Post */}
          <div className="border-r-2 border-white w-[65%] h-full flex flex-col justify-between">
            <div className="w-full bg-purple-300 h-full flex items-center overflow-hidden">
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
                          // layout="fill"
                          // objectFit="contain" // Changed to "contain" to fit the image inside the container
                          fill
                          className="object-contain"
                          priority
                        />
                      </div>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
            <div className="bg-purple-400 text-white w-full p-4 flex justify-between items-center">
              <h1 className="text-2xl font-bold">{posts?.post?.caption}</h1>
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
          <div className="bg-slate-500 flex flex-col overflow-y-auto w-[35%] h-full">
            <h1 className="px-2 font-semibold max-sm:text-sm">Comments:</h1>
            <div className="w-full flex my-1 border-y border-y-white">
              <input
                type="text"
                className="w-full bg-slate-600 text-white outline-none text-[8px] sm:text-sm px-1"
                placeholder="Comment Something..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                className="bg-slate-600 p-1 px-2 sm:px-4 border-l border-l-white disabled:opacity-50"
                onClick={() => newComment()}
                disabled={commentsLoading || comment === ""}
              >
                {commentsLoading ? (
                  <Image
                    src={"/small-spinner.gif"}
                    alt=""
                    width={25}
                    height={25}
                  />
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
                <Image
                  src={"/small-spinner.gif"}
                  alt=""
                  width={40}
                  height={40}
                />
              </div>
            )}
            {postComments?.length > 0 &&
              postComments?.map((comment, i) => (
                <div className="flex flex-col" key={i}>
                  <div className="w-full flex justify-between items-center pl-1 pr-2">
                    <div className="flex items-center gap-1 p-2">
                      <Image
                        src={comment.commentBy.avatar.url || "/noavatar.png"}
                        alt=""
                        width={28}
                        height={28}
                        className="w-[20px] h-[20px] sm:w-[27px] sm:h-[27px] rounded-full object-cover"
                      />
                      <span className="text-[8px] sm:text-sm">
                        {comment.commentBy.username}
                      </span>
                    </div>
                    <span className="text-[8px] sm:text-xs">
                      {format(comment.createdAt)}
                    </span>
                  </div>
                  <p
                    className="w-full px-2 text-[11px] sm:text-sm"
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
