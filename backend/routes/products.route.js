import express from 'express';
import { createProduct, deleteProduct, getAllProducts, getSingleProduct, updateProduct } from '../controllers/products.controller.js';
import upload from '../config/multerConfig.js';

const productRouter = express.Router();

// create a new product
productRouter.post('/create-product', upload.single("image"), createProduct);
// get all products
productRouter.get('/', getAllProducts);
// get a single product by ID
productRouter.get('/:id', getSingleProduct);
// update a product by ID
productRouter.put('/:id', upload.single("image"), updateProduct);
// delete a product by ID
productRouter.delete('/:id', deleteProduct);


export default productRouter;