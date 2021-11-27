import { useRouter } from "next/router";
import { HiDotsVertical } from "react-icons/hi";
import { User } from "src/apollo/__generated__/types";
import { ProfileModal } from "src/components/profile/ProfileModal";
import { UserAvatar } from "src/components/profile/UserAvatar";
import {
	DropdownMenu,
	DropdownMenuButton,
	DropdownMenuItem,
	DropdownMenuItems,
} from "src/components/ui/Menu";
import { useModal } from "src/hooks/useModal";
import { useUnfriendMutation } from "src/hooks/useUnfriendMutation";

interface Props {
	user: User;
}

export function MessageThreadTopBar({ user }: Props) {
	const router = useRouter();
	const profileModal = useModal();
	const unfriend = useUnfriendMutation(user.id);

	return (
		<div className="flex items-center justify-between w-full h-12 px-6 py-1 bg-opacity-50 bg-dark-800">
			<div className="flex items-center space-x-2">
				<UserAvatar user={user} className="w-8 h-8 rounded-md ring ring-dark-700" />
				<span className="text-lg font-semibold">{user.displayName}</span>
			</div>
			<div>
				<DropdownMenu>
					<DropdownMenuButton className="p-1 rounded-full cursor-pointer hover:bg-dark-700">
						<HiDotsVertical size="20px" className="rounded-full text-primary" />
					</DropdownMenuButton>
					<DropdownMenuItems>
						<DropdownMenuItem onClick={profileModal.onOpen}>
							<span>View Profile</span>
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={() => {
								unfriend();
								router.push("/messages");
							}}
						>
							Unfriend
						</DropdownMenuItem>
					</DropdownMenuItems>
					<ProfileModal userId={user.id} {...profileModal} />
				</DropdownMenu>
			</div>
		</div>
	);
}
