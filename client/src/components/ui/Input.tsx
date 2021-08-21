import clsx from 'clsx';
import { Field } from 'formik';
import React from 'react';

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

interface Props {
	label: string;
	placeholder: string;
	type?: ButtonTypes;
	name: string;
	disabled?: boolean;
	className?: string;
}

export const Input = React.forwardRef<HTMLInputElement, Props>(
	({ label, placeholder, type = 'text', name, disabled, className }, ref) => {
		return (
			<div>
				<label htmlFor={name} className='pl-1 text-light'>
					{label}
				</label>
				<Field
					as='input'
					placeholder={placeholder}
					type={type}
					name={name}
					ref={ref}
					autoComplete='off'
					disabled={disabled}
					className={clsx(
						className,
						'w-full p-2 rounded-lg mt-0.5 focus:ring-4 ring-brand-500 focus:outline-none text-dark-800'
					)}
				/>
			</div>
		);
	}
);