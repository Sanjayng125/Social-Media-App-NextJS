"use client";
import Spinner2 from "@/components/loader/Spinner2";
import UserPosts from "@/components/user/UserPosts";
import { IUser, Post } from "@/types";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const UserProfile = ({ params }: { params: { userId: string } }) => {
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState<IUser | any>(null);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [following, setFollowing] = useState(true);
  const [followLoading, setFollowLoading] = useState(true);
  const { data: session } = useSession();

  //loadmore
  const { ref, inView } = useInView();
  const [startIndex, setStartIndex] = useState(20);
  const [hasMore, setHasMore] = useState(false);

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

  const getUserPosts = async () => {
    try {
      setLoading(true);
      const api = await fetch(`/api/getUserPosts/${params.userId}?limit=20`);
      const res = await api.json();

      setUserPosts(res?.userPosts);
      setHasMore(res?.userPosts.length >= 20);
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
    getUserPosts();
  }, []);

  //loadmore
  useEffect(() => {
    const getPosts = async () => {
      try {
        setLoading(true);
        const api = await fetch(
          `/api/getUserPosts/${params.userId}?limit=20&startIndex=${startIndex}`
        );
        const res = await api.json();

        setUserPosts((prev) => [...prev, ...res.userPosts]);
        setStartIndex(startIndex + res.userPosts.length);
        setHasMore(res.userPosts.length >= 20);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    if (inView && !loading && hasMore) {
      getPosts();
    }
  }, [inView]);

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
    <div className="flex flex-col justify-center bg-white shadow-2xl border h-full md:p-3 md:rounded overflow-hidden dark:bg-white dark:bg-opacity-10 dark:border-none">
      {loading && !userDetails && (
        <div className="w-full flex justify-center">
          <Spinner2 width={50} height={50} border={3} />
        </div>
      )}
      {userDetails !== null && (
        <div className="w-full bg-black bg-opacity-10 md:rounded-lg p-3 h-full overflow-y-auto dark:bg-white dark:bg-opacity-30">
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
                    <div className="max-[350px]:hidden">
                      {followLoading ? (
                        <Spinner2 width={20} height={20} border={2} />
                      ) : (
                        "Follow"
                      )}
                    </div>
                  </button>
                  <button
                    className={`sm:mr-3 ${
                      !following ? "hidden" : "flex"
                    } items-center gap-2 bg-white bg-opacity-50 rounded-lg p-2 font-semibold hover:underline disabled:opacity-50`}
                    onClick={() => handleFollow()}
                    disabled={loading}
                  >
                    <span className="max-[350px]:hidden">
                      {followLoading ? (
                        <Spinner2 width={20} height={20} border={2} />
                      ) : (
                        "Unfollow"
                      )}
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="mt-2 w-full flex flex-col">
            <div className="flex justify-evenly gap-2 bg-white text-[18px] font-semibold dark:bg-slate-800">
              Posts
            </div>
            <div className="w-full h-auto max-md:mb-16">
              {userPosts?.length > 0 && <UserPosts posts={userPosts} />}
              {/* loadmore */}
              {hasMore && userDetails && (
                <div className="flex justify-center my-1" ref={ref}>
                  <Spinner2 width={40} height={40} border={3} />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
