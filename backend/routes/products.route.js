import express from 'express';
import { createProduct, deleteProduct, getAllProducts, getRelatedProducts, getSingleProduct, updateProduct } from '../controllers/products.controller.js';
import upload from '../config/multerConfig.js';


const productRouter = express.Router();

// create a new product
productRouter.post('/create-product', upload.single("image"), createProduct);
// get all products
productRouter.get('/', getAllProducts);
// get a single product by ID
productRouter.get('/:id', getSingleProduct);
// get related product by ID
productRouter.get('/related/:id', getRelatedProducts);
// update a product by ID
productRouter.put('/edit/:id', updateProduct);
// delete a product by ID
productRouter.delete('/:id', deleteProduct);


export default productRouter;