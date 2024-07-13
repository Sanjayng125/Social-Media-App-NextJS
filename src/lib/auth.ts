import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDb } from "./db";
import { User } from "@/lib/models";
import { verifyPassword } from "@/lib/utils";
import { authConfig } from "./auth.config";

const login = async (credentials: { email: string, password: string }) => {
    try {
        connectToDb();
        // console.log(credentials?.username);
        if (!credentials?.email) {
            return null
        }

        const user = await User.findOne({ email: credentials?.email });
        // console.log(user);

        if (!user) {
            throw new Error("User not found!");
        }

        const isPasswordCorrect = await verifyPassword(
            credentials?.password,
            user?.password
        );

        if (!isPasswordCorrect) {
            throw new Error("Invalid credentials!");
        }

        const { password: pass, ...rest } = user._doc

        return rest;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to login!");
    }
};

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials: any) {
                if (!credentials?.email || !credentials?.password) {
                    return null
                }
                try {
                    const user = await login(credentials);
                    if (user) {
                        return user;
                    }
                    return null
                } catch (error) {
                    return null
                }
            }
        }),
    ],
    callbacks: {
        ...authConfig.callbacks,
    }
})