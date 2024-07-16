const fs=require('fs');

const content="RadhaKrishna"
const wl=fs.writeFileSync('demo.txt',content)

const rl=fs.readFileSync('demo.txt','utf8')

console.log(rl)
