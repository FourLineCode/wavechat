import { FaPlus } from 'react-icons/fa';
import { Tooltip } from 'src/components/ui/Tooltip';

export function DirectMessages() {
	return (
		<div className='flex flex-col flex-1 w-64 px-2 py-4 bg-dark-800 xl:w-80'>
			<input
				type='text'
				className='w-full p-2 text-sm rounded-lg placeholder-dark-500 text-primary bg-dark-700 focus:ring-2 ring-brand-500 focus:outline-none'
				placeholder='Search a friend'
			/>
			<hr className='my-2 border-dark-700' />
			<div className='flex items-center justify-between'>
				<span className='font-semibold text-primary'>Direct Messages</span>
				<Tooltip text='Create Message' position='top'>
					<div className='transform cursor-pointer hover:scale-125 text-dark-400 hover:text-dark-300'>
						<FaPlus size='16' />
					</div>
				</Tooltip>
			</div>
		</div>
	);
}
