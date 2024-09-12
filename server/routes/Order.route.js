import express from "express";
import {
  placeOrder,
  verifyOrder,
  userOrders,
  listOrders,
  updateStatus
} from "../controllers/Order.controller.js";
import verifyToken from "../utils/verifyUser.js";

const orderRouter = express.Router();

orderRouter.post("/place", verifyToken, placeOrder);
orderRouter.post("/verify", verifyOrder);
orderRouter.post("/userorders", verifyToken, userOrders);
orderRouter.get("/list", listOrders);
orderRouter.post("/status", updateStatus);

export default orderRouter;
