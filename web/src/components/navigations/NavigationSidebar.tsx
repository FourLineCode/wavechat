import { Compass, EnvelopeSimple } from "phosphor-react";
import { NavigationServersList } from "src/components/navigations/NavigationServersList";
import { NavigationSidebarRoute } from "src/components/navigations/NavigationSidebarRoute";
import { CreateServerModal } from "src/components/server/CreateServerModal";

export function NavigationSidebar() {
  return (
    <div className="w-16 px-2 py-2 overflow-y-auto divide-y-2 shrink-0 divide-dark-700 bg-dark-900">
      <NavigationSidebarRoute route="/messages" tooltip="Friends" icon={EnvelopeSimple} />
      <div>
        <NavigationServersList />
        <NavigationSidebarRoute route="/discover" tooltip="Discover" icon={Compass} marked />
        <CreateServerModal />
      </div>
    </div>
  );
}
