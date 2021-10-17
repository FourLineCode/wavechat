import { AuthService } from 'src/services/AuthService';
import { DataLoaderService } from 'src/services/DataLoaderService';
import { DiscoverService } from 'src/services/DiscoverService';
import { UserService } from 'src/services/UserService';

export const services = {
	dataLoaderService: DataLoaderService.getInstance(),
	userService: UserService.getInstance(),
	authService: AuthService.getInstance(),
	discoverService: DiscoverService.getInstance(),
};
