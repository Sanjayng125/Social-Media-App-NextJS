"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { HiOutlineHeart, HiHeart } from "react-icons/hi";

export default function Like({ id }: { id: string }) {
  const { data: session } = useSession();
  const [hasLiked, setHasLiked] = useState(false);
  const [likes, setLikes] = useState([]);
  const [likeLoading, setLikeLoading] = useState(true);

  const getLikes = async () => {
    try {
      setLikeLoading(true);
      const api = await fetch(`/api/post/likes/${id}`);
      const res = await api.json();
      // console.log(res.postLikes.likes);
      setLikes(res.postLikes.likes);
      setLikeLoading(false);
    } catch (error) {
      console.log(error);
      setLikeLoading(false);
    }
  };
  useEffect(() => {
    //    get all likes
    getLikes();
  }, []);

  useEffect(() => {
    if (likes.findIndex((like) => like === session?.user?.id) !== -1) {
      setHasLiked(true);
    } else {
      setHasLiked(false);
    }
  }, [likes]);

  async function handleLikePost() {
    try {
      setLikeLoading(true);
      const api = await fetch(`/api/post/likes/${id}`, {
        method: "PATCH",
      });
      const res = await api.json();
      // console.log(res);
      if (res.status === "success") {
        getLikes();
      }
      setLikeLoading(false);
    } catch (error) {
      console.log(error);
      setLikeLoading(false);
    }
  }

  return (
    <div>
      <div className="flex">
        <div className="flex items-center gap-2">
          {session &&
            (likeLoading ? (
              <Image src={"/small-spinner.gif"} alt="" width={30} height={30} />
            ) : hasLiked ? (
              <HiHeart
                onClick={handleLikePost}
                className="text-red-500 cursor-pointer text-3xl  hover:scale-125 transition-transform duration-200 ease-out"
              />
            ) : (
              <HiOutlineHeart
                onClick={handleLikePost}
                className="cursor-pointer text-3xl  hover:scale-125 transition-transform duration-200 ease-out"
              />
            ))}
          {likes.length > 0 && (
            <p className="text-white">
              {likes.length} {likes.length === 1 ? "like" : "likes"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
