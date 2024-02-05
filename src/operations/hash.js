import { createHash } from 'crypto';
import { createReadStream } from 'fs';
import { path } from '../utils/path.js';

export async function hs(filePath) {
    if (!await path(filePath)) {
        throw new Error('Not correct path');      
    } 
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