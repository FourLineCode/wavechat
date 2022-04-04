import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import { db } from "prisma/connection";
import { JWTPayload } from "src/graphql/resolvers/auth.resolver";
import { services } from "src/services";

interface RtcAuthResponse {
  authorized: boolean;
  user: User | null;
}

interface MessageThreadParams {
  threadId: string;
  userId: string;
}

export async function authorize(sessionToken: string): Promise<RtcAuthResponse> {
  const verified = jwt.verify(sessionToken, process.env.JWT_SECRET!);

  if (!verified) {
    return { authorized: false, user: null };
  }

  const { sessionId, userId } = jwt.decode(sessionToken) as JWTPayload;

  const session = await db.session.findFirst({
    where: {
      id: sessionId,
      userId: userId,
    },
    include: {
      user: true,
    },
  });

  if (!session) {
    return { authorized: false, user: null };
  }

  return { authorized: true, user: session.user };
}

export async function authorizeJoinRoom({ threadId, userId }: MessageThreadParams) {
  const thread = await services.messageThread.getThreadById({ threadId, userId });

  return !!thread;
}
