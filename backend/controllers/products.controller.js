import asyncHandler from "express-async-handler";
import productModel from "../models/products.model.js";
import errorHandler from "../middleware/errorHandler.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// create a product
export const createProduct = async (req, res, next) => {
  try {
    const {
      title,
      description,
      category,
      trending,
      oldPrice,
      newPrice,
      color,
    } = req.body;
    if (!req.file) {
      return next(errorHandler("Image file is required"), 400);
    }
    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "image",
    });
    const imageUrl = result.url;
    // Cleanup: Remove uploaded file from local storage
    fs.unlinkSync(req.file.path);
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
  } catch (error) {
    console.error(error);
    // Cleanup: Remove file if Cloudinary upload fails
    if (req.file) fs.unlinkSync(req.file.path);

    res
      .status(500)
      .json({ message: "Failed to create product", error: error.message });
  }
};
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
export const updateProduct = async (req, res, next) => {
  try {
    // Find the existing product by ID
    const { id } = req.params;
    const { title, description, category, trending, oldPrice, newPrice, color } = req.body;
    // Find the existing product
    const product = await productModel.findById(id);
    if (!product) {
      return next(errorHandler("Product not found"), 404);
    }
    // Update Cloudinary image if a new image is uploaded
    let imageUrl = product.image; // Keep the existing image URL by default
    if (req.file) {
      // Delete the old image from Cloudinary if it exists
      if (product.image) {
        const publicId = product.image.split('/').pop().split('.')[0]; // Extract publicId
        await cloudinary.uploader.destroy(publicId);
      }

      // Upload the new image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "image",
      });
      imageUrl = result.url;

      // Cleanup: Remove the uploaded file from local storage
      fs.unlinkSync(req.file.path);
    }

    // Update product fields
    product.title = title || product.title;
    product.description = description || product.description;
    product.category = category || product.category;
    product.trending = trending === "true" ? true : product.trending;
    product.oldPrice = oldPrice ? Number(oldPrice) : product.oldPrice;
    product.newPrice = newPrice ? Number(newPrice) : product.newPrice;
    product.color = color || product.color;
    product.image = imageUrl;

    // Save the updated product
    const updatedProduct = await product.save();
    res.status(200).json({ message: "Product updated successfully", updatedProduct });
  } catch (error) {
    console.error(error);

    // Cleanup: Remove uploaded file if an error occurs
    if (req.file) fs.unlinkSync(req.file.path);

    res.status(500).json({ message: "Failed to update product", error: error.message });
  }
};
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
