import { useState } from 'react';
import { DiscoverPageLayout } from 'src/components/discover/DiscoverPageLayout';

export function DiscoverUsersPage() {
	const [searchUsername, setSearchUsername] = useState('');

	return (
		<DiscoverPageLayout
			title='Search for people you may know'
			placeholder='Username...'
			callback={async ({ searchTerm }) => {
				setSearchUsername(searchTerm);
			}}
		>
			<div className='flex items-center justify-center flex-1 text-3xl'>
				Search term: '{searchUsername}'
			</div>
		</DiscoverPageLayout>
	);
}
