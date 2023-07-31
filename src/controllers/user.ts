import { Request, Response } from 'express';
import { getErrorMessage } from '../utils/error';
import * as userServices from '../service/user';
import { CustomRequest } from '../middleware/auth';

export const loginOne = async (req: Request, res: Response) => {
    try {
      const foundUser = await userServices.login(req.body);
      //console.log('found user', foundUser.token);
      res.status(200).send(foundUser);
    } catch (error) {
      return res.status(500).send(getErrorMessage(error));
    }
}

export const registerOne =async (req: Request, res: Response) => {
  try {
    const newUser = await userServices.register(req.body);
    if(newUser instanceof Error){
      res.status(400).send(newUser)
    }
    else{
      res.status(200).send(newUser);
    }
    //console.log('found user', foundUser.token);
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
}
