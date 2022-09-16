import mongo from '../db/db.js';
import { STATUS_CODE } from '../enums/statusCode.js';
import { COLLECTIONS } from '../enums/collections.js';
let db = await mongo();

async function listProducts(req, res){
    try {
        const products = await db.collection(COLLECTIONS.PRODUCTS).find().toArray();
        return res.send(products);
    } catch (error) {
        console.error(error);
        return res.sendStatus(STATUS_CODE.SERVERERRORINTERNAL);
    };
};
async function sendToCart(req, res){
    const {product, user, price} = req.body;

    try {
        await db.collection(COLLECTIONS.CARTS).insertOne({
            price,
            user,
            product
        });
        return res.sendStatus(200);
    } catch (error) {
        console.error(error);
        return res.sendStatus(STATUS_CODE.SERVERERRORINTERNAL);
    }
}
async function listCart(req, res){
    const { user } = req.body;
    try {
        const myCart = await db.collection(COLLECTIONS.CARTS).find({user: user.email}).toArray();
        return res.send(myCart);
    } catch (error) {
        console.error(error);
        return res.sendStatus(STATUS_CODE.SERVERERRORINTERNAL);
    };
};
async function deleteInMyCart(req, res){
    const { ID } = req.params;
    try {
    const message = await db.collection(COLLECTIONS.CARTS).findOne({_id: ObjectId(`${ID}`)});
    
    if(!message){
    return res.sendStatus(STATUS_CODE.ERRORNOTFOUND);
    }
    await db.collection(COLLECTIONS.CARTS).deleteOne({_id: ObjectId(`${ID}`)});
    res.sendStatus(STATUS_CODE.SUCCESSOK);
    } catch(e) {
    res.status(STATUS_CODE.SERVERERRORINTERNAL).send({errorMessage: `Não foi possível deletar! Causa: ${e}`});
    }
};
async function checkouts(req, res){
    const { user } = res.locals;
    try {
    const checkout = await db.collection(COLLECTIONS.CHECKOUTS).find(user.email);
    if(!checkout){
    return res.sendStatus(STATUS_CODE.ERRORNOTFOUND);
    }
    return res.send(checkout);
    } catch(e) {
    res.status(STATUS_CODE.SERVERERRORINTERNAL).send({errorMessage: `Não foi possível fazer Checkout! Causa: ${e}`});
    }
};
async function postCheckout(req, res){
    const { user } = res.locals;

    try {
    const finalcart = await db.collection(COLLECTIONS.CARTS).find(user.email);
    
    if(!finalcart){
    return res.sendStatus(STATUS_CODE.ERRORNOTFOUND);
    }
    await db.collection(COLLECTIONS.CHECKOUTS).insertOne({user,finalcart});
    await db.collection(COLLECTIONS.CARTS).deleteMany(user.email);

    res.sendStatus(STATUS_CODE.SUCCESSOK);
    } catch(e) {
    res.status(STATUS_CODE.SERVERERRORINTERNAL).send({errorMessage: `Não foi possível fazer Checkout! Causa: ${e}`});
    }
};

export {listProducts, sendToCart,postCheckout,checkouts,deleteInMyCart,listCart};