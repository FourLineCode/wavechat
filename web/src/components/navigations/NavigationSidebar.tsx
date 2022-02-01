import { FaCompass, FaEnvelope, FaQuestion } from "react-icons/fa";
import { NavigationSidebarRoute } from "src/components/navigations/NavigationSidebarRoute";
import { CreateServerModal } from "src/components/server/CreateServerModal";

export function NavigationSidebar() {
    return (
        <div className="w-16 px-2 py-2 overflow-y-auto divide-y-2 shrink-0 divide-dark-700 bg-dark-900">
            <NavigationSidebarRoute route="/messages" tooltip="Friends" icon={FaEnvelope} />
            <div>
                {Array.from({ length: 5 }).map((_, i) => (
                    <NavigationSidebarRoute
                        route={`/server/${i}`}
                        tooltip={`Server #${i}`}
                        icon={FaQuestion}
                        key={i}
                    />
                ))}
                <NavigationSidebarRoute
                    route="/discover"
                    tooltip="Discover"
                    icon={FaCompass}
                    marked
                />
                <CreateServerModal />
            </div>
        </div>
    );
}
