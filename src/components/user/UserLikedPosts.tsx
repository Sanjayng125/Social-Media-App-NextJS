import { Post } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const UserLikedPosts = (posts: { posts: Post[] }) => {
  return (
    <div className="w-full mt-2">
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2">
        {posts &&
          posts?.posts?.length > 0 &&
          posts?.posts?.map((post: Post | any, i: number) => (
            <div key={i} className="relative">
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

export default UserLikedPosts;
