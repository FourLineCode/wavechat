import clsx from "clsx";
import { CgSpinner } from "react-icons/cg";

interface Props {
	className?: string;
	size?: string;
}

export function Spinner({ className, size = "32px" }: Props) {
	return <CgSpinner color="white" size={size} className={clsx("animate-spin", className)} />;
}
