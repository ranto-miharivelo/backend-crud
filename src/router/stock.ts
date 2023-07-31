import { Router } from 'express';
import * as stockController from '../controllers/stock';
import {auth} from '../middleware/auth'

const stockRouter = Router()

stockRouter.get("/list", stockController.list)
stockRouter.post("/delete", stockController.deleteStock)
stockRouter.post("/upsert", stockController.upsertStock)

export default stockRouter