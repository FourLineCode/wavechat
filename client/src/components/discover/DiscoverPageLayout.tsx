import { Form, Formik } from 'formik';
import React from 'react';
import { Input } from 'src/components/ui/Input';

interface Props {
	title: string;
	placeholder: string;
	callback: (agrs: { searchTerm: string }) => Promise<void>;
	children?: React.ReactNode;
}

export function DiscoverPageLayout({ title, placeholder, callback, children }: Props) {
	return (
		<div className='flex flex-col flex-1 p-2 space-y-2 bg-dark-700'>
			<div className='p-3 rounded-2xl h-72 bg-gradient-to-bl from-brand-700 to-dark-900'>
				<Formik initialValues={{ searchTerm: '' }} onSubmit={callback}>
					{(props) => (
						<Form className='flex flex-col items-center justify-center w-full h-full space-y-4'>
							<div className='text-3xl font-bold line-clamp-1'>{title}</div>
							<Input
								name='searchTerm'
								placeholder={placeholder}
								disabled={props.isSubmitting}
								initialFocus
								className='w-2/5'
							/>
						</Form>
					)}
				</Formik>
			</div>
			{children}
		</div>
	);
}
