import crypto from 'crypto';
import fs from 'fs';
export const hashFile = (pathToFile) => {
    try {
      const hash = crypto.createHash('sha256');
      const rs = fs.createReadStream(pathToFile);
      rs.on('data', chunk => hash.update(chunk));
      rs.on('end', () => {
          const digest = hash.digest('hex');
          console.log(`Calculated hash: ${digest}`);
      });
      rs.on('error', (err) => {
        console.error(`Operation failed! Error reading file`);
    });
    } catch (error) {
        console.error(`Operation failed! Error going up: ${error.message}`);
    }
}