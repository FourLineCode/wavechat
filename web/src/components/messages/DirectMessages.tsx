import { SearchFriendsInput } from 'src/components/search/SearchFriendsInput';

export function DirectMessages() {
	return (
		<div className='flex flex-col flex-1 w-64 px-2 py-4 bg-dark-800 xl:w-80'>
			<SearchFriendsInput />
			<hr className='my-2 border-dark-700' />
			<div className='flex items-center justify-between'>
				<span className='font-semibold text-primary'>Direct Messages</span>
				{/* I am not sure if i want this component, it will overcomplicate things in the future */}
				{/* <Tooltip text='Create Message' position='top'>
					<div className='transform cursor-pointer hover:scale-125 text-dark-400 hover:text-dark-300'>
						<FaPlus size='16' />
					</div>
				</Tooltip> */}
			</div>
		</div>
	);
}
