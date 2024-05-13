import { auth } from "@/lib/auth";
import { connectToDb } from "@/lib/db";
import { Post, User } from "@/lib/models";
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

        const caption = body.caption
        const tags = body.tags
        const images = body.images

        if (!caption || !tags || !images || images.length <= 0) {
            return Response.json({ status: "error", message: "All fields are required!" })
        }

        try {
            await connectToDb()

            const getTags = tags.split(" ");
            const allTags = getTags.filter((e: string) => e !== "");


            const uploadPromises = images.map(async (image: string) => {

                return new Promise<imagesProps>(async (resolve, reject) => {
                    try {
                        const date = new Date()
                        const res = await cloudinary.uploader.upload(`${image}`, {
                            folder: `social_media_nextjs_app/${session?.user?.email}/posts/${caption + date.getTime()}`
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

            // console.log(imageUrls);


            const newPost = new Post({
                createdBy: session?.user.id,
                caption,
                tags: allTags,
                images: imageUrls
            });

            await newPost.save();

            // console.log(newPost);

            await User.updateOne({ _id: session?.user.id }, { $push: { posts: newPost._id } })

            return Response.json({ status: "success", message: "Post Created" });
        } catch (error) {
            console.log(error);
            return Response.json({ status: "error", message: "Something went wrong!" });
        }
    } else {
        return new Response("Forbidden", {
            status: 403
        })
    }
}