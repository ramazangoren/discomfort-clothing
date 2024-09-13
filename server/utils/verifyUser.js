// import jwt from "jsonwebtoken";

// const verifyToken = (req, res, next) => {
//   const token = req.cookies.access_token;

//   if (!token) {
//     return res
//       .status(401)
//       .json({ success: false, message: "Access denied. No token provided." });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.userId = decoded.id;
//     // console.log(decoded);
    
//     next();
//   } catch (err) {
//     res.status(400).json({ success: false, message: "Invalid token." });
//   }
// };

// export default verifyToken;


const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  console.log('Cookies:', req.cookies); // Debug log to check if cookies are received

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    console.log('Decoded token:', decoded); // Debug log decoded token
    
    next();
  } catch (err) {
    console.error('JWT Error:', err); // Log error for debugging
    res.status(400).json({ success: false, message: "Invalid token." });
  }
};

