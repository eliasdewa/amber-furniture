import productModel from "../models/product.model.js";
import fs from "fs";

// add the product
const addProduct = async (req, res) => {
  let imageFilename = `${req.file.filename}`;
  // create a product
  const product = new productModel({
    image: imageFilename,
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    subCategory: req.body.subCategory,
    sizes: req.body.sizes,
    price: req.body.price,
    bestSeller: req.body.bestSeller,
  })
  // save the product to the database and handle errors
  try {
    await product.save();
    res.status(201).json({success: true, message: "Product added successfully"});
  } catch (error) {
    console.log(error);
    res.status(400).json({success: false, message: "Failed to add product"});
  }
};

// Remove a product
const removeProduct = async (req, res) => {
  try {
    const product = await productModel.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({success: false, message: "Product not found"});
    }
    fs.unlinkSync(`uploads/${product.image}`);
    res.status(200).json({success: true, message: "Product removed successfully"});
  } catch (error) {
    console.log(error);
    res.status(500).json({success: false, message: "Failed to remove product"});
  }
};

// get all products
const getProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.status(200).json({success: true, data: products});
  } catch (error) {
    console.log(error);
    res.status(500).json({success: false, message: "Failed to get products"});
  }
};

export { addProduct, getProducts, removeProduct };