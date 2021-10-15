import {
	ContextMenu as ReactContextMenu,
	ContextMenuProps,
	MenuItem,
	MenuItemProps as ReactMenuItemProps,
} from 'react-contextmenu';

interface MenuProps extends ContextMenuProps {
	children: React.ReactNode;
}

export function ContextMenu({ children, ...props }: MenuProps) {
	return (
		<ReactContextMenu className='p-2 rounded-md bg-dark-900' {...props}>
			{children}
		</ReactContextMenu>
	);
}

interface MenuItemProps extends ReactMenuItemProps {
	children: React.ReactNode;
}

export function ContextMenuItem({ children, ...props }: MenuItemProps) {
	return (
		<MenuItem
			className='px-4 py-1.5 font-semibold text-center rounded-sm cursor-pointer hover:bg-brand-500'
			{...props}
		>
			{children}
		</MenuItem>
	);
}
