import 'dotenv/config';
import app from './app.js';
import {connectDB} from './config/db.js';

for(const key of ['MONGODB_URI','JWT_SECRET'])
    if(!process.env[key])throw new Error(`${key} is required in server/.env`);
const port=process.env.PORT||5000;
connectDB().then(()=>app.listen(port,()=>console.log(`API listening on ${port}`))).catch(err=>{console.error('Unable to start server:',err.message);
    process.exit(1);});
