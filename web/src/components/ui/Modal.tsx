import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import React, { Fragment, MutableRefObject } from "react";

interface Props {
    show: boolean;
    onClose: () => void;
    large?: boolean;
    extraLarge?: boolean;
    className?: string;
    initialFocus?: MutableRefObject<HTMLElement | null>;
    children?: React.ReactNode;
}

export function Modal({
    show,
    onClose,
    large = false,
    extraLarge = false,
    className,
    initialFocus,
    children,
}: Props) {
    return (
        <Transition show={show} as={Fragment}>
            <Dialog
                initialFocus={initialFocus}
                as="div"
                className="fixed inset-0 z-10"
                onClose={onClose}
            >
                <div className="flex items-center justify-center min-h-screen px-4">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-150"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-150"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
                    </Transition.Child>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-150"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-150"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <div
                            className={clsx(
                                extraLarge ? "max-w-3xl" : large ? "max-w-xl" : "max-w-md",
                                className,
                                "w-full p-6 z-20 transition-all border border-dark-800 rounded-lg shadow-xl bg-dark-900 text-primary"
                            )}
                        >
                            {children}
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
}
