import { User } from "src/apollo/__generated__/types";
import { ProfileModal } from "src/components/profile/ProfileModal";
import { SeetingsButton } from "src/components/profile/SettingsButton";
import { UserAvatar } from "src/components/profile/UserAvatar";
import { useModal } from "src/hooks/useModal";
import { useAuth } from "src/store/useAuth";

export function ProfileInfo() {
    const user = useAuth().user;
    const profileModal = useModal();

    return (
        <div className="flex items-center justify-between w-full h-16 p-2 bg-dark-900">
            <div className="flex items-center space-x-2">
                <UserAvatar
                    user={user as User}
                    onClick={profileModal.onOpen}
                    className="w-12 h-full rounded-lg cursor-pointer shrink-0 hover:ring-2 ring-brand-500"
                />
                <div>
                    <div
                        onClick={profileModal.onOpen}
                        className="font-semibold cursor-pointer text-primary hover:underline line-clamp-1"
                    >
                        {user?.displayName}
                    </div>
                    <div className="flex items-center text-sm text-green-500">
                        <span className="mr-0.5">•</span>
                        <span>Online</span>
                    </div>
                </div>
            </div>
            <SeetingsButton />
            {user && <ProfileModal userId={user.id} {...profileModal} />}
        </div>
    );
}
