"use client";
import { register } from "@/lib/actions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

const Register = () => {
  const router = useRouter();
  const loading = useFormStatus();
  const [formState, formAction] = useFormState(register, undefined);

  useEffect(() => {
    if (formState?.message === "success") {
      router.push("/login");
    }
  }, [formState]);

  return (
    <div className="h-full flex flex-col items-center justify-center bg-gradient-to-t from-pink-500 to-purple-700 md:rounded dark:from-slate-800 dark:to-slate-500">
      <div className="flex flex-col text-center gap-5 p-3 rounded-lg bg-white bg-opacity-50 w-[90%] max-w-[400px]">
        <h1 className="text-2xl font-bold text-center text-white">
          Welcome To SastaGram
        </h1>
        <h3 className="text-2xl font-bold text-center text-white">Register</h3>
        <form className="flex flex-col gap-5 text-black" action={formAction}>
          <input
            type="text"
            placeholder="Username"
            className="p-3 rounded-lg bg-white text-black"
            name="username"
          />
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
          <div className="w-full flex flex-col">
            <button className="bg-white bg-opacity-50 p-3 rounded-lg font-bold text-xl hover:opacity-90 text-white">
              Register
            </button>
            {formState?.error && (
              <p className="text-red-500 m-0">{formState.error}</p>
            )}
          </div>
        </form>
        <Link href={"/login"} className="hover:underline text-white">
          Already have an acoount?
          <b>Login</b>
        </Link>
      </div>
    </div>
  );
};

export default Register;
