import { useState } from "react"
// import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useGetSingleProductQuery } from "../../redux/features/products/productsApi";
import { usePostReviewMutation } from "../../redux/features/reviews/reviewsApi";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

const PostReviewModal = ({isModalOpen, handleReviewModalClose}) => {
  // get id
  const {id} = useParams();

  // get the product
  const {refetch} = useGetSingleProductQuery(id, {skip: !id});

  // post the review
  const [postReview] = usePostReviewMutation()

  const [rating, setRating] = useState(0);

  const handleRating = (value) => {
    setRating(value);
  }

  const [comment, setComment] = useState('');

  // handle submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newComment = {
      comment: comment,
      rating: rating,
      productId: id
    }
    // console.log(newComment);
    try {
      await postReview(newComment).unwrap();
      setComment('')
      setRating(0);
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
    }
    handleReviewModalClose();
  }
  return (
    <div className={`fixed inset-0 bg-black/90 flex items-center justify-center z-40 px-2 ${isModalOpen ? 'block' : 'hidden'}`}>
      <div className="bg-white p-6 rounded-md shadow-lg w-96 z-50">
        <h2 className="text-lg font-medium mb-4">Post a review</h2>
        <div className="flex items-center mb-4">
          {
            [1, 2, 3, 4, 5].map(star => (
              <span key={star} className="cursor-pointer text-yellow-500 text-lg" onClick={() => handleRating(star)}>
                {
                  rating >= star ? (<i className="ri-star-fill"></i>) : (<i className="ri-star-line"></i>)
                }
              </span>
            ))
          }
        </div>
        <textarea value={comment} onChange={(e) => setComment(e.target.value)} rows='4' className="w-full border border-gray-300 p-2 rounded-md mb-4 focus:outline-none"></textarea>
        <div className="flex justify-end gap-2">
          <button onClick={handleReviewModalClose} className="px-4 py-2 bg-gray-300">Cancel</button>
          <button onClick={handleSubmit} type="submit" className="px-4 py-2 bg-primary text-white rounded-md">Submit</button>
        </div>
      </div>
    </div>
  )
}
export default PostReviewModal