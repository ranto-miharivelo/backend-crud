import mongoose, { Mongoose }  from "mongoose";
import 'dotenv/config'

const db =  mongoose.connect(process.env.MONGODB_URI as string) 
mongoose.set('bufferCommands', false);
export default db

 
