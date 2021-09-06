import { gql } from '@apollo/client';
import { GetServerSidePropsContext } from 'next';
import { client } from 'src/apollo/client';
import { AuthorizeQuery } from 'src/apollo/__generated__/types';

export async function authorize(context: GetServerSidePropsContext): Promise<AuthorizeQuery> {
	const { data } = await client.query<AuthorizeQuery>({
		query: gql`
			query Authorize {
				authorize {
					success
					user {
						id
						email
						username
						displayName
						avatarUrl
						role
						createdAt
						updatedAt
						university
						department
						semester
					}
				}
			}
		`,
		context: {
			headers: {
				cookie: context.req.headers.cookie,
			},
		},
		fetchPolicy: 'no-cache',
	});

	return data;
}
