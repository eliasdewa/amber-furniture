import express from 'express';
import { createProduct, deleteProduct, getAllProducts, getRelatedProducts, getSingleProduct, updateProduct } from '../controllers/products.controller.js';
import verifyToken from '../middleware/verifyToken.js';
import verifyAdmin from '../middleware/verifyAdmin.js';

const productRouter = express.Router();

// create a new product
productRouter.post('/create-product', createProduct);
// get all products
productRouter.get('/', getAllProducts);
// get a single product by ID
productRouter.get('/:id', getSingleProduct);
// get related product by ID
productRouter.get('/related/:id', getRelatedProducts);
// update a product by ID
productRouter.patch('/update-product/:id', verifyToken, verifyAdmin, updateProduct);
// delete a product by ID
productRouter.delete('/:id', deleteProduct);


export default productRouter;