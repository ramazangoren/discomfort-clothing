import Order from "../models/Orders.js";
import User from "../models/user.js";

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15"
});

const placeOrder = async (req, res) => {
  const { userId, items, amount, address } = req.body;
  const frontend_url = process.env.FRONTEND_URL || "http://localhost:5173";

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "User ID is required.",
    });
  }

  try {
    // Create and save the new order
    const newOrder = new Order({
      userId,
      items,
      amount,
      address,
    });
    await newOrder.save();

    // console.log(newOrder);
    

    // Clear the user's cart
    await User.findByIdAndUpdate(userId, { cartData: {} });

    // console.log("Order items: ", items);

    // Prepare line items for Stripe
    const line_items = items.map((item) => ({
      price_data: {
        currency: "USD",
        product_data: {
          name: item.tshirtName,
          description: `Color: ${item.color}, Sizes: ${item.sizes.join(', ')}`

        },
        unit_amount: Math.round((item.newPrice ? item.newPrice : item.oldPrice) * 100), // Stripe expects amount in cents
      },
      quantity: item.quantity,
    }));

    // Add delivery charges
    line_items.push({
      price_data: {
        currency: "USD",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 200, // Delivery fee in cents
      },
      quantity: 1,
    });

    // console.log("Line items for Stripe: ", newOrder);

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    // console.log("Stripe session created: ", session);

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error("Error processing payment:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while processing the payment.",
    });
  }
};


const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;

  try {
    if (success == "true") {
      await Order.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "paid" });
    } else {
      await Order.findByIdAndDelete(orderId);
      res.json({ success: false, message: "not paid" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error occured in payment" });
  }
};


// user order for front end
const userOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "error occured while getting order data",
    });
  }
};



const listOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "error occured while getting order data for admin",
    });
  }
};

// api for updating status

const updateStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.body.orderId, // Use orderId instead of userId
      { status: req.body.status },
      { new: true } // Return the updated document
    );

    if (!order) {
      return res.json({ success: false, message: "Order not found" });
    }

    res.json({ success: true, message: "Status updated", order });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Status did not update" });
  }
};

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };
