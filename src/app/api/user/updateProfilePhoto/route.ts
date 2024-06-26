import { auth } from "@/lib/auth"
import { connectToDb } from "@/lib/db"
import { User } from "@/lib/models"
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const PATCH = async (req: Request) => {
    const session = await auth()

    if (session && session?.user) {
        const body = await req.json()
        const image = body.image

        try {
            await connectToDb()

            const currentUser = await User.findById(session.user.id)

            if (!currentUser) {
                return Response.json({ status: "error", message: "User not found! Please login again." }, { status: 403 })
            }

            if (session?.user.avatar.public_id && session?.user.avatar.public_id !== null) {
                await cloudinary.uploader.destroy(session?.user.avatar.public_id)
            }
            const res = await cloudinary.uploader.upload(image, {
                folder: `social_media_nextjs_app/${session?.user?.email}/avatar`
            })

            if (res?.secure_url) {
                await User.findByIdAndUpdate(session?.user.id, {
                    avatar: {
                        public_id: res?.public_id,
                        url: res.secure_url
                    }
                })
                return Response.json({
                    status: "success", message: "Profile photo updated", avatar: {
                        public_id: res?.public_id,
                        url: res.secure_url
                    }
                })
            } else {
                return Response.json({ status: "error", message: "Something went wrong!" })
            }
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