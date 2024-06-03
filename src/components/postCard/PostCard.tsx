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
    <div className="w-full flex flex-col items-center border rounded-lg relative overflow-hidden">
      <div className="w-full flex justify-between items-center px-3 text-white">
        <Link
          href={
            session?.user
              ? session.user.id === postDetails?.createdBy?._id
                ? "/profile"
                : `/user/${postDetails?.createdBy?._id}`
              : `/user/${postDetails?.createdBy?._id}`
          }
          className="w-max p-2 flex items-center gap-2"
        >
          <Image
            src={postDetails?.createdBy?.avatar?.url || "/noavatar.png"}
            alt={"Profile image"}
            width={40}
            height={40}
            className="w-[40px] h-[40px] rounded-full mb-2 border object-cover"
          />
          <h2 className="text-xl font-semibold text-white">
            {postDetails?.createdBy?.username}
          </h2>
        </Link>
        <div className="flex flex-col items-end relative">
          <div className="border rounded-full flex justify-center items-center cursor-pointer p-2">
            <FaShare
              className="text-xl"
              onClick={() => {
<<<<<<< HEAD
                navigator.clipboard.writeText(
                  `${window.location.origin}/post/${postDetails?._id}`
                );
=======
                navigator.clipboard.writeText(`${window.location.origin}/post/${postDetails?._id}`);
>>>>>>> cff0acd707ab7343c4980e89d4f2811943d77fae
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className="absolute z-10 rounded-md bg-green-500 p-2">copied!</p>
          )}
          <p className="text-sm">{format(postDetails.createdAt)}</p>
        </div>
      </div>
      <div className="w-full h-min border-y-2 flex justify-center overflow-hidden bg-purple-500 dark:bg-white dark:bg-opacity-30">
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
                    // layout="fill"
                    // objectFit="contain" // Changed to "contain" to fit the image inside the container\
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
      <div className="flex justify-between w-full p-2">
        <div className="flex items-center gap-2">
          <h1 className="text-white">{postDetails?.caption}</h1>
          <Like id={postDetails._id} />
        </div>
        <button
          className="text-white"
          onClick={() => setShowComments(!showComments)}
        >
          View Comments
        </button>
      </div>
      {/* comment section */}
      <div
        className={`w-full h-full z-10 bg-slate-500 text-white transition-all duration-300 flex flex-col absolute ${
          showComments ? "top-0 left-0" : "translate-y-[100%]"
        }`}
      >
        <div className="text-base sm:text-xl w-full flex justify-between p-2">
          Comments
          <button
            onClick={() => setShowComments(!showComments)}
            className="p-1 text-xl"
          >
            <FaWindowClose />
          </button>
        </div>
        {session?.user ? (
          <div className="w-full flex border-y border-y-white">
            <input
              type="text"
              className="w-full bg-slate-600 text-white outline-none text-[10px] sm:text-sm py-2 px-3"
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
            <Image src={"/small-spinner.gif"} alt="" width={40} height={40} />
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
                    className="w-[23px] h-[23px] sm:w-[27px] sm:h-[27px] rounded-full object-cover"
                  />
                  <span className="text-xs sm:text-sm">
                    {comment.commentBy.username}
                  </span>
                </div>
                <span className="text-[8px] sm:text-xs">
                  {format(comment.createdAt)}
                </span>
              </div>
              <p
                className="w-full px-2 text-[12px] sm:text-sm"
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
