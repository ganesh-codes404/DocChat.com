const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {type:String, unique:true},
  password: String,
  age:int,
  gender:String,
  city:String,
  phoneNumber:int,
  emergencyNumber:int,
  email:string,
}, {timestamps: true});

const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;