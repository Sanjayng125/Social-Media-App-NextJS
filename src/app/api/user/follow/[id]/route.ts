import { auth } from "@/lib/auth";
import { connectToDb } from "@/lib/db";
import { User } from "@/lib/models";

export const PATCH = async (_req: Request, { params }: { params: { id: string } }) => {
    const session = await auth()

    if (session && session?.user) {
        try {
            await connectToDb()

            const following = await User.findOne({
                _id: session.user.id,
                "following": { $elemMatch: { $eq: params.id } }
            }).select("following")

            if (!following) {
                await User.updateOne({ _id: session?.user.id }, { $push: { following: params.id } })
                await User.updateOne({ _id: params.id }, { $push: { followers: session?.user.id } })
                return Response.json({ status: "success", message: "Following" });
            } else {
                await User.updateOne({ _id: session.user.id }, { $pull: { following: params.id } })
                await User.updateOne({ _id: params.id }, { $pull: { followers: session.user.id } })
                return Response.json({ status: "success", message: "Unfollowed" });
            }

        } catch (error) {
            console.log(error);
            return Response.json({ status: "error", message: "Something went wrong!" });
        }
    }
    return new Response("Forbidden", {
        status: 403
    })
}

export const GET = async (_req: Request, { params }: { params: { id: string } }) => {
    const session = await auth()

    if (session && session?.user) {
        try {
            await connectToDb()

            const following = await User.findOne({
                _id: session.user.id,
                "following": { $elemMatch: { $eq: params.id } }
            }).select("following")

            if (following !== null && following.following.length > 0) {
                return Response.json({ following: true });
            }

            return Response.json({ following: false });
        } catch (error) {
            console.log(error);
            return Response.json({ status: "error", message: "Something went wrong!" });
        }
    }
    return new Response("Forbidden", {
        status: 403
    })
}