"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  FaHome,
  FaPlusCircle,
  FaUserCircle,
  FaSearch,
  FaSignInAlt,
} from "react-icons/fa";

const BottomBar = () => {
  const { data: session, status } = useSession();
  const path = usePathname();
  return (
    <div className="w-full fixed bottom-0 p-3 z-50 flex justify-around bg-white border-t-2 dark:bg-slate-800">
      {/* {linkes.map((link) => (
        <Link href={link.path} key={link.title}>
          {link.title}
        </Link>
      ))} */}
      <Link
        href={"/"}
        className={`text-3xl p-[5px] ${
          path === "/" && "border-2 border-black dark:border-white rounded-full"
        }`}
      >
        <FaHome />
      </Link>
      <Link
        href={"/explore"}
        className={`text-3xl p-[5px] ${
          path === "/explore" &&
          "border-2 border-black dark:border-white rounded-full"
        }`}
      >
        <FaSearch />
      </Link>
      {session?.user ? (
        <>
          <Link
            href={"/create"}
            className={`text-3xl p-[5px] ${
              path === "/create" &&
              "border-2 border-black dark:border-white rounded-full"
            }`}
          >
            <FaPlusCircle />
          </Link>
          <Link
            href={"/profile"}
            className={`text-3xl p-[5px] ${
              path === "/profile" &&
              "border-2 border-black dark:border-white rounded-full"
            }`}
          >
            <FaUserCircle />
          </Link>
        </>
      ) : (
        status !== "loading" && (
          <>
            <Link
              href={"/login"}
              className={`text-3xl p-[5px] ${
                path === "/login" &&
                "border-2 border-black dark:border-white rounded-full"
              }`}
            >
              <FaSignInAlt />
            </Link>
          </>
        )
      )}
    </div>
  );
};

export default BottomBar;
