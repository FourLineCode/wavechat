import { ObjectRef } from "@pothos/core";
import { User } from "@prisma/client";
import { builder } from "src/graphql/builder";
import { UserObject } from "src/graphql/resolvers/user.resolver";
import { services } from "src/services";

interface SocketAuthorizedResponse {
  authorized: boolean;
  user: User | null;
}

const SocketAuthorizedResponseObject: ObjectRef<
  SocketAuthorizedResponse,
  SocketAuthorizedResponse
> = builder.objectRef<SocketAuthorizedResponse>("SocketAuthorizedResponse").implement({
  description: "Response object for authorized socket connections",
  fields: (t) => ({
    authorized: t.exposeBoolean("authorized"),
    user: t.expose("user", { type: UserObject, nullable: true }),
  }),
});

builder.queryField("isSocketAuthorized", (t) =>
  t.field({
    type: SocketAuthorizedResponseObject,
    description: "Authorizes any rtc connection",
    authScopes: { internal: true },
    args: { sessionId: t.arg({ type: "String", required: true }) },
    resolve: async (_parent, { sessionId }) => {
      return await services.rtc.authorize(sessionId);
    },
  })
);

builder.queryField("isUserInThread", (t) =>
  t.field({
    type: "Boolean",
    description: "Authorize a user to join a rtc socket room",
    authScopes: { internal: true },
    args: {
      threadId: t.arg({ type: "String", required: true }),
      userId: t.arg({ type: "String", required: true }),
    },
    resolve: async (_parent, { threadId, userId }) => {
      return services.rtc.authorizeJoinRoom({ threadId, userId });
    },
  })
);
