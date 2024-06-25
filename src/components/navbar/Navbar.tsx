import React from "react";
import Search from "../search/Search";

const Navbar = () => {
  return (
    <div className="p-2 flex bg-white border shadow-2xl md:justify-center md:items-center gap-3 md:mb-2 md:rounded max-md:border-b-2 max-md:flex-col md:h-16 dark:bg-white dark:bg-opacity-10 dark:border-none">
      <div className="md:hidden">
        <h1 className="text-2xl font-bold md:text-center">SastaGram</h1>
      </div>
      <div className="flex-1">
        <Search />
      </div>
    </div>
  );
};

export default Navbar;
