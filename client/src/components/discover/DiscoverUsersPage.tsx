import { DiscoveredUser } from 'src/components/discover/DiscoveredUser';
import { DiscoverPageLayout } from 'src/components/discover/DiscoverPageLayout';
import { useAuth } from 'src/store/useAuth';

export function DiscoverUsersPage() {
	const user = useAuth().user;

	return (
		<DiscoverPageLayout
			title='Search for people you may know'
			placeholder='Username...'
			callback={async ({ searchTerm }) => {}}
		>
			<div className='grid grid-cols-2 gap-2 overflow-y-auto 2xl:grid-cols-4'>
				{Array.from({ length: 6 }).map((_, i) => (
					<DiscoveredUser user={user} />
				))}
			</div>
		</DiscoverPageLayout>
	);
}
