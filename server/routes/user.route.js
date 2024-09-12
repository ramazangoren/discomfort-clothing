import express from "express";
import {
  update, profile, user, 
  // getUser
} from "../controllers/user.controller.js";
import verifyToken from "../utils/verifyUser.js";

const router = express.Router();

router.get("/profile/:userName/:id", verifyToken, profile);
router.post("/update-profile/:userName/:id", verifyToken, update);
router.post("/users", user);

export default router;