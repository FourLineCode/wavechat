import { ContextMenuTrigger } from "react-contextmenu";
import { Server } from "src/apollo/__generated__/types";
import { NavigationSidebarRoute } from "src/components/navigations/NavigationSidebarRoute";
import { InviteFriendsModal } from "src/components/server/InviteFriendsModal";
import { ContextMenu, ContextMenuItem } from "src/components/ui/ContextMenu";
import { useModal } from "src/hooks/useModal";

interface Props {
  server: Server;
}

export function NavigationServerRoute({ server }: Props) {
  const inviteFriendsModal = useModal();

  return (
    <>
      <ContextMenuTrigger id={`nav-server-route-${server.id}`}>
        <NavigationSidebarRoute
          key={server.id}
          route={`/server/${server.id}`}
          tooltip={server.name}
          imageSrc={server.iconUrl}
        />
        <ContextMenu className="z-50" id={`nav-server-route-${server.id}`}>
          <ContextMenuItem onClick={inviteFriendsModal.onOpen}>Invite people</ContextMenuItem>
          <ContextMenuItem onClick={() => {}}>Edit server</ContextMenuItem>
          <ContextMenuItem className="text-red-500 hover:text-primary" onClick={() => {}}>
            Leave server
          </ContextMenuItem>
        </ContextMenu>
      </ContextMenuTrigger>
      <InviteFriendsModal server={server} {...inviteFriendsModal} />
    </>
  );
}
