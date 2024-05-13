import { auth } from "@/lib/auth";
import { connectToDb } from "@/lib/db";
import { Post, User } from "@/lib/models";
import { type NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
    const session = await auth()
    try {
        await connectToDb()

        const queryParams = req.nextUrl.searchParams

        const show = queryParams.get("show") || "posts"
        const query = queryParams.get("q") || ""

        if (show === "posts") {
            const posts = await Post.find({
                $or: [
                    { caption: { $regex: query, $options: 'i' } },
                    { tags: { $elemMatch: { $regex: query, $options: 'i' } } }
                    // Add more fields and values as needed
                ]
            })
            return Response.json({ posts })
        }
        else if (show === "peoples") {
            if (session && session.user) {
                const peoples = await User.find({
                    _id: { $ne: session.user.id },
                    username: { $regex: query, $options: "i" }
                }).select("avatar.url username")
                return Response.json({ peoples })

            }
            const peoples = await User.find({
                username: { $regex: query, $options: "i" }
            }).select("avatar.url username")
            return Response.json({ peoples })
        }

        return Response.json({ message: "Not Allowed" })
    } catch (error) {
        console.log(error);
        return Response.json({ posts: [] })
    }
}