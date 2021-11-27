import Tippy, { TippyProps } from "@tippyjs/react";
import clsx from "clsx";
import React from "react";
import { Placement } from "tippy.js";

interface Props extends TippyProps {
	text?: string;
	position?: Placement;
	children: React.ReactElement;
	className?: string;
}

export const Tooltip = React.forwardRef<Element, Props>(function TooltipComponent(
	{ text, children, position = "right", className, ...props },
	ref
) {
	return (
		<Tippy
			content={text}
			duration={0}
			className={clsx(
				"p-1 text-sm font-semibold rounded-md text-primary bg-dark-600 bg-opacity-75",
				className
			)}
			placement={position}
			offset={[0, 12]}
			ref={ref}
			{...props}
		>
			{children}
		</Tippy>
	);
});
