import 'next-auth'
import { DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt" // can remove this.

// Declaring Next auth session to add extra fields id and username for typescript.
declare module "next-auth" {
    interface User {
        _id: string
        username: string
        avatar: {
            public_id: string | null
            url: string
        }
        isAdmin: boolean
    }
    interface Session {
        user: {
            id: string
            username: string
            avatar: {
                public_id: string | null
                url: string
            }
            isPrivate: boolean
            isAdmin: boolean
        } & DefaultSession["user"]
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        id: string
        username: string
        avatar: {
            public_id: string | null
            url: string
        }
        isAdmin: boolean
    }
}
