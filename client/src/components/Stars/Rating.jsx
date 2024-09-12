import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import './Rating.css'

const Rating = ({ rating }) => {
  // Check if rating is valid (between 0 and 5)
  if (!rating || rating < 0 || rating > 5) {
    // Return a placeholder or null if rating is invalid
    return null;
  }

  // Calculate full stars, half star, and empty stars
  const fullStars = Math.floor(rating);
  const halfStar = Math.ceil(rating - fullStars);
  const emptyStars = 5 - fullStars - halfStar;

  // Render the star rating UI
  return (
    <div className="StarRating-main">
      {[...Array(fullStars)].map((_, index) => (
        <StarIcon key={index} className="StarRating-main-icon"/>
      ))}
      {halfStar === 1 && <StarHalfIcon className="StarRating-main-icon" />}
      {[...Array(emptyStars)].map((_, index) => (
        <StarBorderIcon key={index} className="StarRating-main-border-icon"/>
      ))}
    </div>
  );
};

export default Rating;