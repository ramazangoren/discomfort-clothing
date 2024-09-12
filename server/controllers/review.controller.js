import Review from "../models/Reviews.js";

export const addReview = async (req, res) => {
  const { tshirtId, review, userRef, reviewTitle, rating } = req.body;

  try {
    const newReview = new Review({
      tshirtId,
      review,
      reviewTitle,
      userRef,
      rating,
    });

    const savedReview = await newReview.save();
    res.status(201).json({ success: true, savedReview });
  } catch (err) {
    console.error("Error adding review:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};


export const getAllReviews = async (req, res, next) => {
  const { id } = req.params;
  
  if (!id) {
    return res.status(400).json({ error: "Missing restaurantId parameter" });
  }
  try {
    const reviews = await Review.find({ tshirtId: id }).sort({
      createdAt: -1,
    });
    res.status(200).json(reviews);
    // console.log(reviews);
    
    // const reviews = await Review.find({ restaurantId: id })
    // .sort({ updatedAt: -1 });
  } catch (error) {
    next(error);
  }
};
