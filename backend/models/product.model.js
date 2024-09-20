import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  image: {type: String, required: true},
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  sizes: [{ type: String }],
  price: { type: Number, required: true },
  bestSeller: { type: Boolean, default: false },
});

const productModel = mongoose.models.Product || mongoose.model('Product', productSchema);
export default productModel;