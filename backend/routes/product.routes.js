import express from 'express';
import { getAllProducts, getProductsByCategory, createProduct, deleteProduct, searchProducts, getProductById } from '../controllers/product.controller.js';
import { protectRoute, adminRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/search', searchProducts);
router.get('/', protectRoute, adminRoute, getAllProducts);
router.get('/category/:category', getProductsByCategory);
router.post('/', protectRoute, adminRoute, createProduct);
router.get('/:id',getProductById);
router.delete('/:id', protectRoute, adminRoute, deleteProduct);


export default router