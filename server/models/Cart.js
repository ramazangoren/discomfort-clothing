import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    imageUrls: {
      type: Array,
      required: true,
    },
    tshirtName: {
      type: String,
      required: true,
    },
    oldPrice: {
      type: String,
      required: true,
    },
    newPrice: {
      type: String,
      // required: true,
    },
    // saleSold: {
    //   type: String,
    //   default: 'sale',
    // },
    // sizes: {
    //   type: [String],
    //   default: ["M", "L", "XL", "2XL"]
    // },
    // color: {
    //   type: String,
    //   default: 'Black',
    // },
    // inStock: {
    //   type: Boolean,
    //   default: true,
    // },
    // outOfStock: {
    //   type: Boolean,
    //   default: false,
    // },
    // details: {
    //   type: [String], // Array of strings for details provided by the user
    //   required: true, // Making it required if necessary
    // },
    
    userRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
