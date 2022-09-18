import mongo from '../db/db.js';
import { STATUS_CODE } from '../enums/statusCode.js';
import { COLLECTIONS } from '../enums/collections.js';
import { schemaCheckout,schemaCart } from '../schemas/storeSchemas.js';
let db = await mongo();

const listProducts = async (req, res) =>{
  try {
      const products = await db.collection(COLLECTIONS.PRODUCTS).find().toArray();
      return res.send(products);
  } catch (error) {
      console.error(error);
      return res.sendStatus(STATUS_CODE.SERVERERRORINTERNAL);
  };
};

const sendToCart = async (req, res) =>{
  const {product, email } = req.body;
  const cart = {product,email}
  const valid = schemaCart.validate(cart, {abortEarly: false});

  if(valid.errorMessage){
    const erros = validation.error.details.map((err) => err.message);
    res.status(STATUS_CODE.ERRORUNPROCESSABLEENTITY).send(
      `Todos os campos são obrigatórios! : ${erros}`
      ); 
    return
  };

  try {
      await db.collection(COLLECTIONS.CARTS).insertOne({
          email,
          product
      });
      return res.sendStatus(200);
  } catch (error) {
      console.error(error);
      return res.sendStatus(STATUS_CODE.SERVERERRORINTERNAL);
  }
};

const listCart = async (req, res) =>{
  const { email } = req.body;
  try {
      const myCart = await db.collection(COLLECTIONS.CARTS).find({email}).toArray();
      return res.send(myCart);
  } catch (error) {
      console.error(error);
      return res.sendStatus(STATUS_CODE.SERVERERRORINTERNAL);
  };
};

const deleteInMyCart = async (req, res) =>{
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

const checkouts = async (req, res) =>{
  const { user } = res.locals;
  try {
      const checkout = await db.collection(COLLECTIONS.CHECKOUTS).find({email: user.email});
  if(!checkout){
      return res.sendStatus(STATUS_CODE.ERRORNOTFOUND);
  }
      return res.send(checkout);
  } catch(e) {
      res.status(STATUS_CODE.SERVERERRORINTERNAL).send({errorMessage: `Não foi possível fazer Checkout! Causa: ${e}`});
  }
};

const postCheckout = async (req, res) =>{
  const { user } = res.locals;
  const request = req.body;
  const valid = schemaCheckout.validate(request, {abortEarly: false});

  if(valid.errorMessage){
    const erros = validation.error.details.map((err) => err.message);
    res.status(STATUS_CODE.ERRORUNPROCESSABLEENTITY).send(
      `Todos os campos são obrigatórios! : ${erros}`
      ); 
    return
  };
  try {
      const finalcart = await db.collection(COLLECTIONS.CARTS).find({email: user.email});
  
  if(!finalcart){
      return res.sendStatus(STATUS_CODE.ERRORNOTFOUND);
  }
      await db.collection(COLLECTIONS.CHECKOUTS).insertOne(request);
      await db.collection(COLLECTIONS.CARTS).deleteMany({email: user.email});
      res.sendStatus(STATUS_CODE.SUCCESSOK);
  } catch(e) {
      res.status(STATUS_CODE.SERVERERRORINTERNAL).send({errorMessage: `Não foi possível fazer Checkout! Causa: ${e}`});
  }
};

export {listProducts,sendToCart,postCheckout,checkouts,deleteInMyCart,listCart};