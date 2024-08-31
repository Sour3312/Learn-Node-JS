// pure node js code without express v2
// with html & json files

const http = require("http");
const fs = require("fs");

let file = fs.readFileSync("index.html", "utf-8");
let jsonfile = fs.readFileSync("data.json", "utf-8");

let server = http.createServer((req, res) => {
  console.log("server started");

  switch (req.url) {
    case "/": 
      // http://localhost:8080/
      res.setHeader("Content-type", "text/html");
      res.end(file);
      break;

    case "/api":
      //localhost:8080/api
      res.setHeader("Content-type", "application/json");
      res.end(jsonfile);
      break;

    default: 
      // http://localhost:8080/kuchbhi
      res.writeHead("404");
      res.end();
      break;
  }
});

server.listen(8080);
