import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  image: {type: Array, required: true},
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  sizes: {type: Array, required: true},
  price: { type: Number, required: true },
  bestSeller: { type: Boolean, default: false },
  date: { type: Number, required: true },
});

const productModel = mongoose.models.Product || mongoose.model('Product', productSchema);
export default productModel;