import mongoose from 'mongoose';
const schema=new mongoose.Schema({task:{type:mongoose.Schema.Types.ObjectId,ref:'Task',required:true,index:true},author:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},message:{type:String,required:true,trim:true,maxLength:2000}},{timestamps:true});
export default mongoose.model('Comment',schema);
