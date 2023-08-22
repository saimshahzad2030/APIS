const mongoose=require('mongoose');

async function connectDb(val){
    try{

        await mongoose.connect(process.env.MONGO_URI + val,{

            useNewUrlParser:true

            });
            console.log("Database connected succesfully")
    }catch(error){

console.log(error)
process.exit(1)

    }





}

module.exports=connectDb