// pure node js code without express v3
// with html & json files
// here json data dynamically passes to html
// we can search the individual product by entring id of that into search url 
//localhost:8080/product/11...


const http = require("http");
const fs = require("fs");

let file = fs.readFileSync("index.html", "utf-8");
let jsonfile = JSON.parse(fs.readFileSync("data.json", "utf-8"));
let json = fs.readFileSync("data.json", "utf-8");
// let product = jsonfile.products[0];
let products = jsonfile.products;

let server = http.createServer((req, res) => {
  console.log("server started");

  // for all product list number wise after /product/1,2,3...
  if (req.url.startsWith("/product")) {
    const id = req.url.split("/")[2];
    const product = products.find((p) => p.id === +id);
    console.log(product);
    res.setHeader("Content-type", "text/html");
    let modifiedfile = file
      .replace("**title**", product.title)
      .replace("**desc**", product.body)
      .replace("**userid**", product.userId)
      .replace("**count**", id);
    res.end(modifiedfile);
    return;
  }

  switch (req.url) {
    case "/":
      // http://localhost:8080/
      res.setHeader("Content-type", "text/html");
      res.end(file);
      break;

    case "/api":
      //localhost:8080/api
      res.setHeader("Content-type", "application/json");
      res.end(JSON.stringify(json));
      break;

    // case "/product":
    //   //localhost:8080/api
    //   res.setHeader("Content-type", "text/html");
    //   let modifiedfile = file.replace('**title**',product.title).replace('**desc**',product.body).replace('**userid**',product.userId);
    //   res.end(modifiedfile);
    //   break;

    default:
      // http://localhost:8080/kuchbhi
      res.writeHead("404");
      res.end();
      break;
  }
});

server.listen(8080);
