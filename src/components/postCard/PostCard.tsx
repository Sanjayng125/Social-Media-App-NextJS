import { Comment, imageProps, Post } from "@/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaShare, FaWindowClose } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { BiSend } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { format } from "timeago.js";
import Like from "../like/Like";
import Spinner2 from "../loader/Spinner2";

const PostCard = ({ postDetails }: { postDetails: Post | any }) => {
  const { data: session } = useSession();
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  const getPostComments = async () => {
    try {
      setCommentsLoading(true);
      const api = await fetch(`/api/comment/post/${postDetails?._id}`);
      const res = await api.json();

      setComments(res?.comments);
      setCommentsLoading(false);
    } catch (error) {
      console.log(error);
      setCommentsLoading(false);
    }
  };

  useEffect(() => {
    if (postDetails?._id && showComments && comments.length <= 0) {
      getPostComments();
    }
  }, [postDetails, showComments, comments.length]);

  const newComment = async () => {
    if (comment === "") {
      return;
    }
    if (!session?.user) {
      router.replace("/login");
    }
    try {
      const api = await fetch(`/api/comment/post/${postDetails?._id}`, {
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
    <div className="w-full flex flex-col items-center relative overflow-hidden">
      <div className="w-full flex justify-between items-center px-2">
        <Link
          href={
            session?.user
              ? session.user.id === postDetails?.createdBy?._id
                ? "/profile"
                : `/user/${postDetails?.createdBy?._id}`
              : `/user/${postDetails?.createdBy?._id}`
          }
          className="w-max flex items-center gap-2"
        >
          <Image
            src={postDetails?.createdBy?.avatar?.url || "/noavatar.png"}
            alt={"Profile image"}
            width={40}
            height={40}
            className="w-12 h-12 rounded-full mb-2 border object-cover"
          />
          <h2 className="text-xl font-semibold">
            {postDetails?.createdBy?.username}
          </h2>
        </Link>
        <div className="flex flex-col items-end relative">
          <div className="border rounded-full flex justify-center items-center cursor-pointer p-2">
            <FaShare
              className="text-xl"
              onClick={() => {
                navigator.clipboard.writeText(
                  `${window.location.origin}/post/${postDetails?._id}`
                );
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className="absolute z-10 rounded-md bg-blue-500 p-2 text-white">
              copied!
            </p>
          )}
          <p className="text-sm">{format(postDetails.createdAt)}</p>
        </div>
      </div>
      <div className="w-full h-min flex justify-center overflow-hidden bg-black bg-opacity-10 dark:bg-white dark:bg-opacity-30">
        <Swiper
          className="w-full"
          pagination={{
            type: "bullets",
            dynamicBullets: true,
          }}
          modules={[Pagination]}
          centeredSlides={true}
        >
          {postDetails &&
            postDetails.images.map((imgSrc: imageProps, i: number) => (
              <SwiperSlide
                key={i}
                className="w-full flex items-center justify-center"
              >
                <div className="w-full h-[300px] relative">
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
      {/* post info */}
      <div className="flex flex-col w-full p-2 px-3 gap-1">
        {/* post caption */}
        <div className="flex flex-col items-start">
          <h1 className="font-semibold break-all" id={postDetails._id}>
            {(postDetails?.caption.length > 30 &&
              postDetails?.caption.slice(0, 30) + "...") ||
              postDetails?.caption}
          </h1>
          {postDetails?.caption.length > 30 && (
            <>
              <button
                className="hover:underline"
                id={`moreBtn-${postDetails._id}`}
                onClick={() => {
                  const caption = document.getElementById(postDetails._id);
                  caption?.innerText
                    ? (caption.innerText = postDetails?.caption)
                    : null;
                  const moreBtn = document.getElementById(
                    `moreBtn-${postDetails._id}`
                  );
                  moreBtn ? (moreBtn.style.display = "none") : null;
                  const lessBtn = document.getElementById(
                    `lessBtn-${postDetails._id}`
                  );
                  lessBtn ? (lessBtn.style.display = "block") : null;
                }}
              >
                more
              </button>
              <button
                className="hover:underline hidden"
                id={`lessBtn-${postDetails._id}`}
                onClick={() => {
                  const caption = document.getElementById(postDetails._id);
                  caption?.innerText
                    ? (caption.innerText =
                        postDetails?.caption.slice(0, 30) + "...")
                    : null;
                  const moreBtn = document.getElementById(
                    `moreBtn-${postDetails._id}`
                  );
                  moreBtn ? (moreBtn.style.display = "block") : null;
                  const lessBtn = document.getElementById(
                    `lessBtn-${postDetails._id}`
                  );
                  lessBtn ? (lessBtn.style.display = "none") : null;
                }}
              >
                less
              </button>
            </>
          )}
        </div>
        {/* like and comment button */}
        <div className="w-full flex justify-between">
          <Like id={postDetails._id} />
          <button
            className="border font-semibold p-1 rounded hover:bg-black hover:bg-opacity-10"
            onClick={() => setShowComments(!showComments)}
          >
            View Comments
          </button>
        </div>
      </div>
      {/* All comments section */}
      <div
        className={`w-full h-full z-10 bg-white dark:bg-slate-500 transition-all duration-300 flex flex-col absolute ${
          showComments ? "top-0 left-0" : "translate-y-[100%]"
        }`}
      >
        <div className="text-base sm:text-xl w-full flex justify-between p-2">
          Comments
          <button
            onClick={() => setShowComments(!showComments)}
            className="p-1 text-xl text-black dark:text-white text-opacity-60"
          >
            <FaWindowClose />
          </button>
        </div>
        {session?.user ? (
          <div className="w-full flex">
            <input
              type="text"
              className="w-full bg-black bg-opacity-10 dark:bg-slate-600 outline-none text-[10px] sm:text-sm py-2 px-3"
              placeholder="Comment Something..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              className="bg-black bg-opacity-10 hover:bg-opacity-30 dark:bg-slate-600 dark:hover:bg-slate-700 p-1 px-2 sm:px-4 border-l border-l-white disabled:opacity-50"
              onClick={() => newComment()}
              disabled={commentsLoading || comment === ""}
            >
              {commentsLoading ? (
                <Spinner2 width={25} height={25} border={2} />
              ) : (
                <BiSend />
              )}
            </button>
          </div>
        ) : (
          <h2 className="text-base border-y py-1 font-semibold text-center">
            <Link href={"/login"} className="underline">
              Login
            </Link>{" "}
            to get in touch with peoples
          </h2>
        )}
        {(!comments || comments.length <= 0) && !commentsLoading && (
          <h1 className="font-semibold text-center max-sm:text-sm">
            No Comments Yet
          </h1>
        )}
        {commentsLoading && (
          <div className="w-full flex justify-center mt-2">
            <Spinner2 width={50} height={50} border={3} />
          </div>
        )}
        {comments?.length > 0 &&
          comments?.map((comment, i) => (
            <div className="flex flex-col" key={i}>
              <div className="w-full flex justify-between items-center pl-1 pr-2">
                <div className="flex items-center gap-1 p-2">
                  <Image
                    src={comment.commentBy.avatar.url || "/noavatar.png"}
                    alt=""
                    width={28}
                    height={28}
                    className="w-7 h-7 sm:w-9 sm:h-9 rounded-full object-cover"
                  />
                  <span className="text-sm sm:text-lg font-semibold">
                    {comment.commentBy.username}
                  </span>
                </div>
                <span className="text-xs sm:text-sm">
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
    </div>
  );
};

export default PostCard;
