import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import TShirtRoutes from "./routes/addTShirt.route.js";
import cartRouter from "./routes/cart.route.js";
import reviewRouter from "./routes/review.route.js";
import orderRouter from "./routes/Order.route.js";

import connectMongoDB from "./database/connectMongoDB.js";

dotenv.config();
const PORT = process.env.PORT || 4000;

const app = express();
app.use(express.json());

// const corsOptions = {
//   origin: "http://discomfort.astrainovations.com",
//   // origin: "http://localhost:5173",
//   credentials: true,
// };
// app.use(cors(corsOptions));

app.use(
  cors({
    origin: 'https://discomfort.astrainovations.com',
    // origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow appropriate methods
    credentials: true, // Allow credentials if needed
  })
);

app.use(cookieParser());

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "server error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/tshirt", TShirtRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cart", cartRouter);
app.use("/api/review", reviewRouter);
app.use("/api/order", orderRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectMongoDB();
});
