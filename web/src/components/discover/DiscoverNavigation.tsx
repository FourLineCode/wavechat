import { FaUser } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";
import { DiscoverRoute } from "src/components/discover/DiscoverRoute";

export function DiscoverNavigation() {
	return (
		<div className="flex flex-col flex-1 w-64 px-2 py-4 bg-dark-800 xl:w-80">
			<div className="text-2xl font-semibold">Discover</div>
			<DiscoverRoute text="Users" route="users" icon={FaUser} />
			<DiscoverRoute text="Public Servers" route="servers" icon={HiUserGroup} />
		</div>
	);
}
