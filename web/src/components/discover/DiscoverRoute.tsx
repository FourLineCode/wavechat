import clsx from 'clsx';
import { useRouter } from 'next/router';
import { IconType } from 'react-icons';

interface Props {
	text: string;
	route: string;
	icon: IconType;
}

export function DiscoverRoute({ text, route, icon: IconComponent }: Props) {
	const router = useRouter();
	const pathname = router.route;

	return (
		<div
			onClick={() => router.push(`/discover/${route}`)}
			className={clsx(
				pathname.endsWith(route)
					? 'bg-brand-500 hover:bg-brand-600 hover:text-primary'
					: 'hover:bg-dark-700 hover:text-brand-500',
				'flex items-center p-3 my-1 space-x-2 rounded-lg cursor-pointer transition-colors'
			)}
		>
			<IconComponent />
			<span className='font-semibold'>{text}</span>
		</div>
	);
}
