import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    tshirtId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    review: {
      type: String,
    },
    reviewTitle: {
      type: String,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    userRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;
