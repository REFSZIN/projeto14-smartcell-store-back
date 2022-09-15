import express from 'express';
import { products, myCart, postInMyCart, deleteInMyCart, postInCheckout, checkouts } from '../controllers/authController.js';
const router = express.Router();

router.get('/products', products );
router.get('/mycart', myCart );
router.post('/mycart', postInMyCart );
router.delete('/mycart:ID', deleteInMyCart );
router.post('/checkout', postInCheckout );
router.get('/checkout', checkouts);

export default router;  