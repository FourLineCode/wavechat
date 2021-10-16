import { AuthService } from 'src/services/AuthService';
import { UserService } from 'src/services/UserService';

export const services = {
	userService: UserService.getInstance(),
	authService: AuthService.getInstance(),
};
