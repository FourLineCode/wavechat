import clsx from 'clsx';
import { useRouter } from 'next/router';
import { IconType } from 'react-icons';
import { Tooltip } from 'src/components/ui/Tooltip';

interface Props {
	route: string;
	tooltip: string;
	icon: IconType;
}

export function NavigationSidebarRoute({ route, tooltip, icon: IconComponent }: Props) {
	const router = useRouter();
	const serverId = (router.query.serverId as string) ?? '';
	const pathname = router.route.replace('[serverId]', serverId); // TODO: this is not dynamic, try fix

	return (
		<Tooltip text={tooltip}>
			<div
				onClick={() => router.push(route)}
				className={clsx(
					pathname.endsWith(route) || pathname.startsWith(route)
						? 'text-light bg-brand-500 rounded-2xl hover:bg-brand-600'
						: 'text-dark-600 hover:text-light hover:bg-brand-500 bg-dark-800 rounded-3xl hover:rounded-2xl',
					'flex items-center justify-center w-16 h-16 my-2 transition-all cursor-pointer'
				)}
			>
				<IconComponent size='32' />
			</div>
		</Tooltip>
	);
}
