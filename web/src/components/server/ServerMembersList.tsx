import { User } from "src/apollo/__generated__/types";
import { Spinner } from "src/components/ui/Spinner";

interface Props {
    members?: User[];
}

export function ServerMembersList({ members }: Props) {
    return (
        <div className="flex flex-col w-64 h-full p-4 space-y-4 shrink-0 xl:w-80 bg-dark-800">
            <div className="text-lg font-bold text-center text-secondary">Members</div>
            {members ? (
                members.map((member) => (
                    <div className="font-semibold text-md">{member.displayName}</div>
                ))
            ) : (
                <div className="flex items-center justify-center w-full mt-20">
                    <Spinner />
                </div>
            )}
        </div>
    );
}
