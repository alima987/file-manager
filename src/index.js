import { homedir } from 'os';
import { createInterface } from 'readline';
const currentDirectory = () => {
    const currentDir = homedir()
    console.log(`You are currently in ${currentDir}`)
}

const rl = createInterface({
    input: process.stdin,
    output: process.stdout
})
const args = process.argv.slice(2);
const usernameFilter = args.findIndex(arg=>arg.startWith('--username='));
const username = "User";
if(usernameFilter !== -1) {
    username = args[usernameFilter].split('=')[1]
}
const greeting = () => {
    console.log(`Welcome to the File Manager, ${username}!`)
}
greeting();
currentDirectory();
rl.question(`Enter command`);

const goodbye = () => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`)
}
process.on('exit', () => goodbye())

process.on('SIGINT', () =>{
    process.exit();
})


