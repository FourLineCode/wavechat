import { User } from '@shared/types/User';
import http from 'http';
import os from 'os';
import { config } from 'src/internal/config';

http.createServer((_req, res) => {
	res.write('Hello World!\n');
	res.write(`From Server: ${os.hostname()}\n`);

	const user: User = { id: 1, name: 'Akmal', age: 21 };
	res.write(`${JSON.stringify(user, null, 2)}\n`);

	res.end();
}).listen(config.port);
console.log(`\nServer is now running on http://localhost:${config.port}\n`);
