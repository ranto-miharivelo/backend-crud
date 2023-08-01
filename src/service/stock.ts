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
            throw new Error('Stock list is empty');
        }
    }
    catch(error){
        throw error
    }
      
}


export async function listAndPagingStocks({page, limit}:any){
    try {
        
        const products = await StockModel.find()
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 })
        const count = await StockModel.countDocuments();

        return ({
            products,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
        });
    } catch (err) {
        throw err;
    }
}

export async function getById(id:string) {
    try{
        const stock = await StockModel.findOne({id:id}).exec()
        if(stock !=null){
            return stock
        }

        else{
            throw new Error('Stock not found')
        }   
    }
    catch(error){
        throw error
    }
}