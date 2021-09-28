import { Tab } from '@headlessui/react';
import clsx from 'clsx';
import { Fragment } from 'react';
import { FriendsList } from 'src/components/friends/FriendsList';
import { RequestsList } from 'src/components/friends/RequestsList';

const tabs = [
	{
		id: 'friends',
		title: 'Friends',
		Component: FriendsList,
	},

	{ id: 'requests', title: 'Requests', Component: RequestsList },
];

export function FriendsInfo() {
	return (
		<div className='w-64 h-full overflow-y-auto scrollbar-none xl:w-80 bg-dark-800'>
			<Tab.Group as='div' className='flex flex-col'>
				<div className='sticky top-0 p-2 pb-3 bg-dark-800'>
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
				</div>
				<Tab.Panels className='flex-1 px-2 pb-2'>
					{tabs.map((tab) => (
						<Tab.Panel as={Fragment} key={tab.id}>
							<tab.Component />
						</Tab.Panel>
					))}
				</Tab.Panels>
			</Tab.Group>
		</div>
	);
}
