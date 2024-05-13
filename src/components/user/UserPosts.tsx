"use client";
import { Post } from "@/types";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { BiEdit, BiTrash } from "react-icons/bi";
import { FaEllipsisV } from "react-icons/fa";

const UserPosts = (posts: { posts: Post[] }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const handlePostDelete = async (postId: string) => {
    const confirmation = confirm(
      "Are you sure..? The post will be permenantly deleted!!"
    );
    if (confirmation) {
      setLoading(true);
      try {
        const api = await fetch(`/api/user/deletePost/${postId}`, {
          method: "DELETE",
        });
        const res = await api.json();

        if (res?.status === "success") {
          alert(res?.message);
          router.refresh();
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  };

  return (
    <div className="w-full mt-2">
      <div className="w-full grid grid-cols-3">
        {posts &&
          posts?.posts?.length > 0 &&
          posts?.posts?.map((post: Post | any, i: number) => (
            <div key={i} className="relative">
              {pathname === "/profile" &&
                session?.user &&
                post?.createdBy === session?.user?.id && (
                  <div className="absolute right-0 flex flex-col p-1 bg-white border rounded m-1">
                    <button
                      className="text-xl hover:scale-110"
                      onClick={() => {
                        document
                          .getElementById(post?._id + "actionsMenu")
                          ?.classList.contains("hidden")
                          ? document
                              .getElementById(post?._id + "actionsMenu")
                              ?.classList.replace("hidden", "flex")
                          : document
                              .getElementById(post?._id + "actionsMenu")
                              ?.classList.replace("flex", "hidden");
                      }}
                      disabled={loading}
                    >
                      <FaEllipsisV />
                    </button>
                    <div
                      className="hidden flex-col mt-1"
                      id={post?._id + "actionsMenu"}
                    >
                      <Link
                        href={`/profile/edit/post/${post?._id}`}
                        className="text-xl hover:scale-110"
                      >
                        <BiEdit />
                      </Link>
                      <button
                        className="text-xl text-red-600 hover:scale-110 disabled:opacity-50"
                        onClick={() => handlePostDelete(post?._id)}
                        disabled={loading}
                      >
                        <BiTrash />
                      </button>
                    </div>
                  </div>
                )}
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
  );
};

export default UserPosts;
