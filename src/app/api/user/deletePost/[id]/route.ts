import { auth } from "@/lib/auth";
import { connectToDb } from "@/lib/db";
import { Comment, Post, User } from "@/lib/models";
import { imageProps } from "@/types";
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const DELETE = async (_req: Request, { params }: { params: { id: string } }) => {
    const session = await auth()

    if (session && session.user) {
        try {
            await connectToDb()

            const currentUser = await User.findById(session.user.id)

            if (!currentUser) {
                return Response.json({ status: "error", message: "User not found! Please login again." }, { status: 403 })
            }

            const post = await Post.findById(params.id)

            if (!post) {
                return Response.json({ status: "error", message: "Post not found!" })
            }

            if (post && post.createdBy.toString() === session.user.id) {
                const deletePromises = post.images.map(async (img: imageProps) => {
                    return new Promise(async (resolve, reject) => {
                        try {
                            resolve(await cloudinary.uploader.destroy(img?.public_id as string))
                        } catch (error) {
                            reject(error);
                        }
                    });
                })

                await Promise.all(deletePromises)

                // remove post from users liked posts
                await User.updateMany({}, { $pull: { likedPosts: params.id } })

                // remove post comments
                await Comment.deleteMany({ postId: params.id })

                // delete post
                await Post.findByIdAndDelete(params.id)

                return Response.json({ status: "success", message: "Post Deleted!" })
            }
            return new Response("Forbidden!. You can only delete yuor posts!!!", {
                status: 403
            })
        } catch (error) {
            console.log(error);
        }
    }
    return new Response("Forbidden!. Please login first!!!", {
        status: 403
    })
}