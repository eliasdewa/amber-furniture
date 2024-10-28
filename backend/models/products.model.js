import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {type: String, required: true},
  category: {type: String},
  description: {type: String},
  price: {type: Number, required: true},
  oldPrice: {type: Number},
  images: { type: String },
  color: {type: String},
  rating: {type: Number, default: 0},
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
}, {
  timestamps: true
});

const productModel = mongoose.models.Product || mongoose.model('Product', productSchema);
export default productModel;