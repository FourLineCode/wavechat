import fs from 'fs';
import path from 'path';
import { upload } from 'src/aws/upload';

export function testUpload() {
	const filePath = path.resolve(process.cwd(), 'typescript.png');
	const fileStream = fs.createReadStream(filePath);
	const fileName = `test-image-${Date.now().toString()}.jpg`;
	upload(fileName, fileStream);
}
