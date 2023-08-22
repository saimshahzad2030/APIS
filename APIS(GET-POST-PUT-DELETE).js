const express = require('express');
const multer = require('multer');
require('dotenv').config({ path: './config.env' })
const connectDb = require("./db/db")

const port = process.env.PORT || 5000
const model = require("./models/prodModel")
connectDb("myDB");

const app = express()

app.use(express.json());
app.post("/user", async (req, res) => {
    const prod = new model(req.body);
    const data = await prod.save();
    console.log(data)
    res.send("Done")

})
app.get("/prod/:_id", async (req, res) => {

    let matchData = await model.find({ _id: req.params }); //getting data from mongodb using id (default) parameter
    //here request.params indicate >>> https://localhost:3333/prod/<this>
    //In my case i entereed https://localhost:3333/prod/64de2962fe0b5cc1db77224a
    //model.find({_id:64de2962fe0b5cc1db77224a}) 
    console.log(matchData)
})
app.delete("/del/:_id", async (req, res) => {
    let matchData = await model.deleteOne({ _id: req.params }); //deleting data from mongodb using id (default) parameter
    //same as find()>> prev>> app.get code
    res.send("Done")
})
app.put("/p/:name", async (req, res) => {
    let data2update = await model.updateOne(
        req.params, {
        $set: req.body
    }
    )
    res.send(data2update)
})


//Search Api

app.get("/search/:key", async (req, res) => {
    let matchData = await model.find({
        // $or representing all collection search mean all db search
        "$or": [
            { "name":{$regex :req.params.key} },//it represensts the matching scenario (matching only occurs with name attribute)
            { "type":{$regex :req.params.key} }// willl represenst all result that have :id val as akeyword in whether name or type field
            // can be implied on more fields
        ]
    });
    res.send(matchData)
})

//multer
//for file uploading from server to client
//multer function as a middle ware use hoga routes mein
const upload = multer({
    storage:multer.diskStorage({//outer object of multer function
        destination:function(req,file,cb){
        //outer object's first key:value code
        //cb > callback
        //file >> file    
        //cb(error object value, "folder on which file will be gett")
        cb(null,"uploaded_files");
        
    

    },
    filename:function(req,file,cb){
        //outer object's 2nd key pair
        cb(null,file.fieldname + "-" + Date.now() + ".png");
        //cb(error object value, fieldname jo hum thunderclient mein daalenge + jo hum krna chahien xyz + extension)
    }

    })
}).single("user_file");


//denotes that we are uploading single file
//it's value will be same as what u r entering on thunderclient/body/form/files/fieldname
//as a second paramter middleware k tor pr use hogaya upload functioon neeche waale route mein:


app.post("/up",upload,(req,res)=>{
    res.send("file uploaded")
})










app.listen(port, () => {
    console.log(`listening to ${port}`);
})