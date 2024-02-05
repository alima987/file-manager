import { createHash } from 'crypto';
import { createReadStream } from 'fs';

export async function hs(filePath) {
    const hash = createHash('sha256');
    const input = createReadStream(filePath);

    input.on('data', (chunk) => {
        hash.update(chunk);
    });

    input.on('end', () => {
        const fileHash = hash.digest('hex');
        console.log(`Hash: ${fileHash}`);
    });

    input.on('error', (err) => {
        console.error(`Error reading file`);
    });
}