import express from 'express';
import {
  addToCart,
  removeFromCart,
  getCart,
} from "../controllers/Cart.controller.js";
import verifyToken from "../utils/verifyUser.js";

const cartRouter = express.Router();

cartRouter.post('/add',  verifyToken, addToCart);
cartRouter.delete('/remove',  verifyToken, removeFromCart);
cartRouter.get('/get', verifyToken,  getCart);

export default cartRouter