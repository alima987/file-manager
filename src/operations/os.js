import os from 'os'; 

export const operatingSystem = async (arg) => {
 switch (arg) {
    case "--EOL":
      const eol = os.EOL
      console.log(`Default system End-Of-Line (EOL): ${JSON.stringify(eol)}`); 
      break;
    case "--cpus":
      const cpus = os.cpus()
      console.log(`CPUs info: ${cpus}`); 
      cpus.forEach((cpu, index) => {
        const model = cpu.model;
        const clockRate = (cpu.speed / 1000).toFixed(2)
        console.log(`CPU ${index + 1}: ${model} ${clockRate} GHz`)
      })
      break;
     case "--homedir":
        const homedir = os.homedir()
        console.log(`Home directory: ${homedir}`)
        break
    case "--username":
        const username = os.userInfo().username
        console.log(`Username: ${username}`)
        break   
    case "--architecture":
        const architecture = os.arch()
        console.log(`CPU architecture: ${architecture}`)
        break 
    default:
      console.log(`Invalid argument ${arg}`)
 }
}