import { createInterface } from 'readline';
import { resolve } from 'path'; 
import { ls } from './operations/nwd.js';
import * as nwd from './operations/nwd.js';

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
    async function up() {
        const parentDir = resolve(currentDir, '..');
        if (parentDir !== currentDir) {
            currentDir = parentDir;
            console.log(`You are currently in ${currentDir}`);
        } else {
            console.log(`You are already in the root folder ${currentDir}`);
        }
    }
    async function cd (path) {
        currentDir = await nwd.cd(currentDir, path);
      }
    
    async function ls () {
        await nwd.ls(currentDir)
    }
    rl.on('line', (input) => {
        const [command, ...args] = input.trim().split(' ');
        switch (command) {
            case 'up':
                up();
                break;
            case 'cd':
                cd(args[0]);
                break;
            case 'ls':
                ls();
                break;
            default:
                console.log('Invalid input');
        }
        rl.prompt();
    });

    rl.setPrompt(`You are currently in ${currentDir}\n`);
    rl.prompt();
}
