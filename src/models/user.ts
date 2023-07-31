import { randomUUID } from 'crypto';
import mongoose,{ Schema, model, connect, connection } from 'mongoose';
import bcrypt from "bcryptjs"

export interface IUser{
    id: string,
    name: string,
    email: string,
    password: string,
    avatar?: string
}

interface IUserMethods {
    comparePassword(): string;
  }

const userSchema = new Schema<IUser,IUserMethods>({
    id:{type:String, default:()=> randomUUID(), required:true},
    name: { type: String, required: true },
    email: { type: String, required: true, unique:true },
    password:{type: String, required: true},
    avatar: String
  });
  
// Hooks before save
userSchema.pre("save", function (next) {
    const user = this

    if (this.isModified("password") || this.isNew) {
        bcrypt.genSalt(10, function (saltError, salt) {
            if (saltError) {
                return next(saltError)
            } else {
                bcrypt.hash(user.password, salt, function(hashError, hash) {
                if (hashError) {
                    return next(hashError)
                }
                user.password = hash
                next()
                })
            }
        })
    } else {
        return next()
    }
})

userSchema.method("comparePassword", async function comparePassword(password: string){
    await bcrypt.compare(password, this.password, function(error, isMatch) {
        if (error) {
          throw error
        } else if (!isMatch) {
          return true
        } else {
          return false
        }
    })
})

const User = connection.model<IUser>('User', userSchema)

export default User