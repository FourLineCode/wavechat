import React, { useEffect } from 'react';
import { FaUserPlus } from 'react-icons/fa';
import { User } from 'src/apollo/__generated__/types';
import { Button } from 'src/components/ui/Button';
import { useRequestButton } from 'src/hooks/useRequestButton';
import { ApiMutationCallback, Signal } from 'src/hooks/useSignal';

interface Props {
	user: User;
	className?: string;
	signal?: Signal;
	mutationCallback?: ApiMutationCallback;
}

export function RequestButton({ user, className, signal, mutationCallback }: Props) {
	const { requestButtonHandler, loading, primaryButtonText, updateButtonState } =
		useRequestButton(user, mutationCallback);

	useEffect(() => {
		if (!signal) return;

		if (signal.message === 'send') {
			updateButtonState.setAlreadySentRequest(signal.reqId);
		} else if (signal.message === 'unsend') {
			updateButtonState.setNotFriend();
		} else if (signal.message === 'unfriend') {
			updateButtonState.setNotFriend();
		}
	}, [signal]);

	return (
		<Button
			type='submit'
			className={className}
			onClick={requestButtonHandler}
			isSubmitting={loading}
		>
			<div className='flex items-center justify-center space-x-1'>
				<FaUserPlus />
				<span className='line-clamp-1'>{primaryButtonText}</span>
			</div>
		</Button>
	);
}
