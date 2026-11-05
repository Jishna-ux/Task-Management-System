import mongoose from 'mongoose';
const schema=new mongoose.Schema({task:{type:mongoose.Schema.Types.ObjectId,ref:'Task',index:true},actor:{type:mongoose.Schema.Types.ObjectId,ref:'User'},action:String,details:String},{timestamps:true});
export default mongoose.model('Activity',schema);
