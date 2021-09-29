import clsx from 'clsx';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
	as?: any;
	className?: string;
	inverted?: boolean;
	children?: React.ReactNode;
}

export function Card({
	as: Component = 'div',
	className,
	inverted = false,
	children,
	...props
}: Props) {
	return (
		<Component
			className={clsx(className, inverted ? 'bg-dark-800' : 'bg-dark-700', 'p-4 rounded-lg')}
			{...props}
		>
			{children}
		</Component>
	);
}
