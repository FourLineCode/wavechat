import { User } from 'src/apollo/__generated__/types';

export function useAvatarUrl(user: Partial<User> | null) {
	if (user?.avatarUrl) return user.avatarUrl;

	return `https://avatars.dicebear.com/api/male/${user?.username ?? 'defalut'}.svg`;
}
