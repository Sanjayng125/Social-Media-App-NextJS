import { auth } from "@/lib/auth";
import { connectToDb } from "@/lib/db";
import { Story } from "@/lib/models";
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

interface imagesProps {
    url: string
    public_id: string
}

export const POST = async (req: Request) => {
    const session = await auth()

    if (session && session?.user) {
        const body = await req.json()

        const images = body.images

        if (!images || images.length <= 0) {
            return Response.json({ status: "error", message: "Images are required" }, { status: 400 })
        }

        try {
            await connectToDb()

            const uploadPromises = images.map(async (image: string) => {

                return new Promise<imagesProps>(async (resolve, reject) => {
                    try {
                        const date = new Date()
                        const res = await cloudinary.uploader.upload(`${image}`, {
                            folder: `social_media_nextjs_app/${session?.user?.email}/stories/${date.getTime()}`
                        });

                        if (res?.secure_url) {
                            resolve({ url: res.secure_url, public_id: res.public_id });
                        } else {
                            reject("Image upload failed");
                        }
                    } catch (error) {
                        reject(error);
                    }
                });
            });

            const imageUrls = await Promise.all(uploadPromises);

            const newStory = new Story({
                imgs: imageUrls,
                expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
                user: {
                    userId: session.user.id,
                    username: session.user.username,
                    avatar: session.user.avatar.url
                },
            });

            await newStory.save();

            return Response.json({ status: "success", message: "Story Added" });
        } catch (error) {
            console.log(error);
            return Response.json({ status: "error", message: "Something went wrong!" });
        }
    } else {
        return new Response("Unauthenticated", {
            status: 401
        })
    }
}