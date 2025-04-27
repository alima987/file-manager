import os from 'os'; 
import path from 'node:path';
import { cwd }from 'node:process';
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
const rl = readline.createInterface({ input, output });
export const app = async (username) => {
    const homedir = os.homedir()
    console.log(`You are currently in ${homedir}`); 
    const goodbye = () => {
        console.log(`Thank you for using File Manager,  ${username}, goodbye!`); 
    }
    const command = await rl.question('Enter your command: ');
      if (command.trim() === '.exit') {
        exitProcess()
      } else { 
        console.log(`Answer: ${command}`);
      }
    process.on('exit', () => {
        goodbye()
    });
    process.on('SIGINT', () => {
        exitProcess()
    })
    function exitProcess() {
        goodbye() 
        rl.close();
        process.exit()
    }
}

app();