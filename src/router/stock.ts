import { Router } from 'express';
import * as stockController from '../controllers/stock';
import {auth} from '../middleware/auth'

const stockRouter = Router()

stockRouter.get("/list", stockController.list)
stockRouter.post("/delete",auth, stockController.deleteStock)
stockRouter.post("/upsert", auth,stockController.upsertStock)
stockRouter.get("/:id", stockController.getById)

export default stockRouter