import mongoose from 'mongoose';
import User from '../models/user.js';
import TShirt from '../models/TShirt.js';

const addToCart = async (req, res) => {
  try {
    // Fetch user data
    let userData = await User.findById(req.body.userId);

    if (!userData) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    // Initialize cartData if not present
    let cartData = userData.cartData || {};

    // console.log('Cart data before adding:', cartData);

    // Update the cart data
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }

    // console.log('Cart data after adding:', cartData);

    // Update user document with the new cartData
    await User.findByIdAndUpdate(req.body.userId, { cartData });

    res.json({
      success: true,
      message: "Added to cart",
    });
  } catch (error) {
    console.error("Error in adding to cart:", error);
    res.json({
      success: false,
      message: "Failed to add to cart",
    });
  }
};



const getCart = async (req, res) => {
  try {
    const { userId } = req.query; // Using query parameters for GET requests
    let userData = await User.findById(userId);

    let cartData = userData.cartData;

    // Fetching details for each item in the cart
    let cartItems = await Promise.all(
      Object.keys(cartData).map(async (itemId) => {
        let item = await TShirt.findById(itemId);
        return {
          ...item._doc, // Spread the TShirt document's fields
          quantity: cartData[itemId], // Add the quantity from the cart
        };
      })
    );

    res.json({
      success: true,
      cartItems, // Send the list of items with their quantities
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Did not get cart items",
    });
  }
};


const removeFromCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;
    let userData = await User.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    let cartData = userData.cartData;
    if (cartData[itemId]) {
      if (cartData[itemId] > 1) {
        cartData[itemId] -= 1;
      } else {
        delete cartData[itemId];
      }
      await User.findByIdAndUpdate(userId, { cartData });
      return res.json({
        success: true,
        message: "Item removed from cart",
        cartData,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Item not found in cart",
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to remove item from cart",
    });
  }
};

export { addToCart, removeFromCart, getCart };
