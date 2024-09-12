import Rating from "../../../components/Stars/Rating";
import React, { useContext, useEffect} from "react";
import { ReviewContext } from "../../../hooks/ReviewContext";
import './GetReviews.css'

const GetReviews = ({ tshirtId }) => {
  const { reviews, users, fetchReviews } = useContext(ReviewContext);

  useEffect(() => {
    fetchReviews(tshirtId);
  }, [tshirtId]);



  return (
    <div className="reviews-container">
      {reviews && reviews.length > 0 ? (
        reviews.map((review, index) => (
          <div key={index} className="review">
            <Rating rating={review.rating} />
            <div className="review-user">
              <div className="review-user-img">
                {users[review.userRef] && (
                  <img src={users[review.userRef].avatar} alt="User Avatar" />
                )}
              </div>
              {users[review.userRef] && (
                <p>
                  {users[review.userRef].name} {users[review.userRef].lastname}
                </p>
              )}
              <p>
                {new Date(review.createdAt).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
            <div className="review-details">
              <p>{review.reviewTitle}</p>
              <p>{review.review}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No reviews yet. Be first one to write a review</p>
      )}
    </div>
  );
};

export default GetReviews;