"use client";
import { profileUpdate, updatePassword, updateProfilePhoto } from "@/lib/user";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Edit = () => {
  const { data: session, status, update } = useSession();
  const authLoading = status === "loading" || false;
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [currentUsername, setCurrentUsername] = useState("");
  const [username, setUsername] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resState, setResState] = useState({
    status: "",
    message: "",
  });

  useEffect(() => {
    if (session?.user) {
      setCurrentUsername(session?.user?.username || session?.user?.name || "");
      setUsername(session?.user?.username || session?.user?.name || "");
    }
    // console.log(session?.user);
  }, [session]);

  const handleProfileUpdate = async () => {
    if (username === "" || currentUsername === "") {
      alert("Invalid Username!");
      return;
    }
    try {
      setLoading(true);

      // const res = await profileUpdate(username, currentUsername);
      const api = await fetch("/api/user/updateProfile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, currentUsername }),
      });

      const res = await api.json();

      if (res?.status === "success") {
        await update({
          ...session,
          user: {
            ...session?.user,
            username: username,
          },
        });
        alert(res?.message);
      }
      setResState(res);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleProfilePhoto = async () => {
    if (profilePhoto) {
      try {
        setLoading(true);
        const reader = new FileReader();
        reader.readAsDataURL(profilePhoto);
        reader.onload = async () => {
          // const res = await updateProfilePhoto(reader.result);
          const api = await fetch("/api/user/updateProfilePhoto", {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ image: reader.result }),
          });
          const res = await api.json();
          setResState({
            status: res?.status,
            message: res?.message,
          });
          if (res.status === "success" && res.avatar) {
            await update({
              ...session,
              user: {
                ...session?.user,
                avatar: {
                  public_id: res?.avatar.public_id,
                  url: res?.avatar.url,
                },
              },
            });
            setProfilePhoto(null);
            alert(res.message);
          }
        };
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  };

  const handleUpdatePassword = async () => {
    if (oldPassword === "" || newPassword === "") {
      alert("Invalid password!");
      return;
    }
    if (oldPassword.length < 5 || newPassword.length < 5) {
      alert("Password length must be greater than 5!");
      return;
    }
    if (oldPassword === newPassword) {
      alert("Both password can't be same!");
      return;
    }
    if (session?.user) {
      setLoading(true);
      try {
        // const res = await updatePassword(
        //   session?.user?.id,
        //   oldPassword,
        //   newPassword
        // );
        const api = await fetch("/api/user/updatePassword", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ oldPassword, newPassword }),
        });
        const res = await api.json();
        if (res?.message) {
          alert(res.message);
        }
        if (res?.status === "success") {
          setOldPassword("");
          setNewPassword("");
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  };

  return (
    <div className="bg-purple-300 w-full h-full md:rounded md:p-3 text-white dark:bg-white dark:bg-opacity-10">
      {authLoading && (
        <h1 className="text-2xl font-bold text-center">Loading...</h1>
      )}
      {!authLoading && session?.user && (
        <div className="bg-purple-400 w-full h-full md:rounded flex flex-col items-center p-2 dark:bg-white dark:bg-opacity-30">
          <div className="flex flex-col gap-2 w-full items-center">
            <h1 className="text-2xl font-semibold">Update Profile</h1>
            <div className="flex flex-col items-center relative overflow-hidden rounded-full">
              <Image
                src={
                  (profilePhoto && URL.createObjectURL(profilePhoto)) ||
                  session.user.avatar.url ||
                  "/noavatar.png"
                }
                alt=""
                width={100}
                height={100}
                priority
                className="w-[100px] h-[100px] rounded-full cursor-pointer"
                onClick={() => fileRef?.current?.click()}
                onMouseOver={() => {
                  document.getElementById("photoLabel")?.classList.add("block");
                }}
                onMouseOut={() => {
                  document
                    .getElementById("photoLabel")
                    ?.classList.remove("block");
                }}
              />
              <input
                type="file"
                name="photo"
                id="photo"
                hidden
                ref={fileRef}
                accept="image/*"
                onChange={(e) =>
                  e.target.files !== null && setProfilePhoto(e.target.files[0])
                }
              />
              <label
                htmlFor="photo"
                id="photoLabel"
                className="w-full bg-slate-300 absolute bottom-0 p-1 pb-4 text-center text-xs text-white font-semibold rounded-b-lg"
                hidden
              >
                Choose Photo
              </label>
            </div>
            <button
              className="bg-green-600 p-2 rounded mb-3 font-semibold disabled:opacity-50"
              disabled={loading}
              hidden={!profilePhoto}
              onClick={() => handleProfilePhoto()}
            >
              {loading ? "Loading..." : "Change"}
            </button>
            <input
              type="text"
              placeholder="Username"
              className="w-4/5 p-2 rounded-md text-black dark:border dark:bg-transparent dark:text-white"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
            />
            {resState && resState?.status === "error" && (
              <p className="text-red-500">{resState?.message}</p>
            )}
            <button
              className="bg-purple-300 p-2 rounded mb-3 font-semibold disabled:opacity-50 dark:bg-slate-900"
              disabled={
                loading ||
                username.trim() === currentUsername ||
                username === ""
              }
              onClick={() => handleProfileUpdate()}
            >
              {loading ? "Loading..." : "Update"}
            </button>
          </div>
          <hr className="w-full mb-1" />
          <form
            action={handleUpdatePassword}
            className="flex flex-col gap-2 w-full items-center"
          >
            <h2 className="text-[18px] font-semibold">Update Password</h2>
            <div className="w-4/5 relative">
              <input
                type={`${showPassword ? "text" : "password"}`}
                placeholder="Old Password"
                className="w-full p-2 rounded-md text-black dark:border dark:bg-transparent dark:text-white"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
                disabled={loading}
              >
                {showPassword ? (
                  <FaEye className="text-black text-xl absolute top-[10px] right-[10px]" />
                ) : (
                  <FaEyeSlash className="text-black text-xl absolute top-[10px] right-[10px]" />
                )}
              </button>
            </div>
            <input
              type="text"
              placeholder="New Password"
              className="w-4/5 p-2 rounded-md text-black dark:border dark:bg-transparent dark:text-white"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              disabled={loading}
            />
            <button
              className="bg-purple-300 p-2 rounded font-semibold disabled:opacity-50 dark:bg-slate-900"
              disabled={loading || oldPassword === "" || newPassword === ""}
            >
              {loading ? "Loading..." : "Update"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Edit;
