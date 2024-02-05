import { createHash } from 'crypto';
import { createReadStream } from 'fs';
export async function hs(filePath) {
    return new Promise((resolve, reject) => {
        const hash = createHash('sha256');
        const input = createReadStream(filePath);

        input.on('data', (chunk) => {
            hash.update(chunk);
        });

        input.on('end', () => {
            const fileHash = hash.digest('hex');
            resolve(fileHash);
            console.log(`Hash: ${fileHash}`);
        });

        input.on('error', (err) => {
            reject(err);
        });
    });
}