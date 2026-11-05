import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import dotenv from "dotenv";

dotenv.config();

if(
    !process.env.MONGODB_URI||
    !process.env.ADMIN_PASSWORD||
    !process.env.ADMIN_EMAIL
)throw new Error('Set MONGODB_URI, ADMIN_EMAIL, and ADMIN_PASSWORD in server/.env before seeding');

if(process.env.ADMIN_PASSWORD.length<12)throw new Error('ADMIN_PASSWORD must be at least 12 characters for seeding');
await mongoose.connect(process.env.MONGODB_URI);
const email=process.env.ADMIN_EMAIL.toLowerCase();
let admin=await User.findOne({email});
if(admin){
    console.log(`Admin already exists: ${email}`);
}
else{
    admin=await User.create({name:process.env.ADMIN_NAME||'Administrator',email,passwordHash:await bcrypt.hash(process.env.ADMIN_PASSWORD,12),role:'admin'});
    console.log(`Created administrator: ${admin.email}`);
}await mongoose.disconnect();
