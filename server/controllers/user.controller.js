import User from "../models/user.js";
import bcrypt from "bcryptjs";


export const profile = async (req, res) => {
  const { userName, id } = req.params;

  try {
    const user = await User.findById(id);
    // if (!user || user.userName !== userName) { // Check both id and userName
    //   return res.status(404).json({ error: "User not found" });
    // }
    res.json(user);
    // console.log(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// export const update = async (req, res, next) => {
//   console.log(req.user);
//   // console.log(req.params);
//   try {
//     // Ensure the user can only update their own account
//     if (req.user.id !== req.params.id) {
//       return res
//         .status(401)
//         .json({ error: "You can only update your own account!" });
//     }

//     const updateData = {
//       name: req.body.name,
//       lastname: req.body.lastname,
//       email: req.body.email,
//       avatar: req.body.avatar,
//       phone: req.body.phone,
//       bDate: req.body.bDate,
//       address: req.body.address,
//     };
//     if (req.body.password && req.user.password) {
//       const isMatch = await bcrypt.compare(
//         req.body.password,
//         req.user.password
//       );
//       if (!isMatch) {
//         updateData.password = await bcrypt.hash(req.body.password, 10);
//       }
//     } else if (req.body.password) {
//       updateData.password = await bcrypt.hash(req.body.password, 10);
//     }
//     const updatedUser = await User.findByIdAndUpdate(
//       req.params.id,
//       { $set: updateData },
//       { new: true }
//     );
//     const { password, ...rest } = updatedUser._doc;
//     return res
//       .status(200)
//       .json({ success: true, message: "User info updated", ...rest });
//   } catch (error) {
//     console.log("Error:", error.message);
//     return res.status(400).json({ success: false, message: error.message });
//   }
// };

export const update = async (req, res, next) => {
  try {
    // Ensure the user can only update their own account
    if (req.userId !== req.params.id) {
      return res
        .status(401)
        .json({ error: "You can only update your own account!" });
    }

    // Fetch the user from the database to get the current password
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const updateData = {
      name: req.body.name,
      lastname: req.body.lastname,
      email: req.body.email,
      avatar: req.body.avatar,
      phone: req.body.phone,
      bDate: req.body.bDate,
      address: req.body.address,
    };

    // Handle password update
    if (req.body.password) {
      // Compare the current password with the new one
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      
      if (!isMatch) {
        // Hash the new password and update
        updateData.password = await bcrypt.hash(req.body.password, 10);
      }
    }

    // Update the user with the new data
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    );

    // Exclude the password from the response
    const { password, ...rest } = updatedUser._doc;

    return res
      .status(200)
      .json({ success: true, message: "User info updated", ...rest });
  } catch (error) {
    console.log("Error:", error.message);
    return res.status(400).json({ success: false, message: error.message });
  }
};



export const user = async (req, res, next) => {
  try {
    const { userRefs } = req.body; // Extract userRefs from request body
    const info = await User.find({ _id: { $in: userRefs } }); // Find users based on userRefs
    res.status(200).json(info);
  } catch (error) {
    next(error);
  }
};

