"use server"

import { connectToDb } from "./db";
import { User } from "./models";
import { signIn, signOut } from "./auth";
import { encPassword } from "./utils";

export const register = async (prevState: any, formData: FormData) => {
    try {
        connectToDb()
        const username = formData.get("username")
        const email = formData.get("email")
        const password = formData.get("password")

        if (!username || !email || !password) {
            return {
                message: "error",
                error: "All fields are required!",
            }
        }

        const emailExists = await User.find({ email })
        if (emailExists.length > 0) {
            return {
                message: "error",
                error: "Email already taken",
            }
        }

        let hashedPassword;
        if (typeof password === "string") {
            hashedPassword = await encPassword(password)
        }
        else {
            return {
                message: "error",
                error: "Password is required!",
            }
        }

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })
        await newUser.save()

        return {
            message: "success",
            error: undefined,
        }

    } catch (error) {
        if (error instanceof Error) {
            console.log(error);
            throw new Error(error?.message || "Something went wrong while registering")
        }
    }
}


export const login = async (prevState: any, formData: FormData) => {
    // const { email, password } = Object.fromEntries(formData);
    const email = formData.get("email")
    const password = formData.get("password")

    try {
        const user = await signIn("credentials", { email, password });

        if (user) {
            return { error: undefined, message: "success" };
        }
    } catch (error) {
        // console.log(error);

        if (error instanceof Error && error.message.includes("CredentialsSignin")) {
            return { error: "Invalid Email or Password", message: "error" };
        }
        throw error;
        // return { error: "User already exists!" };
    }
};

export const handleLogOut = async () => {
    await signOut({ redirect: true, redirectTo: "/login" });
};