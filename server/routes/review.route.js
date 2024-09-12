import express from "express";
import {
    addReview,
    getAllReviews
} from "../controllers/review.controller.js";
import verifyToken from "../utils/verifyUser.js";

const reviewRouter = express.Router();

reviewRouter.post("/add-review",verifyToken, addReview);
// reviewRouter.get("/reviews", getAllReviews);
reviewRouter.get("/reviews/:id", getAllReviews);


export default reviewRouter;