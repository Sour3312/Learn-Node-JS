// pure node js code without express v3
// with html & json files
// here json data dynamically passes to html

const http = require("http");
const fs = require("fs");

let file = fs.readFileSync("index.html", "utf-8");
let jsonfile = JSON.parse(fs.readFileSync("data.json", "utf-8"));
let product = jsonfile.products[1];

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
      res.end(JSON.stringify(jsonfile));
      break;

      case "/product":
        //localhost:8080/api
        res.setHeader("Content-type", "text/html");
        let modifiedfile = file.replace('**title**',product.title).replace('**desc**',product.body).replace('**userid**',product.userId);
        res.end(modifiedfile);
        break;

    default: 
      // http://localhost:8080/kuchbhi
      res.writeHead("404");
      res.end();
      break;
  }
});

server.listen(8080);
