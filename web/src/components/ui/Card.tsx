import clsx from "clsx";

const CARD_VARIANTS = {
  light: "bg-dark-700",
  dark: "bg-dark-800",
  fullDark: "bg-dark-900",
};

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  as?: any;
  className?: string;
  variant?: keyof typeof CARD_VARIANTS;
  children?: React.ReactNode;
}

export function Card({
  as: Component = "div",
  className,
  variant = "dark",
  children,
  ...props
}: Props) {
  return (
    <Component className={clsx(className, CARD_VARIANTS[variant], "p-4 rounded-lg")} {...props}>
      {children}
    </Component>
  );
}
