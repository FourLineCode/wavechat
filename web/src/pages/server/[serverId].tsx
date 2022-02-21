import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import {
    GetServerQuery,
    GetServerQueryVariables,
    Server,
    User,
} from "src/apollo/__generated__/types";
import { Layout } from "src/components/layouts/Layout";
import { NavigationSidebar } from "src/components/navigations/NavigationSidebar";
import { SidebarWithProfile } from "src/components/profile/SidebarWithProfile";
import { ServerInfoSidebar } from "src/components/server/ServerInfoSidebar";
import { ServerMembersList } from "src/components/server/ServerMembersList";
import { Spinner } from "src/components/ui/Spinner";
import { authRedirect } from "src/utils/redirects/auth";

const GET_SERVER = gql`
    query GetServer($serverId: String!) {
        server(serverId: $serverId) {
            id
            name
            type
            iconUrl
            bannerUrl
            createdAt
            members {
                id
                username
                displayName
                avatarUrl
                university
                department
            }
        }
    }
`;

export default function ServerById() {
    const router = useRouter();
    const serverId = router.query.serverId as string;

    const { data, loading } = useQuery<GetServerQuery, GetServerQueryVariables>(GET_SERVER, {
        variables: { serverId },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return (
        <Layout title={data?.server.name || "Server"} desc="WaveChat | Server description">
            <div className="flex w-screen h-screen">
                <NavigationSidebar />
                <SidebarWithProfile
                    component={() => <ServerInfoSidebar server={data?.server as Server} />}
                />
                <div className="flex flex-col items-center justify-center flex-1 bg-dark-700">
                    {loading ? (
                        <Spinner />
                    ) : data ? (
                        <div className="text-xl font-bold text-primary">
                            Server {data.server.name}
                        </div>
                    ) : (
                        <div className="text-3xl font-bold text-muted">Server not found</div>
                    )}
                </div>
                <ServerMembersList members={data?.server.members as User[]} />
            </div>
        </Layout>
    );
}

export const getServerSideProps = authRedirect;
