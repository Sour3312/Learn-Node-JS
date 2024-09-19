// https://expressjs.com/en/guide/using-middleware.html#middleware.third-party

const express = require("express");
const fs = require("fs");
const os = require("os");

let server = express();

let json = JSON.parse(fs.readFileSync("data.json", "utf-8"));

server.use(express.json()); // it is also a middleware(built-in)
server.use(express.static("public")); // it is also a middleware(built-in) 
                                      // http://localhost:8080/data.json 
                                      //http://localhost:8080/image.png

server.use((req, res, next) => {
  console.log(req.ip, req.xhr, req.method, req.hostname);
  console.log(req.get("User-Agent"));
  next();
});

let auth = (req, res, next) => {
  if (req.body.password == 123) {
    next();
  } else {
    res.sendStatus(401);
  }
};
// server.use(auth); // for all routes(globally) application level middleware

server.get("/", auth, (req, res) => {
  // we can use middleware manuallly here
  // route level middleware
  res.json(json);
});

server.get("/ip", auth, (req, res) => {
  const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  res.json(clientIp);
  console.log(os.type(),os.userInfo());
  console.log(clientIp);
  
});

server.post("/", (req, res) => {
  res.json({ type: "POST" });
});

server.listen(3000, () => {
  console.log("server started");
});
