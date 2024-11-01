// dbConfig.js
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://pradipbhatt:pradip@cluster0.zi62tma.mongodb.net/", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database Connected");
  } catch (error) {
    console.error("DB Connection Error:", error);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
