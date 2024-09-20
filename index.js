const express = require("express");
let server = express();
let route = require('./router');

server.use('/api', route);

server.listen(3001, () => {
  console.log("server started");
});
