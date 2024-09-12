import { useContext, useState } from "react";
import "./WriteAReview.css";
import { toast } from "react-toastify";
import axios from "axios";

import GetReviews from "./GetReviews";
import CommentReview from "./CommentReview";
import { AuthContext } from "../../../hooks/AuthContext";
import StarRating from "../../../components/Stars/StarRating";
import { Link } from "react-router-dom";

const Review = ({ tshirtId }) => {
  const [isWritingReview, setIsWritingReview] = useState(false);
  const [reviewData, setReviewData] = useState({
    review: "",
    reviewTitle: "",
    rating: 0,
  });
  const { currentUser } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReviewData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/review/add-review", {
        ...reviewData,
        userRef: currentUser._id,
        tshirtId,
      });
      if (data.success) {
        setReviewData({ review: "", reviewTitle: "", rating: 0 });
        toast.success("Review saved");
      }
    } catch ({ message }) {
      toast.error(message);
    }
  };

  const handleWriteReview = () => {
    if (!currentUser) {
      return toast.error("You must be logged in");
    } else {
      setIsWritingReview(true);
    }
  };

  const handleCancelReview = () => {
    setIsWritingReview(false);
  };

  // <GetReviews tshirtId={tshirtId} />
  //   <CommentReview
  //   handleChange={handleChange}
  //   handleSubmitReview={handleSubmitReview}
  //   reviewData={reviewData}
  //   setReviewData={setReviewData}
  //   handleCancelReview={handleCancelReview}
  //   remainingChars={remainingChars}
  // />

  return (
    <div className="review-area">
      <div className="ReviewsPage-getReviews">this is to get reviews</div>

      <div className="ReviewsPage-commentReview">
        <form onSubmit={handleSubmitReview}>
          <div className="ReviewsPage-StarRating">
            <StarRating
              rating={reviewData.rating}
              setRating={(rating) => setReviewData({ ...reviewData, rating })}
            />
          </div>

          <input
            type="text"
            placeholder="Give your review a title"
            id="reviewTitle"
            name="reviewTitle"
            onChange={handleChange}
            value={reviewData.reviewTitle}
          />
          <br />
          <textarea
            placeholder="Write your comments here"
            id="reviewComment"
            name="review"
            onChange={handleChange}
            value={reviewData.review}
            maxLength={150}
          ></textarea>
          <p className="privacy-message">
            How we use your data: We’ll only contact you about the review you
            left, and only if necessary. By submitting your review, you agree to
            Judge.me’s <Link to="https://judge.me/terms">terms</Link>,
            <Link to="https://judge.me/privacy"> privacy</Link>, and
            <Link to="https://judge.me/content-policy"> content</Link>
            policies.
          </p>
          <div className="ReviewsPage-buttons">
            <button type="submit">Submit Review</button>
            <button onClick={handleCancelReview}>Cancel review</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Review;
