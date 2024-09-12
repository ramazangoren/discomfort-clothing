import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthContext";

export const ReviewContext = createContext();

export const ReviewProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const [reviewData, setReviewData] = useState({
    review: "",
    reviewTitle: "",
    rating: 0,
  });
  const [isWritingReview, setIsWritingReview] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReviewData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmitReview = async (tshirtId) => {
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

  // getting the reviews
  const [users, setUsers] = useState({});
  //   const [reviews, setReviews] = useState([]);
  //   const [ratings, setRatings] = useState({});

  //   const calculateRatings = (reviews) => {
  //     const totalReviews = reviews.length;
  //     const starCounts = [0, 0, 0, 0, 0];
  //     let totalRating = 0;

  //     reviews.forEach((review) => {
  //       const rating = review.rating;
  //       totalRating += rating;
  //       starCounts[rating - 1] += 1;
  //     });

  //     const averageRating = totalReviews
  //       ? (totalRating / totalReviews).toFixed(2)
  //       : 0;

  //     return {
  //       averageRating: parseFloat(averageRating),
  //       totalReviews,
  //       starCounts,
  //     };
  //   };

  const [ratings, setRatings] = useState({});
  const [reviews, setReviews] = useState([]);

  const calculateRatings = (reviews) => {
    const totalReviews = reviews.length;
    const starCounts = [0, 0, 0, 0, 0];
    let totalRating = 0;

    reviews.forEach((review) => {
      const rating = review.rating;
      totalRating += rating;
      starCounts[rating - 1] += 1;
    });

    const averageRating = totalReviews
      ? (totalRating / totalReviews).toFixed(2)
      : 0;

    return {
      averageRating: parseFloat(averageRating),
      totalReviews,
      starCounts,
    };
  };

  const fetchUsers = async (userRefs) => {
    try {
      const res = await axios.post(`/api/users/users`, { userRefs });
      const userData = res.data.reduce(
        (acc, curr) => ({ ...acc, [curr._id]: curr }),
        {}
      );
      setUsers(userData);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load user data");
    }
  };

//   const fetchReviews = async (tshirtId) => {
//     try {
//       const res = await axios.get(`/api/review/reviews/${tshirtId}`);
//       setReviews(res.data);
//       const calculatedRatings = calculateRatings(res.data);
//       setRatings(calculatedRatings);
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to load reviews");
//     }
//   };

  useEffect(() => {
    const fetchUsersFromReviews = async () => {
      const userRefs = reviews.map((review) => review.userRef);
      if (userRefs.length > 0) {
        await fetchUsers(userRefs);
      }
    };
    fetchUsersFromReviews();
  }, [reviews]);

  const fetchReviews = async (tshirtId) => {
    try {
      const res = await axios.get(`/api/review/reviews/${tshirtId}`);
      setReviews(res.data);
      const calculatedRatings = calculateRatings(res.data);
      setRatings(calculatedRatings);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load reviews");
    }
  };
  const getAverageRating = (tshirtId) => {
    const calculatedRatings = ratings[tshirtId] || {};
    return calculatedRatings.averageRating || 0;
  };

  return (
    <ReviewContext.Provider
      value={{
        reviewData,
        setReviewData,
        isWritingReview,
        setIsWritingReview,
        handleChange,
        handleSubmitReview,
        handleWriteReview,
        handleCancelReview,

        reviews,
        users,
        ratings,
        fetchReviews,
        getAverageRating
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
};
