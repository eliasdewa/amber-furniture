import asyncHandler from "express-async-handler";
import productModel from "../models/products.model.js";
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
  res.status(200).json({ products });
});
// get a single product
export const getSingleProduct = asyncHandler(async (req, res, next) => {
  const product = await productModel.findById(req.params.id);
  if (!product) {
    return next(errorHandler("Product not found"), 404);
  }
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
  const product = await productModel.findByIdAndUpdate(
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
    .json({ message: "Product updated successfully", product });
});
// delete a product
export const deleteProduct = asyncHandler(async (req, res, next) => {
  const productId = req.params.id;
  const deletedProduct = await productModel.findByIdAndDelete(productId);
  if (!deletedProduct) {
    return next(errorHandler("Product not found"), 404);
  }
  res
    .status(200)
    .json({ message: "Product deleted successfully", deletedProduct });
});
