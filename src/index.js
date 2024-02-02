const currentDirectory = () => {
    const cwd = process.cwd();
    console.log(`You are currently in ${cwd}`)
}

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

const goodbye = () => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`)
}
process.on('exit', () => goodbye())

process.on('SIGINT', () =>{
    process.exit();
})

