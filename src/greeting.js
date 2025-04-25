
const greeting = () => {
    const args = process.argv.slice(2)
    const filterArgs = args.findIndex((el) => el.startsWith("--username="))
    let username
    if (filterArgs !== -1) {
        username = args[filterArgs].split('=')[1]
    }
    const greet = `Welcome to the File Manager, ${username}!`
    console.log(greet)
}
greeting()