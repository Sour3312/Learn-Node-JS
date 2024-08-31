// 2. file system

// 2.1 synchronous way (read the text file)

// const fs = require("fs");
// console.log("1");
// console.log(fs.readFileSync("index.txt", "utf-8"));
// console.log("2");

// 2.2 async way
console.log("1");
console.log(performance.now());

const fs = require("fs");
fs.readFile("index.txt", "utf-8", (err, txt) => {
  console.log(txt);
});
console.log("2");
console.log(performance.now());
