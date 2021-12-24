import { db } from "prisma/connection";

interface Params {
    query: string;
    cursor?: number | null;
    limit: number;
    userId: string;
}

export async function getDiscoverUsers({ query, cursor, limit, userId }: Params) {
    if (!query) return [];

    return await db.user.findMany({
        where: {
            AND: [
                {
                    OR: [
                        {
                            username: {
                                contains: query,
                                mode: "insensitive",
                            },
                        },
                        {
                            displayName: {
                                contains: query,
                                mode: "insensitive",
                            },
                        },
                    ],
                },
                {
                    id: {
                        not: userId,
                    },
                },
            ],
        },
        take: limit,
        skip: cursor !== null && cursor !== undefined ? 1 : undefined,
        cursor:
            cursor !== null && cursor !== undefined
                ? {
                      pk: cursor,
                  }
                : undefined,
        orderBy: {
            pk: "asc",
        },
    });
}
