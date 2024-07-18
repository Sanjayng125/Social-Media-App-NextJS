"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import ThemeSwitch from "./ThemeSwitch";

const Search = () => {
  const [searchInput, setSearchInput] = useState("");
  const queryParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    setSearchInput(queryParams.get("q") || "");
  }, []);

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        className="rounded-full p-2 outline-none bg-white w-full border-[6px] border-black border-opacity-10 dark:border-white dark:border-opacity-30 dark:bg-transparent text-black dark:text-white"
        placeholder="Search"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            router.push(
              searchInput !== "" ? `/search?q=${searchInput}` : "/explore"
            );
          }
        }}
      />
      <Link
        href={searchInput !== "" ? `/search?q=${searchInput}` : "/explore"}
        className="bg-white border rounded-full p-2 text-2xl text-black text-opacity-80 hover:scale-95 dark:bg-white dark:bg-opacity-30 dark:border-none dark:text-white"
      >
        <FaSearch />
      </Link>
      <ThemeSwitch />
    </div>
  );
};

export default Search;
