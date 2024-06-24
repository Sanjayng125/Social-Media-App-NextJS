import { auth } from "@/lib/auth";
import { connectToDb } from "@/lib/db";
import { Post, User } from "@/lib/models";

export const GET = async (_req: Request, { params }: { params: { id: string } }) => {
    try {
        await connectToDb()

        const postLikes = await Post.findById(params.id).select("likes")

        return Response.json({ postLikes })
    } catch (error) {
        console.log(error);
        return new Response(null)
    }
}

export const PATCH = async (_req: Request, { params }: { params: { id: string } }) => {
    const session = await auth()

    if (session && session.user) {
        try {
            const postLiked = await Post.findOne({
                _id: params.id,
                "likes": { $elemMatch: { $eq: session.user.id } }
            }).select("likes")


            if (postLiked !== null) {
                await Post.updateOne({ _id: params.id }, { $pull: { likes: session.user.id } })
                await User.updateOne({ _id: session.user.id }, { $pull: { likedPosts: params.id } })
                return Response.json({ status: "success", message: "Disliked" });
            } else {
                await Post.updateOne({ _id: params.id }, { $push: { likes: session.user.id } })
                await User.updateOne({ _id: session.user.id }, { $push: { likedPosts: params.id } })
                return Response.json({ status: "success", message: "Liked" });
            }
        } catch (error) {
            console.log(error);
            return Response.json({ status: "error", message: "Something went wrong!" });
        }
    }
    return new Response("Forbidden!", {
        status: 403
    })
}