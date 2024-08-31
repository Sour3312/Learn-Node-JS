// pure node js code without express

const http = require('http');

let obj ={'name':'sourabh'}

let server = http.createServer((req,res)=>{
    console.log("server started");
    console.log(req.url);
    
    res.setHeader('Sourabh','Its a header'); // custom header
    res.setHeader('Content-Type','application/json'); 
    res.end(JSON.stringify(obj));
});

server.listen(8080);


// every time the content-type matters always
    // text/html - treat as html otherwise normal string
    // application - treat as json otherwise normal string

// we cannot pass object directly to res.end it will give error. so we need to convert that into string. 
// but the problem is node cannot understand we are passing json to it not string. so we need to use (content-type application/json)
    // without (content-type application/json) - treat as string
    // with (content-type application/json) - treat as json