import { User, UserCirclePlus, UsersThree } from "phosphor-react";
import { DiscoverRoute } from "src/components/discover/DiscoverRoute";

export function DiscoverNavigation() {
  return (
    <div className="flex flex-col flex-1 w-64 px-2 py-4 bg-dark-800 xl:w-80">
      <div className="text-2xl font-semibold">Discover</div>
      <DiscoverRoute text="Users" route="users" icon={<User weight="fill" size={20} />} />
      <DiscoverRoute
        text="Public Servers"
        route="servers"
        icon={<UsersThree weight="fill" size={20} />}
      />
      <DiscoverRoute
        text="Pending Invites"
        route="invites"
        icon={<UserCirclePlus weight="fill" size={20} />}
      />
    </div>
  );
}
