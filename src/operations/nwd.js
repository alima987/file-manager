import { existsSync, lstatSync, } from "fs";
import { join, resolve } from 'path';
import { readdir, stat } from 'fs/promises';

let currentDir = '';
export async function cd(path) {
    const absPath = resolve(currentDir, path);
    if (existsSync(absPath) && lstatSync(absPath).isDirectory()) {
        currentDir = absPath;
        console.log(`Current directory in ${absPath}`);
    } else {
        console.log('Invalid directory path');
    }
}

  export async function ls(currentDir) {
    try {
        const contents = await readdir(currentDir, { withFileTypes: true });
        const file = [];
        for (const content of contents) {
            const name = content.name;
            const path = join(currentDir, name);
            const stats = await stat(path);
            if (stats.isDirectory()) {
                file.push({ Name: name, Type: 'directory' });
              } else if (stats.isFile() && !stats.isSymbolicLink()) {
                const fileName = `${name}`;
                file.push({ Name: fileName, Type: 'file' });
              }
        }
        const sortedContents = file.sort(async (a, b) => {
            if (a.Type === b.Type) {
                return a.Name.localeCompare(b.Name);
              } else if (a.Type === 'directory') {
                return -1;
              } else {
                return 1;
              }
        });
        console.table(sortedContents);
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
}

