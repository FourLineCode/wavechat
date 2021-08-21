import { gql } from '@apollo/client';
import { GetServerSideProps } from 'next';
import { serverSidedClient } from 'src/apollo/client';
import { AuthorizeQuery } from 'src/apollo/__generated__/types';

export const authRedirect: GetServerSideProps = async function (context) {
	try {
		const { data } = await serverSidedClient.query<AuthorizeQuery>({
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

		if (!data.authorize.success) {
			throw new Error('Unauthorized');
		}

		return {
			props: {
				user: data.authorize.user,
			},
		};
	} catch (error) {
		return {
			props: {},
			redirect: {
				destination: `/signin?redirect=true&from=${context.req.url}`,
				permanent: false,
			},
		};
	}
};
