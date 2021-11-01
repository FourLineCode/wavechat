import { UserDTO } from './message';

export interface AuthorizeSocketDTO {
	authorized: boolean;
	user: UserDTO | null;
}
