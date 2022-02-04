import { FaChevronCircleDown } from "react-icons/fa";
import { Server } from "src/apollo/__generated__/types";
import { Spinner } from "src/components/ui/Spinner";

interface Props {
    server?: Server;
}

export function ServerInfoSidebar({ server }: Props) {
    return (
        <div className="flex flex-col flex-1 w-64 bg-dark-800 xl:w-80">
            {server ? (
                <div className="w-full h-full">
                    <div className="relative w-full h-32 overflow-hidden bg-gradient-to-b from-dark-900 to-dark-700">
                        {server.iconUrl && (
                            <>
                                <img
                                    src={server.iconUrl}
                                    alt="server-banner"
                                    className="object-cover w-full h-full"
                                />
                                <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-transparent to-dark-900">
                                    <div className="flex items-center justify-between p-2 font-bold">
                                        <div className="truncate">{server.name}</div>
                                        <div className="transition-colors cursor-pointer text-secondary hover:text-primary">
                                            <FaChevronCircleDown />
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-center w-full mt-20">
                    <Spinner />
                </div>
            )}
        </div>
    );
}
