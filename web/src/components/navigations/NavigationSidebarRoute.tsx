import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { CircleWavyQuestion, Icon, Question } from "phosphor-react";
import { Tooltip } from "src/components/ui/Tooltip";

interface Props {
  route: string;
  tooltip: string;
  marked?: boolean;
  icon?: Icon;
  imageSrc?: string | null;
}

export function NavigationSidebarRoute({
  route,
  tooltip,
  marked = false,
  icon: IconComponent,
  imageSrc,
}: Props) {
  const router = useRouter();
  const serverId = (router.query.serverId as string) ?? "";
  const pathname = router.route.replace("[serverId]", serverId); // TODO: this is not dynamic, try fix
  const currentRoute = pathname.endsWith(route) || pathname.startsWith(route);

  if (!IconComponent) {
    IconComponent = Question;
  }

  return (
    <Tooltip text={tooltip}>
      <div>
        <Link passHref href={route}>
          {!!imageSrc ? (
            <a className="overflow-hidden cursor-pointer">
              <img
                src={imageSrc}
                alt="server-icon"
                className={clsx(
                  currentRoute
                    ? "rounded-xl ring-4 ring-brand-500 ring-opacity-60"
                    : "rounded-3xl hover:rounded-xl",
                  "w-12 h-12 my-2 object-cover bg-dark-700 transition-all cursor-pointer overflow-hidden"
                )}
              />
            </a>
          ) : IconComponent ? (
            <a
              className={clsx(
                currentRoute
                  ? "text-primary bg-brand-500 rounded-xl hover:bg-brand-600 ring-4 ring-brand-500 ring-opacity-40"
                  : "text-muted hover:text-primary hover:bg-brand-500 bg-dark-800 rounded-3xl hover:rounded-xl",
                "flex group items-center justify-center w-12 h-12 my-2 transition-all cursor-pointer"
              )}
            >
              <IconComponent
                weight="fill"
                size={32}
                className={
                  marked && !currentRoute
                    ? "text-brand-500 group-hover:text-primary transition-colors"
                    : ""
                }
              />
            </a>
          ) : (
            <a
              className={clsx(
                currentRoute
                  ? "text-primary bg-brand-500 rounded-xl hover:bg-brand-600 ring-4 ring-brand-500 ring-opacity-40"
                  : "text-muted hover:text-primary hover:bg-brand-500 bg-dark-800 rounded-3xl hover:rounded-xl",
                "flex group items-center justify-center w-12 h-12 my-2 transition-all cursor-pointer"
              )}
            >
              <CircleWavyQuestion
                weight="bold"
                size={32}
                className={
                  marked && !currentRoute
                    ? "text-brand-500 group-hover:text-primary transition-colors"
                    : ""
                }
              />
            </a>
          )}
        </Link>
      </div>
    </Tooltip>
  );
}
