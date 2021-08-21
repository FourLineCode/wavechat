import clsx from 'clsx';
import React from 'react';

interface Props {
	as?: any;
	className?: string;
	children?: React.ReactNode;
}

export function Card({ as: Component = 'div', className, children }: Props) {
	return (
		<Component className={clsx(className, 'p-4 rounded-lg bg-dark-700')}>{children}</Component>
	);
}
