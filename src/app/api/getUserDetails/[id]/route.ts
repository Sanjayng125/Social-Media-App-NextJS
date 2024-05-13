import { connectToDb } from "@/lib/db";
import { User } from "@/lib/models";

export const GET = async (_req: Request, { params }: { params: { id: string } }) => {
    try {
        await connectToDb()

        const userDetails = await User.findOne({ _id: params.id }).select("username email avatar.url followers following posts").populate("posts")

        if (userDetails) {
            return Response.json({ userDetails })
        }
        return Response.json({userDetails: null})
    } catch (error) {
        console.log(error);
        return Response.json({userDetails: null})
    }
}