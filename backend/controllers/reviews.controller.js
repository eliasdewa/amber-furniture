import asyncHandler from 'express-async-handler';
import errorHandler from '../middleware/errorHandler.js';
import reviewModel from '../models/reviews.model.js';
import productModel from '../models/products.model.js';

// Post a review
export const postReview = asyncHandler(async (req, res, next) => {
  const { comment, rating, productId } = req.body;
  if (!comment ||!rating) {
    return next(errorHandler('Rating and comment are required!', 400));
  }
  const existingReview = await reviewModel.findOne({productId, userId});
  if (existingReview) {
    // Update the review
    existingReview.comment = comment;
    existingReview.rating = rating;
    await existingReview.save();
  } else {
    // Create a new review
    const newReview = new reviewModel({ comment, rating, productId, userId });
    await newReview.save();
  }
  // calculate the average rating
  const reviews = await reviewModel.find({ productId });
  if (reviews.length > 0) {
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    const averageRating = totalRating / reviews.length;
    const product = await productModel.findById(productId);
    if (product) {
      product.rating = averageRating;
      await product.save({validateBeforeSave: false});
    } else {
      return next(errorHandler("Couldn't find product", 404))
    }
  }
  console.log(reviews)
  res.status(201).json({ message: 'Review saved successfully', review: reviews });
});
// Get all the reviews
export const getTotalReview = asyncHandler(async (req, res, next) => {
  const totalReviews = await reviewModel.countDocuments({ });
  res.status(200).json({ totalReviews });
});

export const getUserReviews = asyncHandler(async (req, res, next) => {
  const {userId} = req.params;
  if (!userId) {
    return next(errorHandler('User ID is required!', 400));
  }
  const userReviews = await reviewModel.find({ userId }).sort({createdAt: -1});
  if (userReviews.length === 0) {
    return next(errorHandler("No reviews found", 404));
  }
  res.status(200).json({ userReviews });
});