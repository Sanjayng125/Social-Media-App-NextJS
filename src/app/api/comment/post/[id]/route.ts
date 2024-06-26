import { auth } from "@/lib/auth";
import { connectToDb } from "@/lib/db";
import { Comment, User } from "@/lib/models";

export const POST = async (req: Request, { params }: { params: { id: string } }) => {
    const session = await auth()

    if (session && session.user) {
        try {
            await connectToDb()
            const postId = params.id

            const { commentText } = await req.json()
            const userId = session.user.id

            const currentUser = await User.findById(session.user.id)

            if (!currentUser) {
                return Response.json({ status: "error", message: "User not found! Please login again." }, { status: 403 })
            }

            const newComment = await new Comment({ postId, commentBy: userId, commentText: commentText })

            await newComment.save()

            if (newComment) {
                return Response.json({ status: "success", message: "Comment Added" })
            }
            return Response.json({ status: "error", message: "Something went wrong!" })
        } catch (error) {
            console.log(error);
            return Response.json({ status: "error", message: "Something went wrong!" })
        }
    }
    return new Response("Forbidden", {
        status: 403
    })
}

export const GET = async (_req: Request, { params }: { params: { id: string } }) => {
    try {
        await connectToDb()

        const comments = await Comment.find({ postId: params.id }).select("commentBy commentText createdAt").populate("commentBy", "username avatar.url").sort({ "createdAt": -1 })

        if (comments) {
            return Response.json({ comments })
        }
        return Response.json({ comments: [] })
    } catch (error) {
        console.log(error);
        return Response.json({ comments: [] })
    }
}