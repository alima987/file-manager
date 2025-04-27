import { app } from "./app.js"
const args = process.argv.slice(2)
    const filterArgs = args.findIndex((el) => el.startsWith("--username="))
    let username = "User";
    if (filterArgs !== -1) {
        username = args[filterArgs].split('=')[1]
    }
const greeting = () => {
    const greet = `Welcome to the File Manager, ${username}!`
    console.log(greet)
}
greeting()
app(username)