import express from 'express';
import { addProduct, getProducts, removeProduct } from '../controllers/product.controller.js';
import multer from 'multer';

const productRouter = express.Router();
// Image storage Engine
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, callback) => {
    return callback(null, `${Date.now()}${file.originalname}`);
  }
})
const upload = multer({storage: storage})

productRouter.post('/add', upload.single("image"), addProduct);
productRouter.get('/get', getProducts);
productRouter.delete('/delete/:id', removeProduct);

export default productRouter;