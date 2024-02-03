import { homedir } from "os";
import { app } from "./app.js";

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
app(username, homedir())