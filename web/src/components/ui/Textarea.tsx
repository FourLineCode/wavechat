import clsx from "clsx";
import { Field } from "formik";
import React, { useEffect, useRef } from "react";

interface Props extends React.HTMLAttributes<HTMLTextAreaElement> {
	label?: string;
	placeholder: string;
	name: string;
	rows?: number;
	maxLength?: number;
	disabled?: boolean;
	initialFocus?: boolean;
	className?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, Props>(function TextareaComponent(
	{
		label,
		placeholder,
		name,
		rows = 2,
		maxLength = 256,
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
				<label htmlFor={name} className="pl-1 text-primary">
					{label}
				</label>
			)}
			<Field
				as="textarea"
				placeholder={placeholder}
				name={name}
				innerRef={customRef}
				autoComplete="off"
				disabled={disabled}
				rows={rows}
				maxLength={maxLength}
				className={clsx(
					className,
					"w-full p-2 resize-none rounded-lg mt-0.5 bg-dark-300 focus:bg-white transition focus:ring-4 ring-brand-500 focus:outline-none text-dark-800"
				)}
				{...props}
			/>
		</>
	);
});
