import React from 'react';
import { FaUserPlus } from 'react-icons/fa';
import { User } from 'src/apollo/__generated__/types';
import { Button } from 'src/components/ui/Button';
import { useRequestButton } from 'src/hooks/useRequestButton';

interface Props {
	user: User;
	className?: string;
}

export function RequestButton({ user, className }: Props) {
	const { requestButtonHandler, loading, primaryButtonText } = useRequestButton(user);

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
