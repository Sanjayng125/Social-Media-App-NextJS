"use client";
import { imageProps, PostPageProps } from "@/types";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";
import { useRouter } from "next/navigation";

const EditPost = ({ params }: { params: { id: string } }) => {
  const [caption, setCaption] = useState("");
  const [tags, setTags] = useState("");
  const [oldCaption, setOldCaption] = useState("");
  const [oldTags, setOldTags] = useState("");
  const [images, setImages] = useState<imageProps[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const getPost = async () => {
    try {
      setLoading(true);
      const api = await fetch(`/api/getPosts/${params.id}`);
      const res: PostPageProps = await api.json();

      setOldCaption(res?.post?.caption || "");
      setOldTags(res?.post?.tags.join(" ").trim() || "");

      setCaption(res?.post?.caption || "");
      setTags(res?.post?.tags.join(" ").trim() || "");
      setImages(res?.post?.images || []);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params.id) {
      getPost();
    }
  }, [params]);

  const handleUpdatePost = async () => {
    if (
      caption.trim() === oldCaption.trim() &&
      tags.trim() === oldTags.trim()
    ) {
      alert("Change atleast 1 field to update!");
      return;
    }
    if (caption !== "" && tags !== "") {
      setLoading(true);

      const api = await fetch(`/api/user/updatePost/${params.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          caption,
          tags,
        }),
      });
      const res = await api.json();
      if (res?.message) {
        alert(res?.message);
      }
      if (res?.status === "success") {
        router.back();
      }

      setLoading(false);
    } else {
      alert("All fields are required!");
      return;
    }
  };

  return (
    <div className="w-full bg-purple-300 md:h-full md:p-3 md:rounded overflow-y-auto max-md:mb-12 dark:bg-white dark:bg-opacity-10">
      <div className="bg-purple-400 w-full md:rounded-lg flex flex-col items-center p-3 gap-3 dark:bg-white dark:bg-opacity-30">
        <h1 className="text-2xl font-semibold mb-3">Update Post</h1>
        <div className="w-full flex flex-col gap-3">
          <input
            type="text"
            className="p-3 w-full rounded-lg bg-purple-300 border text-white placeholder:opacity-70 placeholder:text-white font-semibold dark:border dark:bg-transparent"
            placeholder="Caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
          <div className="w-full">
            <Swiper
              className="max-[350px]:w-[230px] max-[430px]:w-[300px] w-[400px]"
              pagination={{ type: "fraction" }}
              centeredSlides={true}
            >
              {images &&
                images.map((imgSrc: imageProps, i: number) => (
                  <SwiperSlide key={i} style={{ marginBlock: "auto" }}>
                    <Image
                      src={imgSrc.url}
                      alt={""}
                      width={400}
                      height={300}
                      className="w-full h-auto md:w-[400px]"
                    />
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
          <input
            type="text"
            className="p-3 w-full rounded-lg bg-purple-300 border text-white placeholder:opacity-70 placeholder:text-white font-semibold dark:border dark:bg-transparent"
            placeholder="Tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
        <button
          className="bg-purple-300 p-2 rounded-lg w-full font-semibold disabled:opacity-80 dark:bg-slate-900"
          onClick={handleUpdatePost}
          disabled={
            loading ||
            caption === "" ||
            tags === "" ||
            (caption.trim() === oldCaption.trim() &&
              tags.trim() === oldTags.trim())
          }
        >
          {loading ? "Loading..." : "Update"}
        </button>
      </div>
    </div>
  );
};

export default EditPost;
