import { auth } from "@/lib/auth"
import { connectToDb } from "@/lib/db"
import { User } from "@/lib/models"
import { encPassword, verifyPassword } from "@/lib/utils"

export const PATCH = async (req: Request) => {
    const session = await auth()

    if (session && session?.user) {
        try {
            const body = await req.json()
            const oldPassword = body.oldPassword
            const newPassword = body.newPassword


            await connectToDb()

            const user = await User.findById(session?.user.id)
            if (!user) {
                return Response.json({ status: "error", message: "User not found!" })
            }

            const isMatch = await verifyPassword(oldPassword, user.password)

            if (!isMatch) {
                return Response.json({ status: "error", message: "Incorrect password!" })
            }

            const newEncPassword = await encPassword(newPassword)

            const updatedUser = await User.findByIdAndUpdate(session?.user.id, { password: newEncPassword })

            if (!updatedUser) {
                return Response.json({ status: "error", message: "Something went wrong while updating password!" })
            }

            return Response.json({ status: "success", message: "Password updated" })
        } catch (error) {
            console.log(error);
            return Response.json({ status: "error", message: "Something went wrong!" })
        }
    } else {
        return new Response("Forbidden", {
            status: 403
        })
    }
}