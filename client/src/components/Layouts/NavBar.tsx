import Image from 'next/image';
import Link from 'next/link';
import { config } from 'src/internal/config';

export const NavBar = () => {
	return (
		<div className='flex justify-between w-full h-16 px-16 pt-12 lg:px-48'>
			<Link href='/'>
				<div className='flex items-center cursor-pointer'>
					<Image src={config.iconUrl} alt='logo' height='40' width='60' />
					<span className='ml-2 text-3xl italic font-bold'>
						<span>Wave</span>
						<span className='underline'>Chat</span>
					</span>
				</div>
			</Link>
			<div className='flex space-x-4 font-medium text-md'>
				{/* TODO: add modal for about */}
				<div className='cursor-pointer hover:underline '>About</div>
				<div className='cursor-pointer hover:underline '>Contact</div>
				{/* TODO: enable this */}
				{/* <Link passHref href='mailto:akmal3535.ah@gmail.com'> */}
				{/* <a target='_blank' className='hover:underline'>
					Contact
				</a> */}
				{/* </Link> */}
			</div>
		</div>
	);
};
