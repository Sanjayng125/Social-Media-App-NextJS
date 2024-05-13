export const dynamic = "force-dynamic"
import { connectToDb } from "@/lib/db";
import { Post } from "@/lib/models";

export const GET = async () => {
    try {
        await connectToDb();

        const posts = await Post.find().populate("createdBy", "username _id avatar.url").sort({ "createdAt": -1 });

        if (posts.length > 0) {
            return Response.json({ posts });
        }

        return Response.json({ posts: [] });
    } catch (error) {
        console.log(error);
        return Response.json({ posts: [] });
    }
};
