import jwt from 'jsonwebtoken';
import User from '../models/User.js';
export async function auth(req,res,next){try{const h=req.headers.authorization;const token=h?.startsWith('Bearer ')?h.slice(7):null;if(!token)return res.status(401).json({message:'Authentication required'});const decoded=jwt.verify(token,process.env.JWT_SECRET);const user=await User.findById(decoded.id);if(!user||!user.active)return res.status(401).json({message:'Account is unavailable'});req.user=user;next();}catch{return res.status(401).json({message:'Session expired. Please sign in again.'});}}
export const admin=(req,res,next)=>req.user?.role==='admin'?next():res.status(403).json({message:'Administrator access required'});
export const asyncHandler=fn=>(req,res,next)=>Promise.resolve(fn(req,res,next)).catch(next);
