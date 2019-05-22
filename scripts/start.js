
const  child = require('child_process')

console.log("Iniciando projeto...")

console.log("Compilando TS...")
child.execSync('tsc ./app/main.ts')

console.log("Iniciando o servidor...")
child.execSync('node ./scripts/server.js')

