import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import * as dotenv from 'dotenv'
dotenv.config()

export const SECRET_KEY: Secret = process.env.SECRET_KEY as Secret;

export interface CustomRequest extends Request {
 token: string | JwtPayload;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
 try {
   const token = req.header('Authorization')?.replace('Bearer ', '');

   if (!token) {
     throw new Error('Acces denied');
   }

   const decoded = jwt.verify(token, SECRET_KEY);
   (req as CustomRequest).token = decoded;

   next();
 } catch (err) {
    res.status(401).send('Please authenticate');
 }
};