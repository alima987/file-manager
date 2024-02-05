import { createReadStream, createWriteStream } from "fs";
import { createBrotliCompress, createBrotliDecompress} from 'zlib'
export async function compressFile(inputPath, outputPath) {
    if (!inputPath || !outputPath) {
        console.error('Invalid input or output path');
        return;
    }

    const input = createReadStream(inputPath);
    const output = createWriteStream(outputPath);
    const brotli = createBrotliCompress();

    input.on('error', (error) => {
        console.error(`Error reading input file: ${error.message}`);
        output.destroy();
    });

    output.on('error', (error) => {
        console.error(`Error writing output file: ${error.message}`);
        input.destroy();
    });

    brotli.on('error', (error) => {
        console.error(`Error compressing file: ${error.message}`);
        input.destroy();
        output.destroy();
    });

    input.pipe(brotli).pipe(output);
}

export async function decompressFile(inputPath, outputPath) {
    try {
        const input = createReadStream(inputPath);
        const output = createWriteStream(outputPath);
        const brotli = createBrotliDecompress();

        input.on('error', (error) => {
            console.error(`Error reading input file: ${error.message}`);
            output.destroy();
        });

        output.on('error', (error) => {
            console.error(`Error writing output file: ${error.message}`);
            input.destroy();
        });

        brotli.on('error', (error) => {
            console.error(`Error decompressing file: ${error.message}`);
            input.destroy();
            output.destroy();
        });

        input.pipe(brotli).pipe(output);
    } catch (error) {
        console.error(`Error decompressing file: ${error.message}`);
    }
}