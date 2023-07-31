import { Request, Response } from 'express';
import { getErrorMessage } from '../utils/error';
import * as stocksServices from '../service/stock';

export const list = async (req: Request, res: Response) => {
    try {
        const stocks = await stocksServices.listStocks();
        res.status(200).send(stocks);
    } 
    catch (error) {
        return res.status(500).send(getErrorMessage(error));
    }
}

export const getById = async(req:Request, res: Response)=>{
    try {
        const stock = await stocksServices.getById(req.params.id)
        res.status(200).send(stock)
    }
    catch(error){
        return res.status(500).send(getErrorMessage(error));
    }
}

export const upsertStock = async (req: Request, res: Response)=>{
    try {
        console.log(req.body)
        const stock = await stocksServices.upsertStock(req.body);
        res.status(200).send(stock);
    } 
    catch (error) {
        return res.status(500).send(getErrorMessage(error));
    }
}

export const deleteStock = async (req:Request, res: Response)=>{
    try{
        const deletedStock = await stocksServices.deleteStock(req.body)
    }
    catch(error){
        return res.status(500).send(getErrorMessage(error));
    }
}
