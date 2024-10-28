import { useState } from "react";
import avatar from "../../assets/avatar.png"
import RatingStars from "../../components/RatingStars";
import { formatDate } from "../../utils/formatDate";
import PostReviewModal from "./PostReviewModal";
const ReviewCard = ({ productReviews }) => {
  const reviews = productReviews || [];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleReviewModalOpen = () => {
    setIsModalOpen(true);
  };
  const handleReviewModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="my-6 bg-white">
      <div>
        {reviews.length > 0 ? (
          <>
            <h3 className="text-lg font-medium">All comments...</h3>
            <div>
              {reviews.map((review, index) => (
                <div key={index} className="mt-4">
                  <div className="flex items-center gap-4">
                    <img src={avatar} alt="" className="size-14" />
                    <div className="space-y-1">
                      <p className="text-lg font-medium text-blue-400 underline underline-offset-4 capitalize">{review?.userId.name}</p>
                      <p className="text-sm italic">{formatDate(review?.updatedAt)}</p>
                      <RatingStars rating={review?.rating} />
                    </div>
                  </div>
                  <div className="text-gray-600 mt-5 border p-6">
                    <p className="md:w-4/5">{review?.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p>No reviews yet!</p>
        )}
      </div>

      {/* Add review button */}
      <div className="mt-8">
        <button onClick={handleReviewModalOpen} className="px-6 py-3 bg-primary text-white rounded-md">Add A Review</button>
      </div>
      {/* Review modal */}
      <PostReviewModal isModalOpen={isModalOpen} handleReviewModalClose={handleReviewModalClose} />
    </div>
  );
};
export default ReviewCard;
