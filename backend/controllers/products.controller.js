import asyncHandler from "express-async-handler";
import productModel from "../models/products.model.js";
import reviewModel from "../models/reviews.model.js";
import errorHandler from "../middleware/errorHandler.js";

// create a product
const createProduct = asyncHandler(async (req, res, next) => {
  const newProduct = await productModel({
    ...req.body
  })
  const savedProduct = await newProduct.save();
  // calculate review status
  const reviews = await reviewModel.find({
    productId: savedProduct._id
  })
  if (reviews.length > 0) {
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    const averageRating = totalRating / reviews.length;
    savedProduct.rating = averageRating;
    await savedProduct.save();
  }
  res.status(201).json({ message: "A new product added", savedProduct});
});

// get all products
const getAllProducts = asyncHandler(async (req, res, next) => {
  const products = await productModel.find({}).sort({createdAt: -1});
  res.status(200).json({success: true, products});
});

// get a single product
const getSingleProduct = asyncHandler(async (req, res, next) => {
  const productId = req.params.id;
  const product = await productModel.findById(productId).populate("author", "name email");
  if (!product) {
    return next(errorHandler("Product not found"), 404);
  }
  // const reviews = await reviewModel.find({productId}).populate("userId", "name email")
  // res.status(200).json({product, reviews});
  res.status(200).json({product});
});

// update a single product
const updateProduct = asyncHandler(async (req, res, next) => {
  const productId = req.params.id;
  const updatedProduct = await productModel.findByIdAndUpdate(productId, {...req.body}, {new: true});
  if (!updatedProduct) {
    return next(errorHandler("Product not found"), 404);
  }
  res.status(200).json({message: "Product updated successfully", updatedProduct});
});

// delete a product
const deleteProduct = asyncHandler(async (req, res, next) => {
  const productId = req.params.id;
  const deletedProduct = await productModel.findByIdAndDelete(productId);
  if (!deletedProduct) {
    return next(errorHandler("Product not found"), 404);
  }
  // delete reviews related to the product
  await reviewModel.deleteMany({ productId });
  res.status(200).json({ message: "Product deleted successfully", deletedProduct});
});

// get related products
const getRelatedProducts = asyncHandler(async (req, res, next) => {
  const productId = req.params.id;
  if (!productId) {
    return next(errorHandler("Product ID is required", 400));
  }
  const product = await productModel.findById(productId);
  if (!product) {
    return next(errorHandler("Product not found", 404));
  }
  const titleRegex = new RegExp(
    product.name.split(" ").filter(word => word.length > 1).join("|"), "i"
  );
  const relatedProducts = await productModel.find({
    _id: { $ne: productId }, // exclude the current product
    $or: [
      {name: {$regex: titleRegex}}, // match similar names
      {category: product.category} // match similar categories
    ]
  }).limit(6);
  res.status(200).json(relatedProducts);
});

export { createProduct, getAllProducts, getSingleProduct, updateProduct, deleteProduct, getRelatedProducts };