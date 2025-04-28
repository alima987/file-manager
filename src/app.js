import { homedir } from "os";
import readline from 'node:readline/promises';
import * as nwd from "./operations/nwd.js"
import { stdin as input, stdout as output } from 'node:process';
import path from "node:path";
const rl = readline.createInterface({ input, output });
export const app = (username) => {
    let currDir = homedir()
    const goodbye = () => {
        console.log(`\nThank you for using File Manager,  ${username}, goodbye!`); 
    }
    const currDirCommand = () => {
      rl.setPrompt(`You are currently in ${currDir}\n`);
      rl.prompt()
    }
    process.on('exit', () => {
        goodbye()
    });
    process.on('SIGINT', () => {
        exitProcess()
    })
    async function exit() {
      process.exit();
    }
    async function exitProcess() {
        goodbye() 
        process.exit()
    }
    const up = async() => {
      const newPath = await nwd.up(currDir)
      if (newPath) {
        currDir = newPath
        currDirCommand()
      }
    }
    const cd = async(path) => {
      const newPath = await nwd.cd(currDir, path)
      if (newPath) {
        currDir = newPath
        currDirCommand()
      }
    }
    const ls = async() => {
      const newPath = await nwd.ls(currDir) 
        if (newPath) {
          currDir = newPath
          currDirCommand()
        }
    }
    rl.on('line', async(input) => {
      console.log(input)
      const [command, ...args] = input.trim().split(' ')
      switch(command) {
        case ".exit":
          await exit(); 
          break;
        case "up":
          await up();
          break;
        case 'cd':
          await cd(args[0]);
          break;
        case 'ls':
          await ls();
          break;
        default:
          console.log(`Invalid input`);
          rl.prompt();
      }
  });
  currDirCommand()
}
