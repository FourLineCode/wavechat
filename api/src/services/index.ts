import * as authService from 'src/services/auth.service';
import * as dataloaderService from 'src/services/dataloader.service';
import * as discoverService from 'src/services/discover.service';
import * as friendshipService from 'src/services/friendship.service';
import * as messageService from 'src/services/message.service';
import * as messageThreadService from 'src/services/messageThread.service';
import * as rtcService from 'src/services/rtc.service';
import * as searchService from 'src/services/search.service';
import * as userService from 'src/services/user.service';

export const services = {
	dataloader: dataloaderService,
	user: userService,
	auth: authService,
	discover: discoverService,
	friendship: friendshipService,
	search: searchService,
	messageThread: messageThreadService,
	message: messageService,
	rtc: rtcService,
};
