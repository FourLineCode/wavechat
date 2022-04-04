import Link from "next/link";
import React from "react";

interface Props {
  icon: JSX.Element;
  href: string;
}

export function IconLink({ icon: IconComponent, href = "#" }: Props) {
  return (
    <Link passHref href={href}>
      <a
        target="_blank"
        className="p-1.5 rounded-full cursor-pointer text-secondary transition-colors hover:text-primary hover:bg-opacity-25 hover:bg-dark-500"
      >
        {IconComponent}
      </a>
    </Link>
  );
}
