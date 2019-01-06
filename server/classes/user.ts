// import { Mongoose } from "mongoose";
import mongoose from "mongoose";
// import mongoose = require('mongoose');
import crypto from "crypto";
import jwt from "jsonwebtoken";

interface IUser extends mongoose.Document {
    email:string;
    username:string;
    password:string;
    setPassword(password:string):void;
    validPassword(password:string):string;
    generateJwt():any;
}

const userSchema = new mongoose.Schema({
    email: {
      type: String,
      unique: true,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    hash: String,
    salt: String
  });

  userSchema.methods.setPassword = function(password:string){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  };
  
  userSchema.methods.validPassword = function(password:any) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
  };
  
  userSchema.methods.generateJwt = function() {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
  
    return jwt.sign({
      _id: this._id,
      email: this.email,
      username: this.username
    }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
  };
  
  export const model = mongoose.model<IUser>('Usuario', userSchema);
//   export const cleanCollection = () => model.remove({}).exec();
  // export default model;