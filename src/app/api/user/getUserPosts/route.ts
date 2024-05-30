import { auth } from "@/lib/auth";
import { connectToDb } from "@/lib/db";
import { User, Post } from "@/lib/models";
import { imageProps } from "@/types";

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

export const GET = async () => {
    const session = await auth();

    if (session && session?.user) {
        try {
            await connectToDb();

            // Fetch the user with populated posts and likedPosts
            const user = await User.findById(session?.user?.id).populate("posts likedPosts").select("posts likedPosts");

            if (user) {
                // Type assertion to ensure TypeScript understands the type
                const sortedPosts = (user.posts as Post[]).sort((a, b) => {
                    const dateA = new Date(a.createdAt).getTime();
                    const dateB = new Date(b.createdAt).getTime();
                    return dateB - dateA;
                });

                user.posts = sortedPosts

                // Return the user posts with the sorted posts
                return new Response(JSON.stringify({ userPosts: user }), {
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
    } else {
        return new Response("Forbidden", {
            status: 403
        });
    }
};
