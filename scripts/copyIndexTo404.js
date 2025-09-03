// scripts/copyIndexTo404.js
const fs = require('fs')
const path = require('path')
const dist = path.resolve(__dirname, '..', 'dist')
const index = path.join(dist, 'index.html')
const dest = path.join(dist, '404.html')

if (!fs.existsSync(index)) {
    console.error('No existe dist/index.html. Ejecuta "npm run build" primero.')
    process.exit(1)
}

fs.copyFileSync(index, dest)
console.log('OK: dist/index.html -> dist/404.html')
