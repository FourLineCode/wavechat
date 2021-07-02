import { Session } from '@prisma/client';
import { builder } from '../builder';
import { UserObject } from './UserResolver';

export const SessionObject = builder.objectRef<Session>('Session');

SessionObject.implement({
	fields: (t) => ({
		id: t.exposeID('id'),
		createdAt: t.expose('createdAt', { type: 'Date' }),
		updatedAt: t.expose('updatedAt', { type: 'Date' }),
		userid: t.exposeID('userId'),
		user: t.field({
			type: UserObject,
			resolve: async (session, _args, { prisma }) => {
				return await prisma.user.findFirst({
					where: { id: session.userId },
					rejectOnNotFound: true,
				});
			},
		}),
	}),
});
