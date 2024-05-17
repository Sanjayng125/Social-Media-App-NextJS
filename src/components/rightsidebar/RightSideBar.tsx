"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const RightSideBar = () => {
  const { data: session } = useSession();
  const [followings, setFollowings] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);

  const getFollows = async () => {
    try {
      setLoading(true);
      const api = await fetch(`/api/user/getFollows?limit=20&populate=true`);
      const res = await api.json();

      setFollowers(res?.userDetails?.followers);
      setFollowings(res?.userDetails?.following);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session && session.user) {
      getFollows();
    } else {
      setLoading(false);
    }
  }, [session?.user.username]);

  return (
    <div className="bg-purple-300 h-full rounded p-2 dark:bg-white dark:bg-opacity-10">
      {session && session.user ? (
        <div className="flex flex-col">
          {loading && <h2 className="text-xl text-center">Loading...</h2>}
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
