import mongoose from 'mongoose';
const subtaskSchema=new mongoose.Schema({
    title:{type:String,required:true,
        trim:true,maxLength:180},
    description:{type:String,default:''},
    status:{type:String,enum:['To Do','In Progress','Completed'],
        default:'To Do'},
    createdAt:{type:Date,default:Date.now}
},{timestamps:true});
const attachmentSchema=new mongoose.Schema({originalName:String,filename:String,mimetype:String,size:Number,uploadedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'},createdAt:{type:Date,default:Date.now}});
const taskSchema=new mongoose.Schema({title:{type:String,required:true,trim:true,maxLength:180},description:{type:String,default:''},createdBy:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},assignedUsers:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}],status:{type:String,enum:['To Do','In Progress','Completed'],default:'To Do'},priority:{type:String,enum:['High','Medium','Normal','Low'],default:'Normal'},dueDate:{type:Date,default:null},subtasks:[subtaskSchema],attachments:[attachmentSchema],trashed:{type:Boolean,default:false}},{timestamps:true});
taskSchema.index({title:'text',description:'text'}); taskSchema.index({assignedUsers:1,status:1,dueDate:1});
export default mongoose.model('Task',taskSchema);
