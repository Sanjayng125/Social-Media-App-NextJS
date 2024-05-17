"use client";
import { login } from "@/lib/actions";
import Link from "next/link";
import React from "react";
import { useFormState, useFormStatus } from "react-dom";

const Login = () => {
  const [formState, formAction] = useFormState(login, undefined);

  // useEffect(() => {
  //   if (formState?.message === "success") {
  //     router.push("/");
  //   }
  // }, [formState]);

  return (
    <div className="h-full flex flex-col items-center justify-center bg-gradient-to-t from-pink-500 to-purple-700 md:rounded dark:from-slate-800 dark:to-slate-500">
      <div className="flex flex-col text-center gap-5 p-3 rounded-lg bg-white bg-opacity-50 w-[90%] max-w-[400px]">
        <h1 className="text-2xl font-bold text-center text-white">
          Welcome Back To SastaGram
        </h1>
        <h3 className="text-2xl font-bold text-center text-white">Login</h3>
        <form action={formAction} className="flex flex-col gap-5">
          <input
            type="email"
            placeholder="Email"
            className="p-3 rounded-lg bg-white text-black"
            name="email"
          />
          <input
            type="text"
            placeholder="Password"
            className="p-3 rounded-lg bg-white text-black"
            name="password"
          />
          <button className="bg-white text-white bg-opacity-50 p-3 rounded-lg font-bold text-xl hover:opacity-90">
            Login
          </button>
          {formState?.error && (
            <p className="text-red-500">{formState?.error}</p>
          )}
        </form>
        <Link href={"/register"} className="hover:underline text-white">
          {"Don't have an acoount?"}
          <b>Register</b>
        </Link>
      </div>
    </div>
  );
};

export default Login;
