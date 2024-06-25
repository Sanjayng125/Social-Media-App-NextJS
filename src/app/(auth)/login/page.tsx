"use client";
import { login } from "@/lib/actions";
import Link from "next/link";
import React, { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";

const Login = () => {
  const [formState, formAction] = useFormState(login, undefined);
  const { pending } = useFormStatus();

  return (
    <div className="h-full flex flex-col items-center justify-center shadow-2xl bg-white md:rounded dark:bg-gradient-to-t dark:border-none dark:from-slate-800 dark:to-slate-500">
      <div className="flex flex-col text-center gap-5 p-3 rounded-lg bg-black bg-opacity-10 w-[90%] max-w-[400px]">
        <h1 className="text-2xl font-bold text-center">
          Welcome Back To SastaGram
        </h1>
        <h3 className="text-2xl font-bold text-center">Login</h3>
        <form action={formAction} className="flex flex-col gap-5">
          <input
            type="email"
            placeholder="Email"
            className="p-3 rounded-lg bg-white dark:bg-black dark:bg-opacity-10"
            name="email"
          />
          <input
            type="text"
            placeholder="Password"
            className="p-3 rounded-lg bg-white dark:bg-black dark:bg-opacity-10"
            name="password"
          />
          <button
            className="bg-white dark:bg-slate-900 p-3 rounded-lg font-bold text-xl hover:bg-black hover:bg-opacity-10 dark:hover:bg-opacity-30 disabled:opacity-50"
            disabled={pending}
          >
            {pending ? "Loading..." : "Login"}
          </button>
          {formState?.error && (
            <p className="text-red-500">{formState?.error}</p>
          )}
        </form>
        <Link href={"/register"} className="hover:underline">
          {"Don't have an acoount?"}
          <b>Register</b>
        </Link>
      </div>
    </div>
  );
};

export default Login;
