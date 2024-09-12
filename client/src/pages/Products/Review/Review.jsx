import { useContext } from "react";
import "./Review.css";

import GetReviews from "./GetReviews";
import CommentReview from "./CommentReview";
import { ReviewContext } from "../../../hooks/ReviewContext";

const Review = ({ tshirtId }) => {
  const {
    isWritingReview,
    handleWriteReview,
    handleCancelReview,
  } = useContext(ReviewContext);

  return (
    <div className="review-area">
      <div className="review-area-message"></div>
      {!isWritingReview ? (
        <>
          <button onClick={handleWriteReview}>Write a review</button>
          <hr className="divider-review" />
          <GetReviews tshirtId={tshirtId} />
        </>
      ) : (
        <div className="review-form">
          <button className="cancel-button" onClick={handleCancelReview}>
            Cancel review
          </button>
          <hr className="divider-review" />
          <CommentReview tshirtId={tshirtId} />
        </div>
      )}
    </div>
  );
};

export default Review;
