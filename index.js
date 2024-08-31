const express = require('express');

let server = express();
server.listen(8080);

//     "nodemon": "^3.1.4" (Major.Minor.Patch) - allowed for minor change only
//     "nodemon": "*3.1.4" (Major.Minor.Patch) - allowed for major change
//     "nodemon": "~3.1.4" (Major.Minor.Patch) - allowed for patch change only