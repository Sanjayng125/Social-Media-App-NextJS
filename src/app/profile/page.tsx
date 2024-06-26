"use client";
import Spinner2 from "@/components/loader/Spinner2";
import UserLikedPosts from "@/components/user/UserLikedPosts";
import UserPosts from "@/components/user/UserPosts";
import { handleLogOut } from "@/lib/actions";
import { Post } from "@/types";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";

interface followProps {
  followers: string[];
  following: string[];
}

const Profile = () => {
  const { data: session, status } = useSession();
  const authLoading = status === "loading" || false;
  const [showPosts, setShowPosts] = useState(true);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [userLikedPosts, setUserLikedPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState<followProps>();
  const pathname = usePathname();

  const getUserPosts = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/user/getUserPosts`);
      const res2 = await fetch(`/api/user/getFollows`);

      const data = await res.json();
      const data2 = await res2.json();

      setUserDetails(data2.userDetails);
      setUserPosts(data.userPosts.posts);
      setUserLikedPosts(data.userPosts.likedPosts);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserPosts();
  }, [session?.user.username, pathname]);

  return (
    <div className="flex justify-center bg-white shadow-2xl border h-full md:p-3 md:rounded overflow-y-auto dark:bg-white dark:bg-opacity-10 dark:border-none">
      {authLoading && (
        <h1 className="text-2xl font-semibold text-center">Loading...</h1>
      )}
      {!authLoading && session && (
        <div className="w-full bg-black bg-opacity-10 md:rounded-lg p-3 h-full overflow-y-auto dark:bg-white dark:bg-opacity-30">
          <div className="flex items-center gap-2 w-full max-sm:flex-col lg:flex-col relative">
            <Image
              src={session.user.avatar.url || "/noavatar.png"}
              alt=""
              width={100}
              height={100}
              className="w-[100px] h-[100px] rounded-full"
              priority
            ></Image>
            <div className="w-full flex gap-2 flex-wrap justify-between max-sm:flex-col lg:flex-col">
              <div>
                {session?.user && (
                  <h1 className="text-2xl font-bold max-sm:text-center lg:text-center capitalize">
                    {session?.user?.username || session?.user?.name || "User"}
                  </h1>
                )}
                {session?.user && (
                  <h2 className="text-base font-bold max-sm:text-center lg:text-center">
                    {session?.user?.email}
                  </h2>
                )}
              </div>
              <div className="flex gap-3 max-sm:justify-center max-sm:mt-3 lg:justify-center lg:mt-3 max-sm:border-t-2">
                <h2 className="flex flex-col items-center text-xl font-bold">
                  <span>Followers</span>
                  <span className="text-3xl font-semibold">
                    {userDetails?.followers?.length || 0}
                  </span>
                </h2>
                <h2 className="flex flex-col items-center text-xl font-bold">
                  <span>Following</span>
                  <span className="text-3xl font-semibold">
                    {userDetails?.following?.length || 0}
                  </span>
                </h2>
              </div>
              <div className="max-sm:absolute max-sm:top-2 max-sm:right-2 lg:absolute lg:top-2 lg:right-2 flex flex-col gap-2">
                <Link
                  href={"/profile/edit"}
                  className="sm:mr-3 flex items-center gap-2 bg-white bg-opacity-50 rounded-lg p-2 font-semibold hover:underline"
                >
                  <span className="max-[350px]:hidden">Edit</span>
                  <FaPencil />
                </Link>
                <form action={handleLogOut}>
                  <button className="md:hidden sm:mr-3 flex items-center gap-2 bg-red-500 text-white rounded-lg p-2 font-semibold hover:underline">
                    <span className="max-[350px]:hidden text-xs">Logout</span>
                    <FaSignOutAlt />
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="mt-2 w-full flex flex-col">
            <div className="flex justify-evenly gap-2">
              <button
                className={`hover:bg-white hover:bg-opacity-50 w-full font-semibold ${
                  showPosts && "bg-white bg-opacity-50"
                }`}
                onClick={() => setShowPosts(true)}
              >
                Posts
              </button>
              <button
                className={`hover:bg-white hover:bg-opacity-50 w-full font-semibold ${
                  !showPosts && "bg-white bg-opacity-50"
                }`}
                onClick={() => setShowPosts(false)}
              >
                Liked
              </button>
            </div>
            <div className="w-full h-auto">
              {loading && (
                <div className="w-full flex justify-center mt-2">
                  <Spinner2 width={40} height={40} border={2} />
                </div>
              )}
              {!loading && showPosts && userPosts?.length === 0 && (
                <h1 className="text-white text-center text-xl">
                  No Posts Yet!
                </h1>
              )}
              {!loading && !showPosts && userLikedPosts?.length === 0 && (
                <h1 className="text-white text-center text-xl">
                  No Liked Posts Yet!
                </h1>
              )}
              {showPosts ? (
                <UserPosts posts={userPosts} />
              ) : (
                <UserLikedPosts posts={userLikedPosts} />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
