import NextAuth, { DefaultSession } from "next-auth"

// Declaring Next auth session to add extra fields id and username for typescript.
declare module "next-auth" {
    interface Session {
        user: {
            id: string
            username: string
            avatar: {
                public_id: string | null
                url: string
            }
        } & DefaultSession["user"]
    }
}

export interface IUser {
    _id: string
    username: string
    email: string,
    avatar: {
        url: string,
        public_id?: string
    },
    followers: string[],
    following: string[],
    posts: Post[],
}

export interface Comment {
    commentBy: {
        _id: string,
        username: string
        avatar: {
            url: string
        }
    }
    commentText: string
    createdAt: string
}

export interface imageProps {
    url: string
    public_id?: string
}

export interface Post {
    _id: string
    caption: string;
    createdBy: {
        username: string
        avatar: {
            url: string
        }
        _id: string
    };
    images: imageProps[]
    likes: string[]
    tags: string[]
}

export interface PostPageProps {
    post: Post | null
    similarPosts: Post[]
}