import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';

interface Props {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
}

export function Modal({ isOpen, onClose, children }: Props) {
	return (
		<Transition show={isOpen} as={Fragment}>
			<Dialog as='div' className='fixed inset-0 z-10 overflow-y-auto' onClose={onClose}>
				<div className='min-h-screen px-4 text-center'>
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

					{/* This element is to trick the browser into centering the modal contents. */}
					<span className='inline-block h-screen align-middle' aria-hidden='true'>
						&#8203;
					</span>
					<Transition.Child
						as={Fragment}
						enter='ease-out duration-150'
						enterFrom='opacity-0 scale-95'
						enterTo='opacity-100 scale-100'
						leave='ease-in duration-150'
						leaveFrom='opacity-100 scale-100'
						leaveTo='opacity-0 scale-95'
					>
						<div className='inline-block w-full max-w-md p-6 transition-all transform rounded-lg shadow-xl bg-dark-900 text-primary'>
							{children}
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition>
	);
}
