import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Add email regex here
// const passwordRegex =
//   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const signup = async (req, res, next) => {
  const { name, lastname, email, password } = req.body;
  try {
    if (!name || !lastname || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter name, lastname, email, and password.",
      });
    }

    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter a valid email" });
    }

    // if (!passwordRegex.test(password)) {
    //   // if (password.length < 8) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Please enter a strong password",
    //   });
    // }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res
        .status(400)
        .json({ success: false, message: "Email is already taken" });
    }

    const bcryptSalt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, bcryptSalt);
    const userDoc = await User.create({
      name,
      lastname,
      email,
      password: hashedPassword,
    });
    res
      .status(201)
      .json({ success: true, message: "user created succesfully" });
  } catch (error) {
    // next(error);
    console.log(error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter email, and password.",
      });
    }

    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter a valid email" });
    }

    const validUser = await User.findOne({ email: email });
    if (!validUser) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Wrong password" });
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, { expiresIn: "1h"});
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ success: true, user: rest }); // Include success: true
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const googleSignupSignin = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedPassword, bcryptSalt);
      const newUser = await User.create({
        name:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        lastname:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

export const signout = async (req, res) => {
  try {
    res.clearCookie('access_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Ensure this is only true in production
      sameSite: 'strict',
    });
    return res.status(200).json({ success: true, message: 'User has been logged out' });
  } catch (error) {
    console.error('Server logout error:', error);
    return res.status(400).json({ success: false, message: 'User did not log out' });
  }
};



export const me = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password"); // Exclude the password field
    

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error." });
  }
};
