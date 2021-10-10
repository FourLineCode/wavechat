import clsx from 'clsx';
import { Form, Formik, FormikProps } from 'formik';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaCaretLeft, FaCaretRight } from 'react-icons/fa';
import { HashLoader } from 'react-spinners';
import { Layout } from 'src/components/layouts/Layout';
import { NavBar } from 'src/components/layouts/NavBar';
import { Button } from 'src/components/ui/Button';
import { Card } from 'src/components/ui/Card';
import { Input } from 'src/components/ui/Input';
import { Textarea } from 'src/components/ui/Textarea';
import { useAuth } from 'src/store/useAuth';

interface FormInitialValue {
	email: string;
	username: string;
	password: string;
	confirmPassword: string;
	bio?: string;
	university?: string;
	department?: string;
	semester?: number;
}

export default function SignUp() {
	const auth = useAuth();
	const router = useRouter();
	const [redirecting, setRedirecting] = useState(false);
	const [page, setPage] = useState(0);

	useEffect(() => {
		return () => {
			setRedirecting(false);
		};
	}, []);

	return (
		<Layout title='Sign Up'>
			<div className='w-screen h-screen'>
				<div className='w-full bg-gradient-to-b from-brand-800 to-dark-900 h-2/3'>
					<NavBar />
					<Formik<FormInitialValue>
						initialValues={{
							email: '',
							username: '',
							password: '',
							confirmPassword: '',
						}}
						onSubmit={async ({
							email,
							username,
							password,
							confirmPassword,
							bio,
							university,
							department,
							semester,
						}) => {
							if (password !== confirmPassword) {
								toast.error('Passwords do not match');
								return;
							}

							const res = await auth.signup({
								email,
								username,
								password,
								bio,
								university,
								department,
								semester,
							});

							if (!res.success) {
								toast.error(res.message);
								return;
							}

							toast.success(res.message);
							setRedirecting(true);
							router.push('/messages');
						}}
					>
						{(props) => (
							<Card
								inverted
								as={Form}
								className={clsx(
									'max-w-md mx-auto mt-16 space-y-4',
									redirecting && 'flex justify-center items-center h-56'
								)}
							>
								{redirecting ? (
									<HashLoader color='white' />
								) : (
									<>
										<div className='text-5xl italic font-bold text-center'>
											Sign Up
										</div>
										{page === 0 ? (
											<Page1 form={props} />
										) : (
											<Page2 form={props} />
										)}
										<div className='flex flex-row-reverse items-center justify-between'>
											<div className='flex flex-row-reverse items-center space-x-2 space-x-reverse'>
												{page === 1 ? (
													<Button
														type='submit'
														isSubmitting={props.isSubmitting}
													>
														Sign up
													</Button>
												) : (
													<>
														<Button
															onClick={() => page !== 1 && setPage(1)}
														>
															<FaCaretRight className='w-[16px] h-[24px]' />
														</Button>
													</>
												)}
												<Button onClick={() => page !== 0 && setPage(0)}>
													<FaCaretLeft className='w-[16px] h-[24px]' />
												</Button>
												<div
													className={clsx(page === 1 && 'text-brand-500')}
												>{`${page + 1}/2`}</div>
											</div>
											<div>
												<span>Have an account?</span>
												<Link passHref href='/signin'>
													<a className='ml-2 font-semibold cursor-pointer hover:underline text-brand-500'>
														Sign in
													</a>
												</Link>
											</div>
										</div>
									</>
								)}
							</Card>
						)}
					</Formik>
				</div>
			</div>
		</Layout>
	);
}

function Page1({ form }: { form: FormikProps<FormInitialValue> }) {
	return (
		<div>
			<Input
				label='Email'
				name='email'
				placeholder='Email...'
				type='email'
				disabled={form.isSubmitting}
				initialFocus
			/>
			<Input
				label='Username'
				name='username'
				placeholder='Username...'
				type='text'
				disabled={form.isSubmitting}
			/>
			<Input
				label='Password'
				name='password'
				placeholder='Password...'
				type='password'
				disabled={form.isSubmitting}
			/>
			<Input
				label='Confirm Password'
				name='confirmPassword'
				placeholder='Confirm Password...'
				type='password'
				disabled={form.isSubmitting}
			/>
		</div>
	);
}

function Page2({ form }: { form: FormikProps<FormInitialValue> }) {
	return (
		<div>
			<Input
				label='University'
				name='university'
				placeholder='University...'
				type='text'
				disabled={form.isSubmitting}
				initialFocus
			/>
			<Input
				label='Department'
				name='department'
				placeholder='Department...'
				type='text'
				disabled={form.isSubmitting}
			/>
			<Input
				label='Semester'
				name='semester'
				placeholder='Semester...'
				type='number'
				disabled={form.isSubmitting}
			/>
			<Textarea
				label='Bio'
				name='bio'
				placeholder='Bio (about yourself)...'
				disabled={form.isSubmitting}
			/>
		</div>
	);
}
