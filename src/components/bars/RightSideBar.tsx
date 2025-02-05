"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Spinner2 from "../loader/Spinner2";
import useStore from "@/context/store";

const RightSideBar = () => {
  const { data: session } = useSession();
  const { followers, followings, getFollows, isLoading: loading } = useStore();

  useEffect(() => {
    if (
      session &&
      session.user &&
      (followers?.length <= 0 || followings?.length <= 0)
    ) {
      getFollows();
    }
  }, [session?.user.username, followers?.length, followings?.length]);

  return (
    <div className="bg-white shadow-2xl border h-full rounded p-2 dark:bg-white dark:bg-opacity-10 dark:border-none">
      {session && session.user ? (
        <div className="flex flex-col">
          {loading && followers.length === 0 && followings.length === 0 && (
            <div className="w-full flex justify-center">
              <Spinner2 width={40} height={40} border={2} />
            </div>
          )}
          <div className="mb-2">
            <h2 className="text-xl font-semibold">Followers</h2>
            {followers && (
              <ul className="mt-2 overflow-y-auto">
                {followers.map((user: any, i) => (
                  <li className="w-full hover:underline" key={i}>
                    <Link
                      href={`/user/${user._id}`}
                      className="w-full flex items-center gap-2 my-2"
                    >
                      <Image
                        src={user.avatar.url || "/noavatar.png"}
                        alt="avatar"
                        width={30}
                        height={30}
                        className="rounded-full w-[40px] h-[40px] object-cover"
                      />
                      <p className="font-medium">{user.username}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <hr />
          <div className="mt-2">
            <h2 className="text-xl font-semibold">Following</h2>
            {followings && (
              <ul className="mt-2 overflow-y-auto">
                {followings.map((user: any, i) => (
                  <li className="w-full hover:underline" key={i}>
                    <Link
                      href={`/user/${user._id}`}
                      className="w-full flex items-center gap-2 my-2"
                    >
                      <Image
                        src={user.avatar.url || "/noavatar.png"}
                        alt="avatar"
                        width={30}
                        height={30}
                        className="rounded-full w-[40px] h-[40px] object-cover"
                      />
                      <p className="font-medium">{user.username}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ) : (
        !loading && (
          <div>
            <h2 className="text-xl font-semibold text-center">
              <Link href={"/login"} className="underline">
                Login
              </Link>{" "}
              to get started with SastaGram
            </h2>
          </div>
        )
      )}
    </div>
  );
};

export default RightSideBar;
