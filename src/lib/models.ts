import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    avatar: {
        public_id: {
            type: String,
            default: null
        },
        url: {
            type: String,
            default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
        },
    },
    posts: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
        default: []
    },
    likedPosts: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
        default: []
    },
    followers: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        default: []
    },
    following: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        default: []
    },
}, { timestamps: true })

const postSchema = new mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    caption: {
        type: String,
        required: true
    },
    tags: {
        type: Array,
        required: true
    },
    images: {
        type: [{ url: { type: String }, public_id: { type: String } }],
        required: true
    },
    likes: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        default: []
    },
}, { timestamps: true })

const commentSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
    },
    commentBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    commentText: {
        type: String
    },
}, { timestamps: true })

export const User = mongoose.models.User || mongoose.model("User", userSchema)
export const Post = mongoose.models.Post || mongoose.model("Post", postSchema)
export const Comment = mongoose.models.Comment || mongoose.model("Comment", commentSchema)