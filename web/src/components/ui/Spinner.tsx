import clsx from "clsx";
import { CircleNotch } from "phosphor-react";
interface Props {
  className?: string;
  size?: number;
}

export function Spinner({ className, size = 32 }: Props) {
  return <CircleNotch size={size} className={clsx("animate-spin", className)} />;
}
