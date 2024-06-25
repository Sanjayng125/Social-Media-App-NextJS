"use client";
import { handleLogOut } from "@/lib/actions";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const LeftSideBar = () => {
  const path = usePathname();
  const { data: session, status } = useSession();
  const authLoading = status === "loading" || false;

  return (
    <div className="bg-white shadow-2xl border h-full py-3 rounded relative dark:bg-white dark:bg-opacity-10 dark:border-none">
      <div className="mb-3">
        <h1 className="text-2xl font-bold text-center">SastaGram</h1>
      </div>
      {authLoading && (
        <div className="flex items-center justify-center gap-2 border-y p-2">
          <h1 className="text-2xl font-bold">Loading...</h1>
        </div>
      )}
      {session?.user && !authLoading && (
        <div className="flex items-center gap-2 border-y p-2">
          <Image
            src={session.user.avatar.url || "/noavatar.png"}
            alt="avatar"
            width={50}
            height={50}
            className="rounded-full w-[50px] h-[50px] object-cover"
          />
          <p className="text-xl font-semibold text-center truncate">
            {session?.user &&
              (session?.user?.username || session?.user?.name || "User")}
          </p>
        </div>
      )}
      {!session?.user && !authLoading && (
        <div className="flex items-center justify-center gap-2 border-y p-2">
          <Link href={"/login"} className="text-2xl font-bold underline">
            Login
          </Link>
        </div>
      )}
      <ul className="p-3">
        <li
          className={`w-full p-1 font-semibold text-lg hover:bg-black hover:bg-opacity-10 dark:hover:bg-white dark:hover:bg-opacity-50 my-1 rounded-lg ${
            path === "/" &&
            "bg-black bg-opacity-10 dark:bg-white dark:bg-opacity-50"
          }`}
        >
          <Link href={"/"} className="w-full">
            Home
          </Link>
        </li>
        <li
          className={`w-full p-1 font-semibold text-lg hover:bg-black hover:bg-opacity-10 dark:hover:bg-white dark:hover:bg-opacity-50 my-1 rounded-lg ${
            path === "/explore" &&
            "bg-black bg-opacity-10 dark:bg-white dark:bg-opacity-50"
          }`}
        >
          <Link href={"/explore"} className="w-full">
            Explore
          </Link>
        </li>
        {session?.user && (
          <>
            <li
              className={`w-full p-1 font-semibold text-lg hover:bg-black hover:bg-opacity-10 dark:hover:bg-white dark:hover:bg-opacity-50 my-1 rounded-lg ${
                path === "/profile" &&
                "bg-black bg-opacity-10 dark:bg-white dark:bg-opacity-50"
              }`}
            >
              <Link href={"/profile"} className="w-full">
                Profile
              </Link>
            </li>
            <li
              className={`w-full p-1 font-semibold text-lg hover:bg-black hover:bg-opacity-10 dark:hover:bg-white dark:hover:bg-opacity-50 my-1 rounded-lg ${
                path === "/create" &&
                "bg-black bg-opacity-10 dark:bg-white dark:bg-opacity-50"
              }`}
            >
              <Link href={"/create"} className="w-full">
                Create
              </Link>
            </li>
          </>
        )}
      </ul>
      {session?.user && (
        <form
          action={handleLogOut}
          className="w-full absolute bottom-6 left-0 flex justify-center px-2"
        >
          <button className="w-full font-semibold text-lg hover:underline rounded-lg hover:bg-red-500 p-2 hover:text-white">
            Logout
          </button>
        </form>
      )}
    </div>
  );
};

export default LeftSideBar;
