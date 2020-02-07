// eslint-disable-next-line strict
'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({ // make the schema to user info
  username : {type : String , require : true},
  password : { type : String , require : true},
} ,{toObject : { virtuals : true} , toJSON : { virtuals : true}, // fack connection
});

//------ Before Save hash password --> pre function --------//
// userSchema.pre('save' ,  async function(record){
//   if(!userSchema.username){
//     record.username = await bcrypt.hash(record.password , complixity);
//     userSchema.username = record;
//     return record;
//   }else{
//     return Promise.reject();
//   }
// });

// let complixity = 5;
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

