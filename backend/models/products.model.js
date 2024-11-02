import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {type: String},
  category: {
    type: String,
    required: true,
  },
  trending: {
    type: Boolean,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  oldPrice: {
    type: Number,
  },
  newPrice: {
    type: Number,
    required: true,
  },
  color: {type: String},
  createdAt: {
    type: Date,
    default: Date.now,
  },
},
{
  timestamps: true,
});

const productModel = mongoose.models.Product || mongoose.model('Product', productSchema);
export default productModel;