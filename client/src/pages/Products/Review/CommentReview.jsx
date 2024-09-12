import { useContext } from "react";
import StarRating from "../../../components/Stars/StarRating";
import { Link } from "react-router-dom";
import { ReviewContext } from "../../../hooks/ReviewContext";
import './CommentReview.css'

const CommentReview = ({ tshirtId }) => {
  const {
    reviewData,
    setReviewData,
    handleChange,
    handleSubmitReview,
    handleCancelReview
  } = useContext(ReviewContext);

  return (
    <>
      <h3>Write a review</h3>
      <form onSubmit={(e) => {
        e.preventDefault();
        handleSubmitReview(tshirtId);
      }}>
        <StarRating
          rating={reviewData.rating}
          setRating={(rating) => setReviewData({ ...reviewData, rating })}
        />

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
        <button className="submit-button" type="submit">
          Submit Review
        </button>
        <button className="cancel-button" onClick={handleCancelReview}>
          Cancel review
        </button>
      </form>
    </>
  );
};

export default CommentReview;
