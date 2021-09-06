import { GetServerSideProps } from 'next';
import { authorize } from 'src/utils/authorize';

export const authRedirect: GetServerSideProps = async (context) => {
	try {
		const data = await authorize(context);

		if (!data.authorize.success) {
			throw new Error('Unauthorized');
		}

		return {
			props: {
				authorized: true,
				authorizedUser: data.authorize.user,
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
