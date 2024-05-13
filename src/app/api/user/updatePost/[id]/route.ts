import { auth } from "@/lib/auth";
import { connectToDb } from "@/lib/db";
import { Post } from "@/lib/models";

export const PATCH = async (req: Request, { params }: { params: { id: string } }) => {
    const session = await auth()

    if (session && session?.user) {
        const body = await req.json()

        const caption = body.caption
        const tags = body.tags

        if (!caption || !tags) {
            return Response.json({ status: "error", message: "All fields are required!" })
        }

        try {
            await connectToDb()

            const getTags = tags.split(" ");
            const allTags = getTags.filter((e: string) => e !== "");

            const post = await Post.findById(params.id)

            if (session.user.id === post.createdBy.toString()) {

                const updatedPost = await Post.findByIdAndUpdate(params.id, {
                    caption,
                    tags: allTags,
                });

                if (updatedPost) {
                    return Response.json({ status: "success", message: "Post Updated" });
                }

                return Response.json({ status: "error", message: "Something went wrong while updating post!" });
            }
            // return Response.json({ status: "error", message: "You can only update your posts!!!" });
            return new Response("Forbidden. You can only update your posts!!!", {
                status: 403,
            })
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