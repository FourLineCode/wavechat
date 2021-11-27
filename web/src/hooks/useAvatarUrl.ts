import { User } from "src/apollo/__generated__/types";

export function useAvatarUrl(user: User | null) {
	if (user?.avatarUrl) return user.avatarUrl;

	return `https://avatars.dicebear.com/api/male/${
		user?.username ?? user?.displayName ?? "defalut"
	}.svg`;
}
