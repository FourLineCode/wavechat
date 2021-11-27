import clsx from "clsx";
import { useCallback, useEffect, useRef } from "react";
import { User } from "src/apollo/__generated__/types";
import { UserAvatar } from "src/components/profile/UserAvatar";
import { useMessageUserMutation } from "src/hooks/useMessageUserMutation";

interface Props {
	user: User;
	onClose: () => void;
	active?: boolean;
}

export function SearchUserCard({ user, onClose, active = false }: Props) {
	const ref = useRef<HTMLDivElement>(null);
	const getOrCreateMessageThread = useMessageUserMutation();

	const getMessageThread = () => {
		getOrCreateMessageThread({ variables: { userId: user.id } });
		onClose();
	};

	const enterKeyHandler = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === "Enter" && active) {
				getMessageThread();
			}
		},
		[active]
	);

	useEffect(() => {
		window.addEventListener("keydown", enterKeyHandler);

		return () => {
			window.removeEventListener("keydown", enterKeyHandler);
		};
	}, [active]);

	useEffect(() => {
		if (active && ref.current) {
			ref.current.scrollIntoView({
				behavior: "smooth",
				block: "nearest",
			});
		}
	}, [active]);

	return (
		<div
			ref={ref}
			onClick={getMessageThread}
			className={clsx(
				active && "!bg-dark-800",
				"flex items-center p-1 space-x-2 rounded-lg cursor-pointer bg-dark-900 hover:bg-dark-800"
			)}
		>
			<UserAvatar user={user} className="flex-shrink-0 w-10 h-10 rounded-lg" />
			<div className="w-full">
				<div className="font-semibold cursor-pointer line-clamp-1 group-hover:underline">
					{user.displayName}
				</div>
				<div className="text-xs line-clamp-1 text-secondary">
					{user.university ?? "unknown"}
				</div>
			</div>
		</div>
	);
}
