import { IconType } from 'react-icons';

interface Props {
	icon: IconType;
	onClick?: () => void;
}

export function IconButton({ icon: IconComponent, onClick }: Props) {
	return (
		<div
			onClick={onClick}
			className='p-1.5 rounded-full cursor-pointer text-secondary hover:text-primary hover:bg-opacity-25 hover:bg-dark-500'
		>
			<IconComponent size='24' />
		</div>
	);
}
