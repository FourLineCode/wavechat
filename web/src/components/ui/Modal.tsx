import { Dialog, Transition } from '@headlessui/react';
import clsx from 'clsx';
import React, { Fragment } from 'react';

interface Props {
	isOpen: boolean;
	onClose: () => void;
	large?: boolean;
	className?: string;
	children?: React.ReactNode;
}

export function Modal({ isOpen, onClose, large = false, className, children }: Props) {
	return (
		<Transition show={isOpen} as={Fragment}>
			<Dialog as='div' className='fixed inset-0 z-10' onClose={onClose}>
				<div className='flex items-center justify-center min-h-screen px-4'>
					<Transition.Child
						as={Fragment}
						enter='ease-out duration-150'
						enterFrom='opacity-0'
						enterTo='opacity-100'
						leave='ease-in duration-150'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'
					>
						<Dialog.Overlay className='fixed inset-0 bg-black opacity-40' />
					</Transition.Child>
					<Transition.Child
						as={Fragment}
						enter='ease-out duration-150'
						enterFrom='opacity-0 scale-95'
						enterTo='opacity-100 scale-100'
						leave='ease-in duration-150'
						leaveFrom='opacity-100 scale-100'
						leaveTo='opacity-0 scale-95'
					>
						<div
							className={clsx(
								large ? 'max-w-xl' : 'max-w-md',
								className,
								'w-full p-6 transition-all transform rounded-lg shadow-xl bg-dark-900 text-primary'
							)}
						>
							{children}
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition>
	);
}
