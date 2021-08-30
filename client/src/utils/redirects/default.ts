import { GetServerSideProps } from 'next';
import { authorize } from 'src/utils/authorize';

type DefaultRedirectHandler = (route: string) => GetServerSideProps;

export const defaultRedirect: DefaultRedirectHandler = (route) => async (context) => {
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
			redirect: {
				destination: route,
				permanent: false,
			},
		};
	} catch (error) {
		return {
			props: {},
			redirect: {
				destination: route,
				permanent: false,
			},
		};
	}
};
