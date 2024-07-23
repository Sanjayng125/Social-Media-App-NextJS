import { connectToDb } from "@/lib/db";
import { User, Post } from "@/lib/models";
import { imageProps } from "@/types";
import { NextRequest } from "next/server";

export interface Post {
    _id: string
    caption: string;
    createdAt: any
    createdBy: {
        username: string
        avatar: {
            url: string
        }
        _id: string
    };
    images: imageProps[]
    likes: string[]
    tags: string[]
}

export const GET = async (req: NextRequest, { params }: { params: { userId: string } }) => {
    try {
        await connectToDb();

        const limit = parseInt(req.nextUrl.searchParams.get("limit") || "10");
        const startIndex = parseInt(req.nextUrl.searchParams.get("startIndex") || "0");

        // Fetch the user with populated posts and likedPosts
        const user = await User.findById(params.userId).populate({
            path: "posts",
            options: {
                sort: { createdAt: -1 },
                limit: limit,
                skip: startIndex
            }
        }).select("posts");

        if (user) {
            const sortedPosts = (user.posts as Post[]).sort((a, b) => {
                const dateA = new Date(a.createdAt).getTime();
                const dateB = new Date(b.createdAt).getTime();
                return dateB - dateA;
            });

            user.posts = sortedPosts

            return new Response(JSON.stringify({ userPosts: user.posts }), {
                headers: { 'Content-Type': 'application/json' },
            });
        }
        return new Response(JSON.stringify({ userPosts: [] }), {
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ userPosts: [] }), {
            headers: { 'Content-Type': 'application/json' },
        });
    }
};
