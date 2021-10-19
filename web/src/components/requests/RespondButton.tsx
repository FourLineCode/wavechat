import React from 'react';
import toast from 'react-hot-toast';
import { IoArrowRedo } from 'react-icons/io5';
import { RequestButtonProps } from 'src/components/requests/RequestButton';
import { Button } from 'src/components/ui/Button';

export function RespondButton({ user, className }: RequestButtonProps) {
	return (
		<Button
			type='submit'
			className={className}
			onClick={() => toast.error('Implement respond')}
			isSubmitting={false}
		>
			<div className='flex items-center justify-center space-x-1'>
				<IoArrowRedo />
				<span className='line-clamp-1'>Respond</span>
			</div>
		</Button>
	);
}
