import { DiscoverInvitesPage } from "src/components/discover/DiscoverInvitesPage";
import { DiscoverNavigation } from "src/components/discover/DiscoverNavigation";
import { FriendsInfo } from "src/components/friends/FriendsInfo";
import { Layout } from "src/components/layouts/Layout";
import { NavigationSidebar } from "src/components/navigations/NavigationSidebar";
import { SidebarWithProfile } from "src/components/profile/SidebarWithProfile";
import { authRedirect } from "src/utils/redirects/auth";

export default function DiscoverInvites() {
  return (
    <Layout title="Invites" desc="WaveChat | Discover new people and communities">
      <div className="flex w-screen h-screen">
        <NavigationSidebar />
        <SidebarWithProfile component={DiscoverNavigation} />
        <DiscoverInvitesPage />
        <FriendsInfo />
      </div>
    </Layout>
  );
}

export const getServerSideProps = authRedirect;
