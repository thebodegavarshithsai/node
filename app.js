const readline=require('readline');

// reading input and writing output
const rl=readline.createInterface({
  input:process.stdin,
  output:process.stdout
})

rl.question("Enter name:",(name)=>{
  console.log(name)
  rl.close()
})

rl.on('close',()=>{
  console.log("interface closed");
  process.exit(0);
})

// const time=()=>{
//   console.log(new Date().toLocaleTimeString())
// }
// setInterval(() => {
//   time()
// }, 1000);

