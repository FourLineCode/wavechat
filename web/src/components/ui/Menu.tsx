import { Menu as HeadlessMenu, Transition } from "@headlessui/react";
import clsx from "clsx";
import React, { Fragment } from "react";

interface BaseMenuProps {
  children: React.ReactNode;
  className?: string;
}

interface MenuProps extends BaseMenuProps {}

interface MenuButtonProps extends BaseMenuProps {}

interface MenuItemsProps extends BaseMenuProps {}

interface MenuItemProps extends BaseMenuProps {
  onClick?: () => void;
}

export function DropdownMenu({ children, className }: MenuProps) {
  return (
    <HeadlessMenu as="div" className={clsx("relative", className)}>
      {children}
    </HeadlessMenu>
  );
}

export function DropdownMenuButton({ children, className }: MenuButtonProps) {
  return <HeadlessMenu.Button className={className}>{children}</HeadlessMenu.Button>;
}

export function DropdownMenuItems({ children, className }: MenuItemsProps) {
  return (
    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
    >
      <HeadlessMenu.Items
        className={clsx(
          "absolute right-0 mt-1 border w-44 border-dark-600 origin-top-right divide-y divide-dark-700 bg-dark-800 py-2 rounded-lg shadow-lg focus:outline-none",
          className
        )}
      >
        {children}
      </HeadlessMenu.Items>
    </Transition>
  );
}

export function DropdownMenuItem({ children, className, onClick }: MenuItemProps) {
  return (
    <HeadlessMenu.Item>
      <div
        onClick={onClick}
        className={clsx(
          "px-4 line-clamp-1 py-1.5 text-center w-full cursor-pointer hover:bg-brand-500 font-semibold",
          className
        )}
      >
        {children}
      </div>
    </HeadlessMenu.Item>
  );
}
