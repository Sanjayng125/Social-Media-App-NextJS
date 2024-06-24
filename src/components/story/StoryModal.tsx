import { MultipleStoryProps, SingleStoryProps } from "@/types";
import Image from "next/image";
import React from "react";
import { BiLeftArrowAlt } from "react-icons/bi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Link from "next/link";
import { Autoplay, Pagination } from "swiper/modules";
import { format } from "timeago.js";

export default function StoryModal({
  setViewStory,
  story,
}: {
  setViewStory: (a: boolean) => void;
  story: MultipleStoryProps;
}) {
  return (
    <div className="w-full h-screen bg-black bg-opacity-60 absolute left-0 top-0 z-[99] flex justify-center items-center p-2">
      <div className="flex flex-col bg-white rounded-lg max-w-[400px] w-full relative">
        {/* Top */}
        <div className="flex text-black items-center border-b-2 border-black p-2 relative">
          <button
            onClick={() => setViewStory(false)}
            className="text-xl text-black"
          >
            <BiLeftArrowAlt className="text-4xl" />
          </button>
          <Link
            href={
              story.userId !== "default" ? `/user/${story.userId}` : "/login"
            }
            className="flex items-center"
          >
            <Image
              src={story.avatar}
              alt="dp"
              width={50}
              height={50}
              className="rounded-full border border-black"
            />
            <p className="text-2xl font-semibold ml-2 truncate max-w-[200px]">
              {story.username}
            </p>
          </Link>
        </div>
        {/* Images */}
        <div className="overflow-hidden">
          <Swiper
            pagination={{ type: "progressbar" }}
            centeredSlides={true}
            autoplay={{
              delay: 3000,
              pauseOnMouseEnter: true,
            }}
            modules={[Autoplay, Pagination]}
            className="w-full"
          >
            {story.stories.length > 0 &&
              story.stories.map((story: SingleStoryProps) =>
                story.imgs.map((img: any, i: number) => (
                  <SwiperSlide
                    key={i}
                    style={{ marginBlock: "auto" }}
                    className="overflow-hidden cursor-pointer"
                  >
                    <div className="w-full h-[300px] max-w-[400px]">
                      <p className="bg-blue-500 p-1 pt-[6px] rounded-bl-lg font-semibold absolute right-0 -top-1 z-[99]">
                        {format(story.createdAt)}
                      </p>
                      <Image
                        src={img.url}
                        alt={""}
                        fill
                        className="object-contain"
                        priority
                      />
                    </div>
                  </SwiperSlide>
                ))
              )}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
