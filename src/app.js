import { createInterface } from 'readline';
export const app = async(username, homedir) => {
        const currentDir = homedir
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
    const commands = new Map ();
    function processInput(input) {
        const [command, ...args] = input.trim().split(' ');
        return [command, args];
    }
    while (true) {
        const qwestion = await new Promise(resolve => rl.question(`You are currently in ${currentDir}\n`, resolve));
    
        const [command, ...args] = processInput(qwestion);
    
        const commandsGf = commands.get(command)
        if (commandsGf && validate(command, args)) {
            try {
                await commandsGf(args);
            } catch (error) {
                console.log(`Operation failed`);
            }
        } else {
            console.log('Invalid input');
        }
    }
    
}
