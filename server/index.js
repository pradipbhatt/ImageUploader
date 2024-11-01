import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./Routes/ImageRoute.js"; // Ensure correct import path for routes
import connectDB from "./config/dbconfig.js"; // Ensure correct import path for database config

dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // Automatically parses JSON requests
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded requests
app.use(cors({
  origin: "http://localhost:3000", // Adjust origin as necessary for your frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// Connect to the database
connectDB();

// Define Routes
app.use("/api", routes); // Ensure the router file exports correctly

// Start the server
const port = 8081;
app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
