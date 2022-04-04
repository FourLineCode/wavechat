import { User } from "src/apollo/__generated__/types";
import { useAvatarUrl } from "src/hooks/useAvatarUrl";

interface Props extends React.HTMLAttributes<HTMLImageElement> {
  user: User;
  className?: string;
}

export function UserAvatar({
  user,
  className = "object-cover w-16 h-16 rounded-lg",
  ...props
}: Props) {
  const avatarUrl = useAvatarUrl(user);

  return <img src={avatarUrl} alt="avatar" className={className} {...props} />;
}
