export const dynamic = "force-dynamic"
import { connectToDb } from "@/lib/db";
import { Post } from "@/lib/models";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
    try {
        await connectToDb();

        const limit = parseInt(req.nextUrl.searchParams.get("limit") || "10");
        const startIndex = parseInt(req.nextUrl.searchParams.get("startIndex") || "0");

        const posts = await Post.find().populate("createdBy", "username _id avatar.url").sort({ "createdAt": -1 }).limit(limit).skip(startIndex);

        if (posts.length > 0) {
            return Response.json({ posts });
        }

        return Response.json({ posts: [] });
    } catch (error) {
        console.log(error);
        return Response.json({ posts: [] });
    }
};
