import TShirt from "../models/TShirt.js";

const AddProducts = async (req, res, next) => {
  try {
    const { imageUrls, tshirtName, oldPrice, userRef, details, sizes } =
      req.body;

    const tShirt = await TShirt.create({
      imageUrls,
      tshirtName,
      oldPrice,
      sizes,
      details,
      userRef,
    });
    return res.status(201).json({
      success: true,
      tShirt: tShirt,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const searchTerm = req.query.searchTerm || "";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 13;
    const skip = (page - 1) * limit;
    const sort = req.query.sort || "a-z";
    const filter = req.query.filter || "in-stock";

    let dbQuery = {};
    if (searchTerm) {
      dbQuery.tshirtName = { $regex: searchTerm, $options: "i" };
    }

    // Apply filter for stock status
    if (filter === "in-stock") {
      dbQuery.inStock = true;
    } else if (filter === "out-of-stock") {
      dbQuery.inStock = false;
    }

    // Apply sorting based on the sort criteria
    let sortQuery = {};
    if (sort === "a-z") {
      sortQuery = { tshirtName: 1 }; // Ascending order for "a-z"
    } else if (sort === "z-a") {
      sortQuery = { tshirtName: -1 }; // Descending order for "z-a"
    } else if (sort === "low-high") {
      sortQuery = { priceToSort: 1 };
    } else if (sort === "high-low") {
      sortQuery = { priceToSort: -1 };
    } else if (sort === "old-new") {
      sortQuery = { createdAt: 1 };
    } else if (sort === "new-old") {
      sortQuery = { createdAt: -1 };
    }

    // Aggregate query with sorting and pagination
    const tShirts = await TShirt.aggregate([
      { $match: dbQuery },
      {
        $addFields: {
          priceToSort: {
            $cond: {
              if: { $gt: ["$newPrice", 0] },
              then: "$newPrice",
              else: "$oldPrice",
            },
          },
        },
      },
      { $sort: sortQuery },
      { $skip: skip },
      { $limit: limit },
    ]);

    console.log(sortQuery);
    
    const total = await TShirt.countDocuments(dbQuery);
    res.json({ tShirts, total });

  } catch (error) {
    console.error('Error fetching products:', error.message);
    return res.status(400).json({ success: false, message: error.message });
  }
};

const productDetails = async (req, res) => {
  const { name, tshirtId } = req.params;
  try {
    const tShirt = await TShirt.findById(tshirtId);
    // const tShirt = await TShirt.findOne({ name: name, _id: tshirtId });
    if (!tShirt) {
      return res.status(404).json({
        success: false,
        message: "T-shirt not found",
      });
    }
    return res.status(200).json({
      success: true,
      tShirt,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteItem = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedItem = await TShirt.findByIdAndDelete(id);

    if (!deletedItem) {
      return res
        .status(404)
        .json({ success: false, message: "T-shirt not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "T-shirt deleted successfully" });
  } catch (error) {
    console.error("Error deleting T-shirt:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getUpdateTshirt = async (req, res) => {
  try {
    const tShirt = await TShirt.findById(req.params.id);
    if (!tShirt) {
      return res.status(404).json({
        success: false,
        message: "T-shirt not found",
      });
    }
    return res.status(200).json({
      success: true,
      tShirt,
    });
  } catch (error) {
    console.error("Error fetching T-shirt:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

const updateTShirt = async (req, res, next) => {
  try {
    const tShirt = await TShirt.findById(req.params.id);

    // if (!tShirt) {
    //   return next(errorHandler(404, "T-shirt not found!"));
    // }
    const updatedTShirt = await TShirt.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "T-shirt updated successfully",
      tShirt: updatedTShirt,
    });
  } catch (error) {
    next(error);
  }
};

export {
  AddProducts,
  getAllProducts,
  productDetails,
  deleteItem,
  getUpdateTshirt,
  updateTShirt,
};
