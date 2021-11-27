import { DiscoverNavigation } from "src/components/discover/DiscoverNavigation";
import { DiscoverUsersPage } from "src/components/discover/DiscoverUsersPage";
import { FriendsInfo } from "src/components/friends/FriendsInfo";
import { Layout } from "src/components/layouts/Layout";
import { NavigationSidebar } from "src/components/navigations/NavigationSidebar";
import { SidebarWithProfile } from "src/components/profile/SidebarWithProfile";
import { authRedirect } from "src/utils/redirects/auth";

export default function DiscoverUsers() {
	return (
		<Layout title="Discover" desc="WaveChat | Discover new people and communities">
			<div className="flex w-screen h-screen">
				<NavigationSidebar />
				<SidebarWithProfile component={DiscoverNavigation} />
				<DiscoverUsersPage />
				<FriendsInfo />
			</div>
		</Layout>
	);
}

export const getServerSideProps = authRedirect;
