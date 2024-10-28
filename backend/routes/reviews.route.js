import express from 'express';
import { getTotalReview, getUserReviews, postReview } from '../controllers/reviews.controller.js';

const reviewRouter = express.Router();

// post a new review
reviewRouter.post('/post-review', postReview);
// get total review count
reviewRouter.get('/total-reviews', getTotalReview);
// get review by userId
reviewRouter.get('/:userId', getUserReviews);

export default reviewRouter;