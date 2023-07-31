import UserModel , {IUser} from '../models/user';
import bcrypt from 'bcryptjs'
import jwt, { Secret } from 'jsonwebtoken';
import * as dotenv from 'dotenv'
dotenv.config()


const SECRET_KEY: Secret = process.env.SECRET_KEY as Secret

export async function login(user: IUser) {
  try {
    console.log(user)
    const foundUser = await UserModel.findOne({ email: user.email });
    
    if (!foundUser) {
      throw new Error('Email is not correct');
    }
    
    const isMatch = bcrypt.compareSync(user.password, foundUser.password);
    
    if (isMatch) {
        const token = jwt.sign({ id: foundUser.id?.toString(), email: foundUser.email },SECRET_KEY,{
          expiresIn: '2 days',
        });
    
        return { user: foundUser, token: token };
    } else {
      throw new Error('Password is not correct');
    }
      
  } catch (error) {
    throw error;
  }
}

export async function register(user:IUser){
  try{
    const foundUser = await UserModel.findOne({ email: user.email });
    if(foundUser){
      return new Error("Email already used")
    }
    else{
      const newUser = await UserModel.create(user)
      const token = jwt.sign({ id: newUser.id?.toString(), email: newUser.email },SECRET_KEY,{
        expiresIn: '2 days',
      });
  
      return { user: newUser, token: token };
  
    }
  }catch(error){
    throw error
  }
}