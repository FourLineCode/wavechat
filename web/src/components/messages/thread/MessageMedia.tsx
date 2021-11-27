import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import { Media, Message } from 'src/apollo/__generated__/types';
import { useModal } from 'src/hooks/useModal';

interface Props {
	message: Message;
	media: Media;
}

export function MessageMedia({ media, message }: Props) {
	const { show, onClose, onOpen } = useModal();

	return (
		<>
			<img
				src={media.url}
				key={message.id + media.id}
				onClick={onOpen}
				className='object-cover h-auto max-w-xl transition rounded-lg cursor-pointer max-h-64 hover:brightness-50'
			/>
			<Transition show={show} as={Fragment}>
				<Dialog as='div' className='fixed inset-0 z-10' onClose={onClose}>
					<div className='flex items-center justify-center h-screen'>
						<Transition.Child
							as={Fragment}
							enter='ease-out duration-150'
							enterFrom='opacity-0'
							enterTo='opacity-100'
							leave='ease-in duration-150'
							leaveFrom='opacity-100'
							leaveTo='opacity-0'
						>
							<Dialog.Overlay className='fixed inset-0 bg-black opacity-60' />
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
							<img
								src={media.url}
								key={message.id + media.id}
								className='z-20 max-w-6xl max-h-4/5'
							/>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition>
		</>
	);
}
