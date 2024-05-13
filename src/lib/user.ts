"use server"
import { auth } from "./auth";
import { v2 as cloudinary } from 'cloudinary';
import { connectToDb } from "./db";
import { Post, User } from "./models";
import { encPassword, verifyPassword } from "./utils";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const profileUpdate = async (username: string, currentUsername: string) => {
    const session = await auth()
    if (username.trim() === currentUsername) {
        return { status: "error", message: "Change username to update" };
    }
    if (username && username !== "") {
        try {
            await connectToDb()
            const userExists = await User.findById(session?.user.id)

            if (!userExists) {
                return ({ status: "error", message: "User Not Found!" })
            }

            await User.findByIdAndUpdate(session?.user.id, { username: username })

            return ({ status: "success", message: "Profile updated", username: username })
        } catch (error) {
            console.log(error);
            return ({ status: "error", message: "Something went wrong!" })
        }
    } else {
        return ({ status: "error", message: "Username is Required!" })
    }
}

export const updateProfilePhoto = async (image: any) => {
    try {
        await connectToDb()
        const session = await auth()
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
            return {
                status: "success", message: "Profile photo updated", avatar: {
                    public_id: res?.public_id,
                    url: res.secure_url
                }
            }
        } else {
            return { status: "error", message: "Something went wrong!" }
        }
    } catch (error) {
        console.log(error);
        return { status: "error", message: "Something went wrong!" }
    }
}

export const updatePassword = async (userId: string, oldPassword: string, newPassword: string) => {
    try {
        await connectToDb()

        const user = await User.findById(userId)
        if (!user) {
            return { status: "error", message: "User not found!" }
        }

        const isMatch = await verifyPassword(oldPassword, user.password)

        if (!isMatch) {
            return { status: "error", message: "Incorrect password!" }
        }

        const newEncPassword = await encPassword(newPassword)

        const updatedUser = await User.findByIdAndUpdate(userId, { password: newEncPassword })

        if (!updatedUser) {
            return { status: "error", message: "Something went wrong while updating password!" }
        }

        return { status: "success", message: "Password updated" }
    } catch (error) {
        console.log(error);
        return { status: "error", message: "Something went wrong!" }
    }
}

export const createPost = async (caption: string, tags: string, images: string | any) => {
    if (!caption || !tags || !images || images.length <= 0) {
        return { status: "error", message: "All fields are required!" }
    }

    try {
        await connectToDb()
        const session = await auth()

        const getTags = tags.split(" ");
        const allTags = getTags.filter((e) => e !== "");


        const uploadPromises = images.map(async (image: string) => {

            return new Promise<string>(async (resolve, reject) => {
                try {
                    const date = new Date()
                    const res = await cloudinary.uploader.upload(`${image}`, {
                        folder: `social_media_nextjs_app/${session?.user?.email}/posts/${caption + date.getTime()}`
                    });

                    if (res?.secure_url) {
                        resolve(res.secure_url);
                    } else {
                        reject("Image upload failed");
                    }
                } catch (error) {
                    reject(error);
                }
            });
        });

        const imageUrls = await Promise.all(uploadPromises);

        const newPost = new Post({
            createdBy: session?.user.id,
            caption,
            tags: allTags,
            images: imageUrls
        });

        await newPost.save();

        // console.log(newPost);

        await User.updateOne({ _id: session?.user.id }, { $push: { posts: newPost._id } })

        return { status: "success", message: "Post Created" };
    } catch (error) {
        console.log(error);
        return { status: "error", message: "Something went wrong!" };
    }
}
