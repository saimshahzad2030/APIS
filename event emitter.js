const express = require('express');
const eventEmitter = require('events');
const app = express();

const event = new eventEmitter();
let count = 0;
event.on("count",()=>{
    count ++;
    console.log("Api Called", count)
})

app.get("/search",(req,res)=>{
    res.send("Search Api Called")
    event.emit("count");
})

app.get("/update",(req,res)=>{
    res.send("Update Api Called")
    event.emit("count");

})

app.get("/home",(req,res)=>{
    res.send("Home called")
    event.emit("count");
})
app.listen(3333,()=>{
    console.log("https://localhost:3333")
})