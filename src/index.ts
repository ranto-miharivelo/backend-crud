import express, { Application, Request, Response } from 'express'
import cors from "cors"
import * as dotenv from 'dotenv'
import stockRouter from './router/stock'
import userRouter from './router/user'
dotenv.config()

import mongoose, { Mongoose }  from "mongoose";

const db =  mongoose.connect(process.env.MONGODB_URI as string) 
mongoose.set('bufferCommands', false);

const app: Application = express()

const port: number = 5000

app.use(cors<Request>())

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.listen(port, function () {
    console.log(`App is listening on port ${port} !`)
})


app.use("/stocks", stockRouter)

app.use("/users", userRouter)
