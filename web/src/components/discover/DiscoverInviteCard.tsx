import { CircleWavyQuestion } from "phosphor-react";
import { ServerInvite } from "src/apollo/__generated__/types";

interface Props {
    invite: ServerInvite;
}

export function DiscoverInviteCard({ invite }: Props) {
    return (
        <div className="w-full mb-4 overflow-hidden rounded-lg min-w-64 bg-dark-800">
            {invite.server.bannerUrl ? (
                <img
                    src={invite.server.bannerUrl}
                    alt="server-icon"
                    className="flex-shrink-0 object-cover w-full h-24"
                />
            ) : (
                <div className="w-full h-24 bg-gradient-to-b from-dark-800 to-dark-900" />
            )}
            <div className="flex items-center p-2 space-x-2">
                {invite.server.iconUrl ? (
                    <img
                        src={invite.server.iconUrl}
                        alt="server-icon"
                        className="flex-shrink-0 object-cover w-12 h-12 rounded-lg"
                    />
                ) : (
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-dark-700">
                        <CircleWavyQuestion size={28} weight="bold" className="text-secondary" />
                    </div>
                )}
                <div className="">
                    <div className="text-lg font-semibold break-all line-clamp-1">
                        {invite.server.name}
                    </div>
                    <div className="text-xs text-secondary">{invite.server.type}</div>
                </div>
            </div>
        </div>
    );
}
