import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import ocrRoutes from "./routes/ocrRoutes.js";
import authRoutes from "./routes/authRoutes.js"; // ✅ Authentication routes

dotenv.config();
const app = express();

// ✅ Parse JSON request bodies
app.use(express.json());

// ✅ CORS Configuration
app.use(
  cors({
    origin: "http://localhost:3000", // React frontend
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Express 5 fix for preflight (no '*')
app.options(/.*/, cors());

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { dbName: "db_443bqw595" })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// ✅ Routes
app.use("/api/ocr", ocrRoutes);      // OCR upload/search/list/reprocess/delete
app.use("/api/users", authRoutes);   // Auth register/login routes

// ✅ Default route (optional)
app.get("/", (req, res) => {
  res.send("🚀 OCR Search API is running...");
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
