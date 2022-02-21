import clsx from "clsx";
import { IconType } from "react-icons";

interface Props {
    icon: IconType;
    className?: string;
    onClick?: () => void;
}

export function IconButton({ className, icon: IconComponent, onClick }: Props) {
    return (
        <div
            onClick={onClick}
            className={clsx(
                "p-1.5 rounded-full cursor-pointer text-secondary hover:text-primary hover:bg-opacity-25 hover:bg-dark-500",
                className
            )}
        >
            <IconComponent size="24" />
        </div>
    );
}
