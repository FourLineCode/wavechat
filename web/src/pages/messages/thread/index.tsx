import { defaultRedirect } from 'src/utils/redirects/default';

export default function ThreadIndex() {
	return null;
}

export const getServerSideProps = defaultRedirect('/messages');
