import { auth } from "@/lib/auth";
import { connectToDb } from "@/lib/db";
import { User } from "@/lib/models";
import { type NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
    const session = await auth()

    if (session && session.user) {
        try {
            await connectToDb()

            const currentUser = await User.findById(session.user.id)

            if (!currentUser) {
                return Response.json({ userDetails: null })
            }


            const queryParams = req.nextUrl.searchParams

            const limit = queryParams.get("limit") || false

            const populate = queryParams.get("populate") || false

            let userDetails;

            if (limit && +limit > 0 && populate) {
                userDetails = await User.findOne({ _id: session.user.id }).select("followers following").sort({ "createdAt": -1 }).populate("followers", "avatar.url username").populate("following", "avatar username")
                if (userDetails && userDetails !== null) {
                    userDetails.followers = userDetails.followers.slice(0, parseInt(limit));
                    userDetails.following = userDetails.following.slice(0, parseInt(limit));
                }
            } else if (limit && +limit > 0) {
                userDetails = await User.findOne({ _id: session.user.id }).select("followers following").sort({ "createdAt": -1 })
                if (userDetails && userDetails !== null) {
                    userDetails.followers = userDetails.followers.slice(0, parseInt(limit));
                    userDetails.following = userDetails.following.slice(0, parseInt(limit));
                }
            } else {
                userDetails = await User.findOne({ _id: session.user.id }).select("followers following")
            }

            if (userDetails) {
                return Response.json({ userDetails })
            }
            return Response.json({ userDetails: null })
        } catch (error) {
            console.log(error);
            return Response.json({ userDetails: null })
        }
    }
    return new Response("Forbidden!!", {
        status: 403
    })
}