import asyncHandler from "express-async-handler";
import productModel from "../models/products.model.js";
import reviewModel from "../models/reviews.model.js";
import errorHandler from "../middleware/errorHandler.js";
import { v2 as cloudinary } from "cloudinary";

// create a product
export const createProduct = asyncHandler(async (req, res, next) => {
  const { title, description, category, trending, oldPrice, newPrice, color } =
    req.body;
  const result = await cloudinary.uploader.upload(req.file.path, {
    resource_type: "image",
  });
  const imageUrl = result.url;

  // creating the product
  const newProduct = await new productModel({
    title,
    description,
    category,
    trending: trending === "true" ? true : false,
    oldPrice: Number(oldPrice),
    newPrice: Number(newPrice),
    color,
    image: imageUrl,
  });
  const savedProduct = await newProduct.save();
  res.status(201).json({ message: "A new product added", savedProduct });
});
// get all products
export const getAllProducts = asyncHandler(async (req, res, next) => {
  const products = await productModel.find({}).sort({ createdAt: -1 });
  res.status(200).json({ success: true, products });
});
// get a single product
export const getSingleProduct = asyncHandler(async (req, res, next) => {
  const productId = req.params.id;
  const product = await productModel.findById(productId);
  if (!product) {
    return next(errorHandler("Product not found"), 404);
  }
  // const reviews = await reviewModel.find({productId}).populate("userId", "name email")
  // res.status(200).json({product, reviews});
  res.status(200).json({ product });
});
// update a single product
export const updateProduct = asyncHandler(async (req, res, next) => {
  const productId = req.params.id;
  // Find the existing product by ID
  const existingProduct = await productModel.findById(productId);
  if (!existingProduct) {
    return next(errorHandler("Product not found"), 404);
  }
  // Delete the old image from Cloudinary
  await cloudinary.uploader.destroy(existingProduct.image);
  // Upload the new image to Cloudinary
  const result = await cloudinary.uploader.upload(req.file.path, {
    resource_type: "image",
  });

  // Update the image URL and public ID in MongoDB
  const updatedImageUrl = result.url;
  const updatedProduct = await productModel.findByIdAndUpdate(
    productId,
    {
      $set: {
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        trending: req.body.trending,
        oldPrice: req.body.oldPrice,
        newPrice: req.body.newPrice,
        color: req.body.color,
        image: updatedImageUrl
      },
    },
    { new: true }
  );
  res
    .status(200)
    .json({ message: "Product updated successfully", updatedProduct });
});
// delete a product
export const deleteProduct = asyncHandler(async (req, res, next) => {
  const productId = req.params.id;
  const deletedProduct = await productModel.findByIdAndDelete(productId);
  if (!deletedProduct) {
    return next(errorHandler("Product not found"), 404);
  }
  // delete reviews related to the product
  await reviewModel.deleteMany({ productId });
  res
    .status(200)
    .json({ message: "Product deleted successfully", deletedProduct });
});
// get related products
export const getRelatedProducts = asyncHandler(async (req, res, next) => {
  const productId = req.params.id;
  if (!productId) {
    return next(errorHandler("Product ID is required", 400));
  }
  const product = await productModel.findById(productId);
  if (!product) {
    return next(errorHandler("Product not found", 404));
  }
  const titleRegex = new RegExp(
    product.name
      .split(" ")
      .filter((word) => word.length > 1)
      .join("|"),
    "i"
  );
  const relatedProducts = await productModel
    .find({
      _id: { $ne: productId }, // exclude the current product
      $or: [
        { name: { $regex: titleRegex } }, // match similar names
        { category: product.category }, // match similar categories
      ],
    })
    .limit(6);
  res.status(200).json(relatedProducts);
});
