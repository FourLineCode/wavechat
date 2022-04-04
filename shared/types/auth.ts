export interface UserDTO {
  id: string;
  username: string;
  displayName: string;
  avatarUrl?: string | null;
}

export interface AuthorizeSocketDTO {
  authorized: boolean;
  user: UserDTO | null;
}
