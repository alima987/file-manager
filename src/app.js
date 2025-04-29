import { homedir } from "os";
import readline from 'node:readline/promises';
import * as nwd from "./operations/nwd.js"
import * as bowf from "./operations/bowf.js"
import * as cdo from "./operations/cdo.js"
import { hashFile } from "./operations/hash.js"
import { operatingSystem } from "./operations/os.js"
import { stdin as input, stdout as output } from 'node:process';

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
    const cat = async(pathToFile) => {
      await bowf.cat(pathToFile)
      currDirCommand()
    }
    const add = async(newFileName) => {
      await bowf.add(currDir, newFileName)
      currDirCommand()
    }
    const mkdir = async(newDirName) => {
      await bowf.mkdir(currDir, newDirName)
      currDirCommand()
    } 
    const rn = async(pathToFile, newFileName) => {
      bowf.rn(currDir, pathToFile, newFileName)
      currDirCommand()
    }

    const cp = async(pathToFile, pathToNewDir) => {
      bowf.cp(pathToFile, pathToNewDir)
      currDirCommand()
    }

    const mv = async(pathToFile, pathToNewDir) => {
      await bowf.mv(pathToFile, pathToNewDir)
      currDirCommand()
    }

    const rm = async(pathToFile) => {
      await bowf.rm(pathToFile)
      currDirCommand()
    }
    const os = async(arg) => {
      await operatingSystem(arg)
      currDirCommand()
    }
    const hash = async(pathToFile) => {
      hashFile(pathToFile)
      currDirCommand()
    }
    const compress = async(pathToFile, pathToDest) => {
      cdo.compress(pathToFile, pathToDest)
      currDirCommand()
    }
    const decompress = async(pathToFile, pathToDest) => {
      cdo.decompress(pathToFile, pathToDest)
      currDirCommand()
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
        case 'cat':
          await cat(args[0]);
          break;
        case 'add':
          await add(args[0]);
          break;
        case 'mkdir':
          await mkdir(args[0]);
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
        case 'compress':
          await compress(args[0], args[1]);
          break;
        case 'decompress':
          await decompress(args[0], args[1]);
          break;
        default:
          console.log(`Invalid input`);
          rl.prompt();
      }
  });
  currDirCommand()
}
