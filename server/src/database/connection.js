const mongoose = require('mongoose');
const connection= async ()=>{
  try{
    //connection to database and creating the database with name Branch
    const res= await mongoose.connect('mongodb://127.0.0.1:27017/Palm-Mind');
    // console.log(res)
    if(res){
      console.log('connected to mongodb database')
    }
  }catch(err){
    console.log(err)
  }
}

module.exports=connection