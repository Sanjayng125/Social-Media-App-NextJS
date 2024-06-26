import { auth } from "@/lib/auth";
import { connectToDb } from "@/lib/db";
import { User } from "@/lib/models";

export const PATCH = async (req: Request) => {
    const session = await auth()

    if (session && session?.user) {
        const body = await req.json()

        const username = body.username
        const currentUsername = body.currentUsername

        if (username.trim() === currentUsername) {
            return Response.json({ status: "error", message: "Change username to update" });
        }
        if (username && username !== "") {
            try {
                await connectToDb()
                const userExists = await User.findById(session?.user.id)

                if (!userExists) {
                    return Response.json({ status: "error", message: "User Not Found! Please login again." }, { status: 403 })
                }

                await User.findByIdAndUpdate(session?.user.id, { username: username })

                return Response.json({ status: "success", message: "Profile updated", username: username })
            } catch (error) {
                console.log(error);
                return Response.json({ status: "error", message: "Something went wrong!" })
            }
        } else {
            return Response.json({ status: "error", message: "Username is Required!" })
        }
    } else {
        return new Response("Forbidden", {
            status: 403
        })
    }
}