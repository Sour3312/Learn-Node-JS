// intro to express js

const express = require('express');
const fs = require('fs');

let server = express();

let json = JSON.parse(fs.readFileSync('data.json','utf-8'));

server.get('/',(req,res)=>{
  // res.json({type:'GET'});
  res.json(json);
  // res.sendStatus(404);
  // res.send('<h1>Sourabh</h1>');
  // res.status(201).send('<h1>Sourabh</h1>');
  // res.sendFile('C:\Users\SOURABH KUMAR MAHATO\Desktop\Node JS\index.html')
});

server.post('/',(req,res)=>{
  res.json({type:'POST'})
});

server.patch('/',(req,res)=>{
  res.json({type:'PATCH'});
});

server.put('/',(req,res)=>{
  res.json({type:'PUT'})
});

server.delete('/',(req,res)=>{
  res.json({type:'DELETE'})
});

server.listen(8080,()=>{
  console.log('server started');
});