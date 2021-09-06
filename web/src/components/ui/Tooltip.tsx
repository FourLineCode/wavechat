import Tippy from '@tippyjs/react';
import React from 'react';
import { Placement } from 'tippy.js';

interface Props {
	text?: string;
	position?: Placement;
	children: React.ReactElement;
}

export const Tooltip = React.forwardRef<Element, Props>(function TooltipComponent(
	{ text, children, position = 'right' },
	ref
) {
	return (
		<Tippy
			content={text}
			duration={0}
			className='p-1 rounded-md text-light bg-dark-600'
			placement={position}
			offset={[0, 12]}
			ref={ref}
		>
			{children}
		</Tippy>
	);
});
