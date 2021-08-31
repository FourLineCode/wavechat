import { Form, Formik } from 'formik';
import { Input } from 'src/components/ui/Input';

export function DiscoverPageLayout() {
	return (
		<div className='flex-1 p-2 bg-dark-700'>
			<div className='w-full rounded-2xl h-72 bg-gradient-to-bl from-brand-700 to-dark-900'>
				<Formik
					initialValues={{ searchTerm: '' }}
					onSubmit={async ({ searchTerm }) => {
						console.log(searchTerm);
					}}
				>
					{(props) => (
						<Form className='flex flex-col items-center justify-center w-full h-full'>
							<Input
								name='searchTerm'
								placeholder='Username...'
								disabled={props.isSubmitting}
								initialFocus
								className='w-1/3'
							/>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
}
