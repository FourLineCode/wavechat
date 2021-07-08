import clsx from 'clsx';
import React from 'react';

interface Props {
	type?: 'button' | 'submit' | 'reset';
	variant?: 'filled' | 'outlined';
	className?: string;
	onClick?: (arg?: any) => void;
	children: React.ReactNode;
}

const VariantStyles: Record<string, string> = {
	filled: 'bg-brand-500 hover:bg-brand-600 hover:border-transparent',
	outlined: 'bg-transparent hover:bg-brand-500 hover:bg-opacity-30',
};

export const Button = React.forwardRef<HTMLButtonElement, Props>(
	({ type, variant = 'filled', onClick, children, className }, ref) => {
		return (
			<button
				ref={ref}
				onClick={onClick}
				type={type}
				className={clsx(
					className,
					VariantStyles[variant],
					'px-4 py-2 font-semibold rounded-full focus:outline-none focus:ring-4 ring-opacity-50 border-2 border-brand-500 ring-brand-500'
				)}
			>
				{children}
			</button>
		);
	}
);
