import Link from "next/link";
import React from "react";
import { IconType } from "react-icons";

interface Props {
    icon: IconType;
    href: string;
}

export function IconLink({ icon: IconComponent, href = "#" }: Props) {
    return (
        <Link passHref href={href}>
            <a
                target="_blank"
                className="p-1.5 rounded-full cursor-pointer text-secondary hover:text-primary hover:bg-opacity-25 hover:bg-dark-500"
            >
                <IconComponent size="24" />
            </a>
        </Link>
    );
}
