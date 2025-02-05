import { MultipleStoryProps, Post, SingleStoryProps } from "@/types";
import { create } from "zustand";

interface Store {
  isLoading: boolean;
  setIsLoading: any;
  followers: string[];
  setFollowers: (followers: string[]) => void;
  followings: string[];
  setFollowings: (followings: string[]) => void;
  posts: Post[];
  setPosts: (posts: Post[]) => void;
  hasMore: boolean;
  setHasMore: (hasMore: boolean) => void;
  stories: MultipleStoryProps[];
  setStories: (stories: MultipleStoryProps[]) => void;
  userFollows: {
    followers: string[];
    following: string[];
  };
  setUserFollows: (userFollows: {
    followers: string[];
    following: string[];
  }) => void;
  userPosts: Post[];
  setUserPosts: (userPosts: Post[]) => void;
  userLikedPosts: Post[];
  setUserLikedPosts: (userLikedPosts: Post[]) => void;
  hasMorePosts: boolean;
  setHasMorePosts: (hasMorePosts: boolean) => void;

  getFollows: () => void;
}

const useStore = create<Store>()((set) => ({
  isLoading: false,
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
  followers: [],
  setFollowers: (followers: string[]) => set({ followers }),
  followings: [],
  setFollowings: (followings: string[]) => set({ followings }),
  posts: [],
  setPosts: (posts: Post[]) => set({ posts }),
  hasMore: false,
  setHasMore: (hasMore: boolean) => set({ hasMore }),
  stories: [],
  setStories: (stories: MultipleStoryProps[]) => set({ stories }),
  userFollows: {
    followers: [],
    following: [],
  },
  setUserFollows: (userFollows: { followers: string[]; following: string[] }) =>
    set({ userFollows }),
  userPosts: [],
  setUserPosts: (userPosts: Post[]) => set({ userPosts }),
  userLikedPosts: [],
  setUserLikedPosts: (userLikedPosts: Post[]) => set({ userLikedPosts }),
  hasMorePosts: false,
  setHasMorePosts: (hasMorePosts: boolean) => set({ hasMorePosts }),

  getFollows: async () => {
    try {
      set({ isLoading: true });
      const api = await fetch(`/api/user/getFollows?limit=20&populate=true`);
      const res = await api.json();

      set({ followers: res?.userDetails?.followers });
      set({ followings: res?.userDetails?.following });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useStore;
