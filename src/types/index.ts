export interface IUser {
    _id: string
    username: string
    email: string,
    isAdmin?: boolean
    avatar: {
        url: string,
        public_id?: string
    },
    followers: string[],
    following: string[],
    posts: Post[],
}

export interface SingleStoryProps {
    _id?: string
    imgs: {
        url: string | File
    }[]
    expiresAt: string
    user: {
        userId: string
        username: string
        avatar: string,
    }
    createdAt: string
}

export interface MultipleStoryProps {
    userId: string
    avatar: string,
    username: string
    stories: SingleStoryProps[]
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