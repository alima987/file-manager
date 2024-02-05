import { createReadStream, createWriteStream } from "fs";
import { createBrotliCompress, createBrotliDecompress} from 'zlib'
import { path } from "../utils/path.js";
export async function compressFile(inputPath, outputPath) {
    if (!await path(inputPath)) {
		throw new Error('Not correct path');      
	} 
    const input = createReadStream(inputPath);
    const output = createWriteStream(outputPath);
    const brotli = createBrotliCompress();
    input.pipe(brotli).pipe(output);
}
export async function decompressFile(inputPath, outputPath) {
    if (!await path(inputPath)) {
		throw new Error('Not correct path');      
	} 
    const input = createReadStream(inputPath);
    const output = createWriteStream(outputPath);
    const brotli = createBrotliDecompress();
    input.pipe(brotli).pipe(output)

}