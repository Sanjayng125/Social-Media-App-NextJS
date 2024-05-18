"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import ThemeSwitch from "../theme/themeSwitch";

const Search = () => {
  const [searchInput, setSearchInput] = useState("");
  const queryParams = useSearchParams();

  useEffect(() => {
    setSearchInput(queryParams.get("q") || "");
  }, []);

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        className="rounded-full p-2 outline-none bg-white bg-opacity-50 w-full border-[6px] border-purple-400 dark:border-white dark:border-opacity-10 dark:bg-transparent text-black dark:text-white"
        placeholder="Search"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <Link
        href={searchInput !== "" ? `/search?q=${searchInput}` : "/explore"}
        className="bg-purple-400 rounded-full p-2 text-2xl text-white hover:scale-95 dark:bg-white dark:bg-opacity-10"
      >
        <FaSearch />
      </Link>
      <ThemeSwitch />
    </div>
  );
};

export default Search;
