import Tippy, { TippyProps } from '@tippyjs/react';
import React from 'react';
import { Placement } from 'tippy.js';

interface Props extends TippyProps {
	text?: string;
	position?: Placement;
	children: React.ReactElement;
}

export const Tooltip = React.forwardRef<Element, Props>(function TooltipComponent(
	{ text, children, position = 'right', ...props },
	ref
) {
	return (
		<Tippy
			content={text}
			duration={0}
			className='p-1 rounded-md text-primary bg-dark-600'
			placement={position}
			offset={[0, 12]}
			ref={ref}
			{...props}
		>
			{children}
		</Tippy>
	);
});
