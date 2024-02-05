import { createInterface } from 'readline';
import { resolve } from 'path'; 
import * as nwd from './operations/nwd.js';
import * as fs from './operations/fs.js';
import { operatingSysteInfo } from './operations/os.js';
import { hs } from './operations/hash.js';

export const app = async(username, homedir) => {
    let currentDir = homedir;

    const rl = createInterface({
        input: process.stdin,
        output: process.stdout
    })
    
    const goodbye = () => {
        console.log(`Thank you for using File Manager, ${username}, goodbye!`)
    }
    process.on('exit', () => goodbye())
    
    process.on('SIGINT', () =>{
        process.exit();
    })

    function updatePrompt() {
        rl.setPrompt(`You are currently in ${currentDir}\n`);
        rl.prompt();
    }

    async function up() {
        const parentDir = resolve(currentDir, '..');
        if (parentDir !== currentDir) {
            currentDir = parentDir;
            updatePrompt();
        } else {
            console.log(`You are already in the root folder ${currentDir}`);
        }
    }
    
    async function cd (path) {
        const newDir = await nwd.cd(currentDir, path);
        if (newDir) {
            currentDir = newDir;
            updatePrompt();
        }
    }
    
    async function ls () {
        await nwd.ls(currentDir);
        updatePrompt();
    }
    
    async function cat(pathToFile) {
        await fs.cat(pathToFile);
        updatePrompt();
    }
    
    async function add(fileName) {
        await fs.add(currentDir, fileName);
        updatePrompt();
    }
    async function rn(oldFileName, newFileName) {
        await fs.rn(currentDir, oldFileName, newFileName);
        updatePrompt();
    }
    async function cp(sourceFilePath, destinationDir) {
        await fs.cp(sourceFilePath, destinationDir);
        updatePrompt();
    }
    async function mv(sourceFilePath, destinationDir) {
        await fs.mv(sourceFilePath, destinationDir);
        updatePrompt();
    }
    async function rm(filePath) {
        await fs.rm(filePath);
        updatePrompt();
    }
    async function os(arg) {
        operatingSysteInfo(arg);
        updatePrompt();
    }
    async function hash(filePath) {
        await hs(filePath);
        updatePrompt();
    }
    rl.on('line', async (input) => {
        const [command, ...args] = input.trim().split(' ');
        switch (command) {
            case 'up':
                await up();
                break;
            case 'cd':
                await cd(args[0]);
                break;
            case 'ls':
                await ls();
                break;
            case 'cat':
                await cat(input.substring(4).trim());
                break;
            case 'add':
                await add(args[0]);
                break;
            case 'rn':
                await rn(args[0], args[1]);
                break;
            case 'cp':
                await cp(args[0], args[1]);
                break;
            case 'mv':
                await mv(args[0], args[1]);
                break;
            case 'rm':
                await rm(args[0]);
                break;
            case 'os':
                await os(args[0]);
                break;
            case 'hash':
                await hash(args[0]);
                break;
            default:
                console.log('Invalid input');
                rl.prompt();
        }
    });

    updatePrompt();
}