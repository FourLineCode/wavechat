import { Tab } from '@headlessui/react';
import clsx from 'clsx';
import { FriendsList } from 'src/components/friends/FriendsList';
import { Requestslist } from 'src/components/friends/RequestsList';

const tabs = [
	{
		id: 'friends',
		title: 'Friends',
		component: FriendsList,
	},

	{ id: 'requests', title: 'Requests', component: Requestslist },
];

export function FriendsInfo() {
	return (
		<div className='w-64 h-full p-2 xl:w-80 bg-dark-800'>
			<Tab.Group>
				<Tab.List className='flex w-full overflow-hidden rounded-lg'>
					{tabs.map((tab) => (
						<Tab
							className={({ selected }) =>
								clsx(
									'flex-1 p-1.5 flex justify-center items-center bg-dark-700 transition focus:outline-none font-semibold text-lg',
									selected
										? 'bg-brand-500'
										: 'hover:bg-brand-300 hover:bg-opacity-30'
								)
							}
							key={tab.id}
						>
							{tab.title}
						</Tab>
					))}
				</Tab.List>
				<Tab.Panels>
					<Tab.Panel>
						<FriendsList />
					</Tab.Panel>
					<Tab.Panel>
						<Requestslist />
					</Tab.Panel>
				</Tab.Panels>
			</Tab.Group>
		</div>
	);
}
