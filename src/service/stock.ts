import StockModel ,{IStock} from "../models/stock"
import * as dotenv from 'dotenv'
dotenv.config()



export async function upsertStock(stock: IStock) {
    try{
        const foundStock = await StockModel.findOneAndUpdate({name: stock.name})

        if(foundStock){
           const updatedStock = await StockModel.updateOne({name: stock.name}, stock)
           return updatedStock
        }
        else{
            const newStock = await StockModel.create(stock)
            return newStock

        }
    }
    catch(error){
        throw error
    }
}

export async function deleteStock(stock: IStock){
    try{
        const deleteState = await StockModel.findOneAndDelete({name: stock.name})
    }
    catch(error){
        throw error
    }
  
}

export async function listStocks(){
    try{
        const stocks = await StockModel.find()
        if(stocks.length>0){
            return stocks
        }
        else{
            return "Stocks list is empty"
        }
    }
    catch(error){
        throw error
    }
      
}

export async function getById(id:string) {
    try{
        const stock = await StockModel.findOne({id:id})
        if(stock !=null){
            return stock
        }

        else{
            return "Stock not found"
        }   
    }
    catch(error){
        throw error
    }
}