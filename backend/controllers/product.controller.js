import asyncHandler from 'express-async-handler';
import productModel from "../models/product.model.js";
import {v2 as cloudinary} from "cloudinary";
import errorHandler from "../middleware/errorHandler.js";

// add the product
const addProduct = asyncHandler(async (req, res, next) => {
  const { title, description, category, subCategory, sizes, price, bestSeller } = req.body;
  if (!title || !description || !category || !subCategory || !sizes || !price) {
    return next(errorHandler("All fields are required", 400));
  }
  const image1 = req.files.image1 && req.files.image1[0];
  const image2 = req.files.image2 && req.files.image2[0];
  const image3 = req.files.image3 && req.files.image3[0];
  const image4 = req.files.image4 && req.files.image4[0];
  // console.log(title, description, category, subCategory, sizes, price, bestSeller)
  // console.log(image1, image2, image3, image4)

  // We can't store images in database, first upload these images on cloudinary, then get the url and store the url on database
  const images = [image1, image2, image3, image4].filter((image) => image !== undefined); // filter out images that are not undefined
  // console.log(images)

  // Create the url for the image
  let imagesUrl = await Promise.all(
    images.map(async (image) => {
      let result = await cloudinary.uploader.upload(image.path, {resource_type: 'image'});
      return result.secure_url;
    })
  )
  // console.log(imageUrl)

  // Save all data on mongodb database
  // create a product data object
  const productData = {
    image: imagesUrl,
    title,
    description,
    category,
    subCategory,
    sizes: JSON.parse(sizes), // we can't send array data directly as form data
    price: Number(price),
    bestSeller: bestSeller === "true" ? true : false,
    date: Date.now()
  }
  const product = new productModel(productData);
  await product.save();
  res.status(201).json({success: true, message: "Product added successfully"});
});

// Remove a product
const removeProduct = asyncHandler(async (req, res, next) => {
  const product = await productModel.findByIdAndDelete(req.params.id);
  if (!product) {
    return next(errorHandler("Product not found"), 404);
  }
  res.status(200).json({success: true, message: "Product removed successfully"});
});

// get all products
const getAllProducts = asyncHandler(async (req, res, next) => {
  const products = await productModel.find({});
  res.status(200).json({success: true, products});
});

// get a single product
const getSingleProduct = asyncHandler(async (req, res, next) => {
  const product = await productModel.findById(req.params.productId);
  if (!product) {
    return next(errorHandler("Product not found"), 404);
  }
  res.status(200).json({success: true, product});
});

export { addProduct, getAllProducts, getSingleProduct, removeProduct };