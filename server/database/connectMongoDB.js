import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    mongoose
      .connect(process.env.MONGO_URL)
      .then(() => {
        console.log("MongoDB connected successfully");
      })
      .catch((error) => {
        console.error("MongoDB connection error:", error);
        if (error.codeName === "AtlasError") {
          console.error(
            "Atlas-specific error details:",
            error[Symbol.for("errorLabels")]
          );
        }
      });
  } catch (error) {
    console.error(`Error connection to mongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectMongoDB;

// import mongoose from "mongoose";

// const connectMongoDB = async () => {
// 	try {
// 		const conn = await mongoose.connect(process.env.MONGO_URL);
// 		console.log(`MongoDB connected: ${conn.connection.host}`);
// 	} catch (error) {
// 		console.error(`Error connection to mongoDB: ${error.message}`);
// 		process.exit(1);
// 	}
// };

// export default connectMongoDB;
