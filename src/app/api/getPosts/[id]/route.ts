import { connectToDb } from "@/lib/db";
import { Post } from "@/lib/models";
import { type NextRequest } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
    try {
        await connectToDb()

        const queryParams = req.nextUrl.searchParams

        const getSimilarPosts = queryParams.get("similarPosts") || false

        const post = await Post.findById(params.id).populate("createdBy", "username _id avatar.url")

        if (post?.tags?.length > 0 && getSimilarPosts) {
            const similarPosts = await Post.find({ "tags": { $in: post.tags }, "_id": { $ne: params.id } })

            // regex
            // const similarPosts = await Post.find({
            //     "tags": { $regex: post.tags.join('|'), $options: 'i' },
            //     "_id": { $ne: params.id }
            //   });

            if (similarPosts) {
                return Response.json({ post, similarPosts })
            }
            return Response.json({ post, similarPosts: [] })
        }

        if (post) {
            return Response.json({ post })
        }
        return new Response(null)
    } catch (error) {
        console.log(error);
        return new Response(null)
    }
}