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
    <div className="w-full fixed bottom-0 p-3 z-50 flex justify-around bg-purple-400 border-t-2">
      {/* {linkes.map((link) => (
        <Link href={link.path} key={link.title}>
          {link.title}
        </Link>
      ))} */}
      <Link href={"/"} className={`text-3xl ${path === "/" && "text-white"}`}>
        <FaHome />
      </Link>
      <Link
        href={"/explore"}
        className={`text-3xl ${path === "/explore" && "text-white"}`}
      >
        <FaSearch />
      </Link>
      {session?.user ? (
        <>
          <Link
            href={"/create"}
            className={`text-3xl ${path === "/create" && "text-white"}`}
          >
            <FaPlusCircle />
          </Link>
          <Link
            href={"/profile"}
            className={`text-3xl ${path === "/profile" && "text-white"}`}
          >
            <FaUserCircle />
          </Link>
        </>
      ) : (
        status !== "loading" && (
          <>
            <Link
              href={"/login"}
              className={`text-3xl ${path === "/login" && "text-white"}`}
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
