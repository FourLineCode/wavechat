import { defaultRedirect } from 'src/utils/redirects/default';

export default function Discover() {
	return null;
}

export const getServerSideProps = defaultRedirect('/discover/users');
