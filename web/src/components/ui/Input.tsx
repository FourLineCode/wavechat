import clsx from 'clsx';
import { Field } from 'formik';
import React, { useEffect, useRef } from 'react';

type ButtonTypes =
	| 'button'
	| 'checkbox'
	| 'color'
	| 'date'
	| 'datetime-local'
	| 'email'
	| 'file'
	| 'hidden'
	| 'image'
	| 'month'
	| 'number'
	| 'password'
	| 'radio'
	| 'range'
	| 'reset'
	| 'search'
	| 'submit'
	| 'tel'
	| 'text'
	| 'time'
	| 'url'
	| 'week';

interface Props extends React.HTMLAttributes<HTMLInputElement> {
	label?: string;
	placeholder: string;
	type?: ButtonTypes;
	name: string;
	disabled?: boolean;
	initialFocus?: boolean;
	className?: string;
}

export const Input = React.forwardRef<HTMLInputElement, Props>(function InputComponent(
	{
		label,
		placeholder,
		type = 'text',
		name,
		disabled,
		initialFocus = false,
		className,
		...props
	},
	_ref
) {
	const customRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (!initialFocus) return;

		if (customRef.current) {
			customRef.current.focus();
		}
	}, []);

	return (
		<>
			{label && (
				<label htmlFor={name} className='pl-1 text-primary'>
					{label}
				</label>
			)}
			<Field
				as='input'
				placeholder={placeholder}
				type={type}
				name={name}
				innerRef={customRef}
				autoComplete='off'
				disabled={disabled}
				className={clsx(
					className,
					'w-full p-2 rounded-lg mt-0.5 bg-dark-300 focus:bg-white transition focus:ring-4 ring-brand-500 focus:outline-none text-dark-800'
				)}
				{...props}
			/>
		</>
	);
});
