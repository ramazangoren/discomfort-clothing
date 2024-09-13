import jwt from "jsonwebtoken";

// const verifyToken = (req, res, next) => {
//   const token = req.cookies.access_token;
//   console.log("toke", token); // Debug log to check if cookies are received
//   console.log("Cookies:", req.cookies.access_token); // Debug log to check if cookies are received
//   console.log("req.Cookies:", req.cookies);
//   if (!token) {
//     return res
//       .status(401)
//       .json({ success: false, message: "Access denied. No token provided." });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.userId = decoded.id;
//     console.log("Decoded token:", decoded); // Debug log decoded token
//     next();
//   } catch (err) {
//     res.status(400).json({ success: false, message: "Invalid token." });
//   }
// };

// export default verifyToken;


const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  console.log("token:::", token);
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Access denied. No token provided." });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    req.userId = user.id;
    console.log("user::::", user); // Debug log decoded token
    next();
  } catch (err) {
    res.status(400).json({ success: false, message: "Invalid token." });
  }
};

export default verifyToken;
