export const authConfig = {
    pages: {
        signIn: "/login",
    },
    providers: [],
    callbacks: {
        async jwt({ token, user, trigger, session }: any) {
            if (user) {
                token.id = user.id;
                token.username = user.username;
                token.isAdmin = user.isAdmin;
                token.avatar = user.avatar;
            }
            if (trigger === "update") {
                return { ...token, ...session.user }
            }
            return token;
        },
        async session({ session, token }: any) {
            if (token) {
                session.user.id = token.id;
                session.user.username = token.username;
                session.user.isAdmin = token.isAdmin;
                session.user.avatar = token.avatar;
            }
            return session;
        },
        authorized({ auth, request }: any) {
            const user = auth?.user;

            const isOnProfilePage = request.nextUrl?.pathname?.startsWith("/profile");
            const isOnCreatePage = request.nextUrl?.pathname?.startsWith("/create");
            const isOnLoginPage = request.nextUrl?.pathname?.startsWith("/login");

            // ONLY AUTHENTICATED USERS CAN REACH PROFILE PAGE
            if (isOnProfilePage && !user) {
                return false;
            }
            if (isOnCreatePage && !user) {
                return false;
            }

            // ONLY UNAUTHENTICATED USERS CAN REACH LOGIN PAGE
            if (isOnLoginPage && user) {
                return Response.redirect(new URL("/", request.nextUrl));
            }

            return true;
        },
    },
};
