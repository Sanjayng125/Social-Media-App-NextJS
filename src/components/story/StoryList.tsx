"use client";

import { MultipleStoryProps } from "@/types";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { CgClose } from "react-icons/cg";
import { HiPhoto } from "react-icons/hi2";
import Spinner2 from "../loader/Spinner2";
import StoryModal from "./StoryModal";
import { BiPlus } from "react-icons/bi";

export default function StoryList({
  stories,
  getStories,
}: {
  stories: MultipleStoryProps[];
  getStories: () => void;
}) {
  const { data: session, status } = useSession();
  const [showModel, setShowModel] = useState(false);
  const imgInputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [viewStory, setViewStory] = useState(false);
  const [viewingStory, setViewingStory] = useState<MultipleStoryProps | null>(
    null
  );

  const addStory = async () => {
    if (!images || images.length <= 0) {
      alert("Please select at least 1 image!");
      return;
    }
    try {
      setLoading(true);
      setShowModel(false);

      const convertPromises =
        images.length > 0
          ? images?.map(async (image: File) => {
              const reader = new FileReader();
              reader.readAsDataURL(image);

              return new Promise<string | any>((resolve, reject) => {
                reader.onload = async () => {
                  resolve(reader.result);
                };

                reader.onerror = () => {
                  reject("File reading failed");
                };
              });
            })
          : [];

      const base64Images = await Promise.all(convertPromises);

      const api = await fetch("/api/user/createStory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ images: base64Images }),
      });
      const res = await api.json();
      if (res?.message) {
        alert(res?.message);
      }
      if (res?.status === "success") {
        setImages([]);
        getStories();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {viewStory && viewingStory && (
        <StoryModal setViewStory={setViewStory} story={viewingStory} />
      )}
      {status === "loading" && <Spinner2 width={70} height={70} border={4} />}
      {session?.user && status === "authenticated" && (
        <>
          {/* Add Story Model */}
          {showModel && (
            <div className="bg-black bg-opacity-60 w-full h-screen absolute left-0 top-0 z-[99] flex justify-center items-center">
              <div className="bg-white p-3 rounded-lg text-black flex flex-col items-center gap-3 relative">
                <button
                  className="absolute top-0 right-0 text-xl m-2"
                  onClick={() => {
                    setImages([]);
                    setShowModel(!showModel);
                  }}
                >
                  <CgClose />
                </button>
                <h2 className="text-xl font-semibold mb-3">Add Story</h2>
                <input
                  type="file"
                  className="p-3 w-full rounded-lg bg-purple-300 border text-white placeholder:text-white font-semibold hidden"
                  placeholder="Upload Images"
                  multiple
                  accept="image/*"
                  ref={imgInputRef}
                  onChange={(e) =>
                    setImages((prev) => [
                      ...prev,
                      ...Array.from(e.target.files || []),
                    ])
                  }
                />
                <button
                  type="button"
                  className="w-full rounded-lg border-[3px] border-dashed p-6 flex justify-center items-center disabled:opacity-50"
                  onClick={() => imgInputRef?.current?.click()}
                  disabled={loading}
                >
                  <span className="py-4 px-8 max-xsm:py-2 max-xsm:px-4 rounded-lg bg-gray-200 bg-opacity-70 flex justify-center items-center gap-2 text-2xl">
                    Choose <HiPhoto />
                  </span>
                </button>
                {images && (
                  <div className="flex flex-col items-start w-full max-h-20 overflow-y-auto">
                    {images.map((img, i) => (
                      <p className="text-xs font-semibold" key={i}>
                        {img.name}
                      </p>
                    ))}
                  </div>
                )}
                <button
                  onClick={addStory}
                  className="bg-blue-500 p-2 rounded w-full text-white text-base font-semibold disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send"}
                </button>
              </div>
            </div>
          )}
          {/* Add Story Btn */}
          <button
            className="flex flex-col items-center gap-2 relative disabled:opacity-70"
            onClick={() => setShowModel(!showModel)}
            disabled={loading}
          >
            <Image
              src={session?.user?.avatar.url || "/noAvatar.png"}
              alt=""
              width={80}
              height={80}
              priority
              className="w-20 h-20 rounded-full ring-2 object-cover shadow-xl"
              // onClick={() => open()}
            />
            <span className="font-medium">
              {loading ? "Posting..." : "Add a Story"}
            </span>
            <span className="absolute w-7 h-7 text-2xl flex items-center justify-center text-blue-600 bg-white rounded-full bottom-5 border right-1">
              <BiPlus />
            </span>
          </button>
          {/* ALL STORIES */}
          {stories.map((story: MultipleStoryProps, i: number) => (
            <div
              className="flex flex-col items-center gap-2 cursor-pointer"
              key={i}
              onClick={() => {
                setViewingStory(story);
                setViewStory(true);
              }}
            >
              <Image
                src={story.avatar || "/noavatar.png"}
                alt=""
                width={80}
                height={80}
                priority
                className="w-20 h-20 rounded-full ring-2 shadow-xl"
              />
              <span className="font-medium">{story.username || ""}</span>
            </div>
          ))}
        </>
      )}
      {status === "unauthenticated" && (
        <div
          className="flex flex-col items-center gap-2 cursor-pointer"
          onClick={() => {
            setViewingStory({
              avatar: "/img-384.png",
              stories: [
                {
                  _id: "1",
                  createdAt: "",
                  expiresAt: "",
                  imgs: [{ url: "/defaultStory.jpg" }],
                  user: {
                    avatar: "/img-384.png",
                    userId: "default",
                    username: "SastaGram Stories",
                  },
                },
              ],
              userId: "default",
              username: "SastaGram Stories",
            });
            setViewStory(true);
          }}
        >
          <Image
            src={"/img-512.png"}
            alt=""
            width={80}
            height={80}
            priority
            className="w-20 h-20 rounded-full ring-2 shadow-xl bg-gradient-to-b from-purple-700 to-pink-600"
          />
          <span className="font-medium">SastaGram</span>
        </div>
      )}
    </>
  );
}
