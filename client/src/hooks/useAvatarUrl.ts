import { Maybe } from 'src/apollo/__generated__/types';

export function useAvatarUrl(avatarUrl?: Maybe<string>, username?: string) {
	if (avatarUrl) return avatarUrl;

	if (!username) username = 'default';
	return `https://avatars.dicebear.com/api/male/${username}.svg`;
}
