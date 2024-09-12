import express from "express";
import {
  signup,
  signin,
  googleSignupSignin,
  signout,
  me
} from "../controllers/auth.controller.js";
import verifyToken from "../utils/verifyUser.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google-auth", googleSignupSignin);
router.post("/signout", signout);
router.get("/me", verifyToken, me);

export default router;
