import mongo from '../db/db.js';
import { STATUS_CODE } from '../enums/statusCode.js';
//import { TRANSACTIONS_TYPE } from '../enums/statusCode.js';

let db = await mongo();

async function listProducts(req, res){
    try {
        const products = await db.collection('products').find().toArray();
        return res.send(products);
    } catch (error) {
        console.error(error);
        return res.sendStatus(STATUS_CODE.SERVERERRORINTERNAL);
    };
};

async function myCart(req, res){
    


    try {
        
    } catch (error) {
        
    }
}


export {listProducts};