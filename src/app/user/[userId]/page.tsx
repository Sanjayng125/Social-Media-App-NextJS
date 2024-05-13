"use client";
import UserPosts from "@/components/user/UserPosts";
import { IUser } from "@/types";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const UserProfile = ({ params }: { params: { userId: string } }) => {
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState<IUser | any>(null);
  const [following, setFollowing] = useState(true);
  const [followLoading, setFollowLoading] = useState(true);
  const { data: session } = useSession();

  const getUserDetails = async () => {
    try {
      setLoading(true);
      const api = await fetch(`/api/getUserDetails/${params.userId}`);
      const res = await api.json();

      setUserDetails(res?.userDetails);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const checkFollowing = async () => {
    try {
      setFollowLoading(true);
      const api = await fetch(`/api/user/follow/${params.userId}`);
      const res = await api.json();

      setFollowing(res.following);
      setFollowLoading(false);
    } catch (error) {
      console.log(error);
      setFollowLoading(false);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  useEffect(() => {
    if (session?.user.username && params.userId !== session.user.id) {
      checkFollowing();
    } else {
      setFollowLoading(false);
    }
  }, [session?.user.username]);

  const handleFollow = async () => {
    try {
      setFollowLoading(true);
      const api = await fetch(`/api/user/follow/${params.userId}`, {
        method: "PATCH",
      });
      const res = await api.json();

      if (res?.status === "success") {
        checkFollowing();
        getUserDetails();
        // alert(res?.message);
      }
      setFollowLoading(false);
    } catch (error) {
      console.log(error);
      setFollowLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center bg-purple-300 h-full md:p-3 md:rounded overflow-y-auto">
      {loading && (
        <h1 className="text-2xl font-semibold text-center">Loading...</h1>
      )}
      {userDetails !== null && (
        <div className="w-full bg-purple-400 md:rounded-lg p-3 h-full overflow-y-auto">
          <div className="flex items-center gap-2 w-full max-sm:flex-col lg:flex-col relative">
            <Image
              src={userDetails?.avatar?.url || "/noavatar.png"}
              alt=""
              width={100}
              height={100}
              className="w-[100px] h-[100px] rounded-full"
              priority
            ></Image>
            <div className="w-full flex gap-2 flex-wrap justify-between max-sm:flex-col lg:flex-col">
              <div>
                <h1 className="text-2xl font-bold max-sm:text-center lg:text-center capitalize">
                  {userDetails.username}
                </h1>
                <h2 className="text-base font-bold max-sm:text-center lg:text-center">
                  {userDetails.email}
                </h2>
              </div>
              <div className="flex gap-3 max-sm:justify-center max-sm:mt-3 lg:justify-center lg:mt-3 max-sm:border-t-2">
                <h2 className="flex flex-col items-center text-xl font-bold">
                  <span>Followers</span>
                  <span className="text-3xl font-semibold">
                    {userDetails?.followers?.length}
                  </span>
                </h2>
                <h2 className="flex flex-col items-center text-xl font-bold">
                  <span>Following</span>
                  <span className="text-3xl font-semibold">
                    {userDetails?.following?.length}
                  </span>
                </h2>
              </div>
              {session?.user && (
                <div className="max-sm:absolute max-sm:top-2 max-sm:right-2 lg:absolute lg:top-2 lg:right-2 flex flex-col gap-2">
                  <button
                    className={`sm:mr-3 ${
                      following ? "hidden" : "flex"
                    } items-center gap-2 bg-white bg-opacity-50 rounded-lg p-2 font-semibold hover:underline disabled:opacity-50`}
                    onClick={() => handleFollow()}
                    disabled={loading}
                  >
                    <span className="max-[350px]:hidden">
                      {followLoading ? "Loading..." : "Follow"}
                    </span>
                  </button>
                  <button
                    className={`sm:mr-3 ${
                      !following ? "hidden" : "flex"
                    } items-center gap-2 bg-white bg-opacity-50 rounded-lg p-2 font-semibold hover:underline disabled:opacity-50`}
                    onClick={() => handleFollow()}
                    disabled={loading}
                  >
                    <span className="max-[350px]:hidden">
                      {followLoading ? "Loading..." : "Unfollow"}
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="mt-2 w-full flex flex-col border-t-2">
            <div className="flex justify-evenly gap-2 bg-purple-300 text-[18px] font-semibold">
              Posts
            </div>
            <div className="w-full h-auto">
              {userDetails.posts && <UserPosts posts={userDetails.posts} />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
