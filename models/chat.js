// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
// const passportLocalMongoose = require("passport-local-mongoose");

// const connect = mongoose.connect("mongodb://localhost:27017/login-tut")


// connect.then(()=>{
//     console.log("database connected")
// })
// .catch(()=>{
//     console.log("database  not connected")

// })
// // create schema
// const loginSchema = new Schema({
//   // username:{
//   //   type:String ,
//   //   required:true
//   // },
//   email:{
//     type:String ,
//     required:true
//   },
//   // password:{
//   //   type:String ,
//   //   required:true ,
//   //   maxLenght:50
//   // }

// })
// User.plugin(passportLocalMongoose);
// const collection = mongoose.model("user",loginSchema);

// module.exports = collection;


const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb://localhost:27017/login-tut");

connect
  .then(() => {
    console.log("database connected");
  })
  .catch(() => {
    console.log("database  not connected");
  });

const loginSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    maxLenght: 50,
  },
});

const collection = mongoose.model("user", loginSchema);
module.exports = collection;
