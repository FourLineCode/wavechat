import clsx from "clsx";

interface Props {
  icon: JSX.Element;
  className?: string;
  onClick?: () => void;
}

export function IconButton({ className, icon: IconComponent, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className={clsx(
        "p-1.5 rounded-full cursor-pointer text-secondary transition-colors hover:text-primary hover:bg-opacity-25 hover:bg-dark-500",
        className
      )}
    >
      {IconComponent}
    </div>
  );
}
