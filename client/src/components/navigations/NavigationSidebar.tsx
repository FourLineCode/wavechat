import Link from 'next/link';
import React from 'react';
import { FaEnvelope, FaPlus, FaQuestion } from 'react-icons/fa';
import { Tooltip } from 'src/components/ui/Tooltip';

export const NavigationSidebar = () => {
	return (
		<div className='w-20 px-2 py-2 divide-y-2 divide-dark-700 bg-dark-900'>
			{/* Make this a component */}
			<Link passHref href='/friends'>
				<Tooltip text='Friends'>
					<div className='flex items-center justify-center w-16 h-16 my-2 transition-transform cursor-pointer text-dark-600 hover:text-dark-500 bg-dark-800 rounded-3xl hover:rounded-2xl'>
						<FaEnvelope size='32' />
					</div>
				</Tooltip>
			</Link>
			<div>
				{Array.from({ length: 5 }).map(() => (
					<Link passHref href='/idk'>
						<Tooltip text='??????'>
							<div className='flex items-center justify-center w-16 h-16 my-2 transition-transform cursor-pointer text-dark-600 hover:text-dark-500 bg-dark-800 rounded-3xl hover:rounded-2xl'>
								<FaQuestion size='32' />
							</div>
						</Tooltip>
					</Link>
				))}
				<Tooltip text='Create a server'>
					<div className='flex items-center justify-center w-16 h-16 my-2 transition-transform cursor-pointer text-brand-600 hover:text-brand-500 bg-dark-800 rounded-3xl hover:rounded-2xl'>
						<FaPlus size='32' />
					</div>
				</Tooltip>
			</div>
		</div>
	);
};
