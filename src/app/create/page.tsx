"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { HiPhoto } from "react-icons/hi2";

const Create = () => {
  const imgInputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<File[]>([]);
  const [caption, setCaption] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageRemove = (img: File) => {
    const newImages = images?.filter((item) => item !== img);
    setImages(newImages);
  };

  const handleCreatePost = async () => {
    if (images && images.length > 0 && caption !== "" && tags !== "") {
      setLoading(true);

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

      // const res = await createPost(caption, tags, base64Images);
      const api = await fetch("/api/user/createPost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ caption, tags, images: base64Images }),
      });
      const res = await api.json();
      if (res?.message) {
        alert(res?.message);
      }
      if (res?.status === "success") {
        setCaption("");
        setTags("");
        setImages([]);
      }

      setLoading(false);
    } else {
      alert("All fields are required!");
      return;
    }
  };

  return (
    <div className="w-full bg-white border md:h-[calc(100%-71px)] md:p-3 md:rounded overflow-y-auto dark:bg-white dark:bg-opacity-10 dark:border-none">
      <div className="bg-black bg-opacity-10 w-full md:rounded-lg flex flex-col items-center p-3 dark:bg-white dark:bg-opacity-20">
        <h1 className="text-2xl font-semibold mb-3">Create Post</h1>
        <div className="w-full flex flex-col gap-3">
          <input
            type="text"
            className="p-3 w-full rounded-lg border font-semibold dark:border dark:bg-transparent"
            placeholder="Caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
          <input
            type="text"
            className="p-3 w-full rounded-lg border font-semibold dark:border dark:bg-transparent"
            placeholder="Tags (separated by space)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
          <input
            type="file"
            hidden
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
            className="w-full rounded-lg border-white border-4 dark:border-opacity-70 border-dashed h-32 flex justify-center items-center disabled:opacity-50"
            onClick={() => imgInputRef?.current?.click()}
            disabled={loading}
          >
            <span className="py-4 px-8 max-xsm:py-2 max-xsm:px-4 rounded-lg bg-white bg-opacity-70 flex justify-center items-center gap-2 text-2xl hover:bg-opacity-50 dark:hover:bg-opacity-50">
              Choose <HiPhoto />
            </span>
          </button>
        </div>
        <div className="w-full max-h-[100px] grid grid-cols-3 center sm:grid-cols-4 gap-2 my-3 overflow-y-auto">
          {images &&
            images.map((img: any, i: any) => (
              <div className="relative" key={i}>
                <button
                  className="text-2xl absolute top-0 right-0 bg-red-500 text-white hover:scale-95"
                  onClick={() => handleImageRemove(img)}
                >
                  <FaXmark />
                </button>
                <Image
                  src={URL.createObjectURL(img) || "/noavatar.png"}
                  alt=""
                  width={100}
                  height={100}
                  className="w-full h-[100px] object-cover"
                />
              </div>
            ))}
        </div>
        <button
          className="bg-white hover:bg-opacity-50 dark:hover:bg-opacity-50 p-2 rounded-lg w-full font-semibold disabled:bg-opacity-50 dark:bg-slate-900"
          onClick={handleCreatePost}
          disabled={loading}
        >
          {loading ? "Loading..." : "Post"}
        </button>
      </div>
    </div>
  );
};

export default Create;
