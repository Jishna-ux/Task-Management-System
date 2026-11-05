import mongoose from 'mongoose';
const userSchema=new mongoose.Schema({name:{type:String,required:true,trim:true,maxLength:80},email:{type:String,required:true,unique:true,lowercase:true,trim:true},passwordHash:{type:String,required:true,select:false},role:{type:String,enum:['admin','user'],default:'user'},department:{type:String,default:''},avatar:{type:String,default:''},active:{type:Boolean,default:true}},{timestamps:true});
export default mongoose.model('User',userSchema);
