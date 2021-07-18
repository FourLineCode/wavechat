import { Form, Formik } from 'formik';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { Layout } from 'src/components/Layouts/Layout';
import { NavBar } from 'src/components/Layouts/NavBar';
import { Button } from 'src/components/ui/Button';
import { Card } from 'src/components/ui/Card';
import { Input } from 'src/components/ui/Input';
import { useAuth } from 'src/store/useAuth';

export default function SignUp() {
	const auth = useAuth();
	const router = useRouter();

	return (
		<Layout title='Sign Up'>
			<div className='w-screen h-screen'>
				<div className='w-full bg-gradient-to-b from-brand-800 to-dark-800 h-2/3'>
					<NavBar />
					<Formik
						initialValues={{
							email: '',
							username: '',
							password: '',
							confirmPassword: '',
						}}
						onSubmit={async ({ email, username, password, confirmPassword }) => {
							if (password !== confirmPassword) {
								toast.error('Passwords do not match');
								return;
							}

							const res = await auth.signup({
								email,
								username,
								password,
							});

							if (!res.success) {
								toast.error(res.message);
								return;
							}

							// TODO: redirect properly, add spinner
							toast.success(res.message);
							router.push('/');
						}}
					>
						{(props) => (
							<Card as={Form} className='max-w-md mx-auto mt-16 space-y-4'>
								<div className='text-5xl italic font-bold text-center'>Sign Up</div>
								<Input
									label='Email'
									name='email'
									placeholder='Email...'
									type='email'
									disabled={props.isSubmitting}
								/>
								<Input
									label='Username'
									name='username'
									placeholder='Username...'
									type='text'
									disabled={props.isSubmitting}
								/>
								<Input
									label='Password'
									name='password'
									placeholder='Password...'
									type='password'
									disabled={props.isSubmitting}
								/>
								<Input
									label='Confirm Password'
									name='confirmPassword'
									placeholder='Confirm Password...'
									type='password'
									disabled={props.isSubmitting}
								/>
								<div className='flex flex-row-reverse items-center justify-between'>
									<Button type='submit' isSubmitting={props.isSubmitting}>
										Sign up
									</Button>
									<div>
										<span>Have an account?</span>
										<Link passHref href='/signin'>
											<a className='ml-2 font-semibold cursor-pointer hover:underline text-brand-500'>
												Sign in
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
