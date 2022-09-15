import express from 'express';
//import { myCart, postInMyCart, deleteInMyCart, postInCheckout, checkouts } from '../controllers/authController.js';
import {listProducts} from "../controllers/storeControllers.js"
const router = express.Router();

router.get('/products', listProducts );
/*router.get('/mycart', myCart );
router.post('/mycart', postInMyCart );
router.delete('/mycart:ID', deleteInMyCart );
router.post('/checkout', postInCheckout );
router.get('/checkout', checkouts);*/

export default router;