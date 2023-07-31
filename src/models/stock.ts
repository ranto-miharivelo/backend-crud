import { UUID, randomUUID } from 'crypto';
import mongoose,{ Schema, model,connection } from 'mongoose';


export interface IStock{
    id: String,
    name: String,
    quantity: Number,
    photo: String
}

const stockSchema = new Schema<IStock>({
    id:{type:String, default:()=> randomUUID(), required:true},
    name: { type: String, required: true },
    quantity: { type: String, required: true },
    photo: {type: String, required: false}
  });
  

  const Stock = connection.model<IStock>('Stock', stockSchema);

  export default Stock