// eslint-disable-next-line strict
'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({ // make the schema to user info
  username : {type : String , require : true},
  password : { type : String , require : true},
} ,{toObject : { virtuals : true} , toJSON : { virtuals : true}, // fack connection
});

//------ Before Save hash password --> pre function --------//
let complixity = 5;
//--------------- SignUp -------------//
userSchema.pre('save' ,  async function(record){
//   if(!userSchema.find(record)){
  this.password = await bcrypt.hash(this.password , complixity);
  // userSchema.username = record;
  // userSchema.save(record)
  return record;
});

userSchema.methods.authentication = async (username , password) =>{
  this.findOne({username: this.username});
  console.log('user name' , username);
  let isVoalid = await bcrypt.compare(password , this.password);
  console.log('password user' , password);
  return isVoalid ? username : Promise.reject();
};

userSchema.methods.generatendToken = () =>{
  let SECRET = 'seecreetAshar';
  let token = jwt.sign({username : this.username} , SECRET);
  return token;
};

userSchema.statics.generateOauth = (username) =>{
  if(!username) { return Promise.reject('Validation Error'); }
  console.log('my user in Outh' , username);
  this.findOne({username: this.username});
};
//--------------- SignUp -------------//
// let hashingPw = async function(record){
//   if(!userSchema.username){
//     record.username = await bcrypt.hash(record.password , complixity);
//     userSchema.username = record;
//     return record;
//   }else{
//     return Promise.reject();
//   }
// };



module.exports = mongoose.model('users' , userSchema);

