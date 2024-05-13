"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

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
        className="rounded-full p-2 outline-none bg-white bg-opacity-50 w-full border-[6px] border-purple-400 text-black"
        placeholder="Search"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <Link
        href={searchInput !== "" ? `/search?q=${searchInput}` : "/explore"}
        className="bg-purple-400 rounded-full p-2 text-2xl text-white hover:scale-95"
      >
        <FaSearch />
      </Link>
    </div>
  );
};

export default Search;
