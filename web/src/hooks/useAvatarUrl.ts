import { User } from "src/apollo/__generated__/types";

const DEFAULT_AVATAR =
    "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png";

export function useAvatarUrl(user: User | null) {
    if (user?.avatarUrl) {
        return user.avatarUrl;
    }

    return DEFAULT_AVATAR;
}
