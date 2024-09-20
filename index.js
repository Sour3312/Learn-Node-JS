const express = require("express");
let server = express();
let route = require('./router');

server.use('/api', route); 
// http://localhost:3001/api/login

server.listen(3001, () => {
  console.log("server started");
});
