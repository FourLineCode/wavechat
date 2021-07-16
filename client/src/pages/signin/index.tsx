import { Form, Formik } from 'formik';
import Link from 'next/link';
import React from 'react';
import { Layout } from 'src/components/Layouts/Layout';
import { NavBar } from 'src/components/Layouts/NavBar';
import { Button } from 'src/components/ui/Button';
import { Card } from 'src/components/ui/Card';
import { Input } from 'src/components/ui/Input';

export default function SignIn() {
	return (
		<Layout title='Sign In'>
			<div className='w-screen h-screen'>
				<div className='w-full bg-gradient-to-b from-brand-800 to-dark-800 h-2/3'>
					<NavBar />
					<Formik
						initialValues={{
							email: '',
							password: '',
						}}
						onSubmit={async (values) => {
							await new Promise((resolve) => setTimeout(resolve, 1000));
							console.log(values);
							return;
						}}
					>
						{(props) => (
							<Card as={Form} className='max-w-md mx-auto mt-16 space-y-4'>
								<div className='text-5xl italic font-bold text-center'>Sign In</div>
								<Input
									label='Email'
									name='email'
									placeholder='Email...'
									type='email'
									disabled={props.isSubmitting}
								/>
								<Input
									label='Password'
									name='password'
									placeholder='Password...'
									type='password'
									disabled={props.isSubmitting}
								/>
								<div className='flex flex-row-reverse items-center justify-between'>
									<Button type='submit' isSubmitting={props.isSubmitting}>
										Sign in
									</Button>
									<div>
										<span>Don't Have an account?</span>
										<Link passHref href='/signup'>
											<a className='ml-2 font-semibold cursor-pointer hover:underline text-brand-500'>
												Sign up
											</a>
										</Link>
									</div>
								</div>
							</Card>
						)}
					</Formik>
				</div>
			</div>
		</Layout>
	);
}
