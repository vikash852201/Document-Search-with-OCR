import express from "express";
import multer from "multer";
import path from "path";
import {
  uploadDocument,
  searchDocuments,
  listDocuments,
  deleteDocument,
  reprocessDocument,
} from "../controllers/ocrController.js";

const router = express.Router();

// Setup multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // folder where files will be temporarily stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique file name
  },
});

const upload = multer({ storage });

// 🧾 Upload route (with multer middleware)
router.post("/upload", upload.single("file"), uploadDocument);

// 🔍 Search route
router.post("/search", searchDocuments);

// 📄 Fetch all documents
router.get("/list", listDocuments);

// 🗑️ Delete a document
router.delete("/delete/:id", deleteDocument);

// 🔁 Reprocess a document
router.put("/reprocess/:id", reprocessDocument);

export default router;