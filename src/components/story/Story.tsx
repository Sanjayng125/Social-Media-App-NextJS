"use client";

import React, { useEffect, useState } from "react";
import StoryList from "./StoryList";
import { MultipleStoryProps } from "@/types";
import { useSession } from "next-auth/react";
import useStore from "@/context/store";

export default function Story() {
  const { data: session } = useSession();
  const { stories, setStories } = useStore();
  const getStories = async () => {
    try {
      console.log("fetching");

      const res = await fetch("/api/user/getMyStories");
      const data = await res.json();
      setStories(data.userStories);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (session?.user && stories?.length <= 0) {
      getStories();
    }
  }, [session?.user.username, stories?.length]);

  return (
    <div className="p-4 text-black bg-black bg-opacity-10 dark:bg-white dark:bg-opacity-30 dark:text-white md:rounded-lg overflow-x-auto text-xs hide-scrollbar">
      <div className="flex gap-5 w-max">
        <StoryList stories={stories} getStories={getStories} />
      </div>
    </div>
  );
}
