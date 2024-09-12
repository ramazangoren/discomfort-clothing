import express from "express";
import {
  AddProducts,
  getAllProducts,
  productDetails,
  deleteItem,
  getUpdateTshirt,
  updateTShirt
} from "../controllers/addTShirt.controller.js";
import verifyToken from "../utils/verifyUser.js";

const router = express.Router();

router.post("/add-tshirt",  verifyToken, AddProducts);
router.get("/all-tshirts", getAllProducts);
router.get("/product/:name/:tshirtId", productDetails);
router.delete("/list/:id",verifyToken, deleteItem);
router.get("/list/product/:id",verifyToken, getUpdateTshirt);
router.post("/list/product/:id",verifyToken, updateTShirt);

export default router;
