import clsx from "clsx";
import {
    ContextMenu as ReactContextMenu,
    ContextMenuProps,
    MenuItem,
    MenuItemProps as ReactMenuItemProps,
} from "react-contextmenu";

interface MenuProps extends ContextMenuProps {
    children: React.ReactNode;
}

export function ContextMenu({ children, className, ...props }: MenuProps) {
    return (
        <ReactContextMenu className={clsx(className, "p-2 rounded-md bg-dark-900")} {...props}>
            {children}
        </ReactContextMenu>
    );
}

interface MenuItemProps extends ReactMenuItemProps {
    children: React.ReactNode;
}

export function ContextMenuItem({ children, className, ...props }: MenuItemProps) {
    return (
        <MenuItem
            className={clsx(
                className,
                "px-4 py-1.5 font-semibold text-center rounded-sm cursor-pointer hover:bg-brand-500"
            )}
            {...props}
        >
            {children}
        </MenuItem>
    );
}
