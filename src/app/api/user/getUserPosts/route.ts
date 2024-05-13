import { auth } from "@/lib/auth"
import { connectToDb } from "@/lib/db";
import { User } from "@/lib/models";

export const GET = async () => {
    const session = await auth()

    if (session && session?.user) {
        try {
            await connectToDb()

            const userPosts = await User.findById(session?.user?.id).populate("posts likedPosts").select("posts likedPosts").sort({ "createdAt": -1 })

            if (userPosts) {
                return Response.json({ userPosts })
            }
            return Response.json({ userPosts: [] })

        } catch (error) {
            console.log(error);
            return Response.json({ userPosts: [] })
        }
    } else {
        return new Response("Forbidden", {
            status: 403
        })
    }
}