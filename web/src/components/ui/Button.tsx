import clsx from "clsx";
import React from "react";
import { Spinner } from "src/components/ui/Spinner";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  type?: "button" | "submit" | "reset";
  variant?: "filled" | "outlined";
  className?: string;
  isSubmitting?: boolean;
  disabled?: boolean;
  onClick?: (arg?: any) => void;
  children: React.ReactNode;
}

const VariantStyles: Record<string, string> = {
  filled: "bg-brand-500 hover:bg-brand-600 hover:border-transparent",
  outlined: "bg-transparent hover:bg-brand-500 hover:bg-opacity-30",
};

export const Button = React.forwardRef<HTMLButtonElement, Props>(function ButtonComponent(
  {
    type = "button",
    variant = "filled",
    isSubmitting,
    disabled = false,
    onClick,
    children,
    className,
    ...props
  },
  ref
) {
  if (type !== "submit" && isSubmitting !== undefined) {
    throw new Error(`Cannot set "Button" of type "${type}" to submitting`);
  }

  return (
    <button
      ref={ref}
      onClick={onClick}
      type={type}
      disabled={isSubmitting || disabled}
      className={clsx(
        className,
        VariantStyles[variant],
        isSubmitting && "bg-opacity-75 flex justify-center items-center cursor-not-allowed",
        disabled && "filter grayscale cursor-not-allowed",
        "px-4 py-1 font-semibold rounded-lg transition duration-150 focus:outline-none focus:ring-4 ring-opacity-50 border-2 border-brand-500 ring-brand-500"
      )}
      {...props}
    >
      {isSubmitting && <Spinner size={24} />}
      <div className={clsx(isSubmitting && "ml-1")}>{children}</div>
    </button>
  );
});
