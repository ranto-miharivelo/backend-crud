import StockModel ,{IStock} from "../models/stock"
import * as dotenv from 'dotenv'
dotenv.config()



export async function upsertStock(stock: IStock) {
    try{
        const foundStock = await StockModel.findOne({name: stock.name})

        if(foundStock){
            console.log("Updating stock")
           const updatedStock = await StockModel.updateOne({name: stock.name}, stock)
           return updatedStock
        }
        else{
            console.log("newStock")
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
        console.log("Auth passed")
        const del = await StockModel.deleteOne({name: stock.name})
        if(del){
            return "Delete successfully"
        }
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
        const stock = await StockModel.findOne({id:id}).exec()
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