import { builder } from 'src/graphql/builder';
import { services } from 'src/services';

builder.queryField('authorizeRtcConn', (t) =>
	t.field({
		type: 'Boolean',
		description: 'Authorizes any rtc connection',
		authScopes: { internal: true },
		args: { sessionId: t.arg({ type: 'String', required: true }) },
		resolve: async (_parent, { sessionId }) => {
			return await services.rtcService.authorize(sessionId);
		},
	})
);

builder.queryField('joinRtcRoom', (t) =>
	t.field({
		type: 'Boolean',
		description: 'Authorize a user to join a rtc socket room',
		authScopes: { internal: true },
		args: {
			threadId: t.arg({ type: 'String', required: true }),
			userId: t.arg({ type: 'String', required: true }),
		},
		resolve: async (_parent, { threadId, userId }) => {
			return services.rtcService.authorizeJoinRoom({ threadId, userId });
		},
	})
);
