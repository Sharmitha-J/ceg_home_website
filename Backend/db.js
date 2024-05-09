const mongoose = require('mongoose')
const mongouri ="mongodb+srv://sharmithaj23:sharmithaj23@hostelproject.xalbqpy.mongodb.net/?retryWrites=true&w=majority&appName=HostelProject"
const connectToMongo =async ()=>{
    mongoose.connect(mongouri,()=>{
     
         console.log('connected to mongose succesfullly')
    })
}
module.exports= connectToMongo;