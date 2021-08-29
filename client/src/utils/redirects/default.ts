import { GetServerSideProps } from 'next';

type DefaultRedirectHandler = (route: string) => GetServerSideProps;

export const defaultRedirect: DefaultRedirectHandler = (route) => async () => {
	return {
		props: {},
		redirect: {
			destination: route,
			permanent: false,
		},
	};
};
