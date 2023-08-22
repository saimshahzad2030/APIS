const mongoose = require('mongoose')
require('dotenv').config({ path: './config.env' })
const connectDb = require("./db/db")
const port = process.env.PORT || 5000
connectDb("myDB");
let prodSch = new mongoose.Schema({
    name: String,
    type: String,
    quantity: Number
})
const saveInDb = async () => {
    const product = new mongoose.model('products', prodSch);//mongoose.model('nameofcollection',name of schema to match)
    const data = new product({ name: "Kolson", type: "slanty", quantity: 30 });
    const result = await data.save();
    console.log(result)
}
// saveInDb()

const updateInDB = async()=>{
    const product = new mongoose.model('products', prodSch);
    let data2check = await product.updateOne(
        {name:"sunsilk"},
        {
        $set:{quantity:40}

        }
        )
        console.log(data2check)
}
// updateInDB()

const delInDb = async()=>{
    try{
        const product = new mongoose.model('products', prodSch);
    const data2del = await product.deleteOne({name:"menz"})
    }
    catch(err){
        console.log(err)
    }
}

// delInDb()


const findInDb = async()=>{
    try{
        const product = new mongoose.model('products', prodSch);
    const data2find = await product.find()//find({name:"headshoulders"}) >>> aese bhi dia jaa sakta hai
    console.log(data2find)
    }
    catch(err){
        console.log(err)
    }
}

findInDb()