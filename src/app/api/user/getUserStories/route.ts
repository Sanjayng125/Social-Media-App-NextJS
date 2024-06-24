import { auth } from "@/lib/auth";
import { connectToDb } from "@/lib/db";
import { Story, User } from "@/lib/models";

export const GET = async () => {
    const session = await auth();

    if (session && session?.user) {
        try {
            await connectToDb();

            const currentUser = await User.findById(session.user.id).select('following');

            if (!currentUser) {
                return new Response("User not found", {
                    status: 404,
                    headers: { 'Content-Type': 'application/json' },
                });
            }

            const followingUserIds = currentUser.following.map((f: any) => f.toString());
            followingUserIds.push(session.user.id);

            const groupedStories = await Story.aggregate([
                {
                    $match: {
                        'user.userId': { $in: followingUserIds },
                        expiresAt: { $gt: new Date() }
                    }
                },
                {
                    $group: {
                        _id: {
                            userId: '$user.userId',
                            username: '$user.username',
                            avatar: '$user.avatar'
                        },
                        stories: {
                            $push: {
                                _id: '$_id',
                                imgs: {
                                    $map: {
                                        input: "$imgs",
                                        as: "img",
                                        in: {
                                            url: "$$img.url"
                                        }
                                    }
                                },
                                expiresAt: '$expiresAt',
                                createdAt: '$createdAt',
                                updatedAt: '$updatedAt'
                            }
                        }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        userId: '$_id.userId',
                        username: '$_id.username',
                        avatar: '$_id.avatar',
                        stories: 1
                    }
                }
            ]);

            return new Response(JSON.stringify({ userStories: groupedStories }), {
                headers: { 'Content-Type': 'application/json' },
            });

        } catch (error) {
            console.log(error);
            return new Response(JSON.stringify({ userStories: [] }), {
                headers: { 'Content-Type': 'application/json' },
            });
        }
    } else {
        return new Response("Forbidden", {
            status: 403
        });
    }
};
