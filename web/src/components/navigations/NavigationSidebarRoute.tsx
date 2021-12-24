import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { IconType } from "react-icons";
import { Tooltip } from "src/components/ui/Tooltip";

interface Props {
    route: string;
    tooltip: string;
    icon: IconType;
}

export function NavigationSidebarRoute({ route, tooltip, icon: IconComponent }: Props) {
    const router = useRouter();
    const serverId = (router.query.serverId as string) ?? "";
    const pathname = router.route.replace("[serverId]", serverId); // TODO: this is not dynamic, try fix

    return (
        <Tooltip text={tooltip}>
            <div>
                <Link passHref href={route}>
                    <a
                        className={clsx(
                            pathname.endsWith(route) || pathname.startsWith(route)
                                ? "text-primary bg-brand-500 rounded-xl hover:bg-brand-600"
                                : "text-muted hover:text-primary hover:bg-brand-500 bg-dark-800 rounded-3xl hover:rounded-xl",
                            "flex items-center justify-center w-12 h-12 my-2 transition-all cursor-pointer"
                        )}
                    >
                        <IconComponent className="w-6 h-6" />
                    </a>
                </Link>
            </div>
        </Tooltip>
    );
}
