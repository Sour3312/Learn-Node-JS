// basics of middleware in node js
// https://expressjs.com/en/5x/api.html#req

const express = require("express");
const fs = require("fs");

let server = express();

let json = JSON.parse(fs.readFileSync("data.json", "utf-8"));

server.use((req, res, next) => {
  // middleware (use to manupulate req & res)
  console.log(req.ip, req.xhr, req.method, req.hostname);
  console.log(req.get("User-Agent"));
  next();
});

let auth = (req, res, next) => {
  if (req.query.password == 123) {
    next();
  } else {
    res.sendStatus(401);
  }
};

// server.use(auth); // for all routes(globally) application level middleware

server.get("/", auth, (req, res) => { // route level middleware
  // we can use middleware manuallly here
  res.json(json);
});

server.post("/", (req, res) => {
  res.json({ type: "POST" });
});

server.listen(8080, () => {
  console.log("server started");
});

// we can put middleware for all or for any single route also