import { Router } from 'express';
import * as userController from '../controllers/user';


const userRouter = Router()
userRouter.post ("/login", userController.loginOne)
userRouter.post ("/register", userController.registerOne)

export default userRouter