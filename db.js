const mongoose=require('mongoose')

const mongoUrl='mongodb://localhost:27017/hotel'

mongoose.connect(mongoUrl);

const db=mongoose.connection;

db.on('connected',()=>{
  console.log('DataBase Server Started');
})

db.on('error',(err)=>{
  console.log('Error',err);
})

module.exports=db;