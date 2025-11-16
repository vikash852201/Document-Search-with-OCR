import fs from "fs";
import path from "path";
import Tesseract from "tesseract.js";
import OCRResult from "../models/OCRResult.js";

// ✅ Upload and process image
export const uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      console.error("❌ No file received");
      return res.status(400).json({ error: "No file uploaded" });
    }

    const imagePath = path.resolve(req.file.path);
    console.log("🖼️ Processing:", imagePath);

    // Run OCR
    const result = await Tesseract.recognize(imagePath, "eng", {
      logger: (m) => console.log(m),
    });

    const extractedText = result.data.text;
    console.log("✅ OCR Extracted Text:", extractedText.substring(0, 100));

    // Save result to MongoDB
    const ocrResult = new OCRResult({
      filename: req.file.filename,
      text: extractedText,
    });

    await ocrResult.save();

    res.json({
      message: "OCR completed successfully",
      text: extractedText,
    });
  } catch (error) {
    console.error("❌ OCR Error:", error);
    res.status(500).json({ error: "OCR processing failed" });
  }
};

// ✅ Search text in OCR results
export const searchDocuments = async (req, res) => {
  try {
    const { query } = req.body;
    console.log("🔍 Searching for:", query);
    if (!query) return res.status(400).json({ error: "Search query is required" });

    const results = await OCRResult.find({
      text: { $regex: query, $options: "i" },
    });

    res.json(results);
  } catch (error) {
    console.error("❌ Search Error:", error);
    res.status(500).json({ error: "Search failed" });
  }
};

// ✅ List all OCR documents
export const listDocuments = async (req, res) => {
  try {
    const results = await OCRResult.find().sort({ createdAt: -1 }); // newest first
    res.json(results);
  } catch (error) {
    console.error("❌ Error fetching documents:", error);
    res.status(500).json({ error: "Failed to fetch documents" });
  }
};

// ✅ DELETE a document
export const deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;
    await OCRResult.findByIdAndDelete(id);
    res.json({ success: true, message: "Document deleted successfully" });
  } catch (error) {
    console.error("❌ Delete Error:", error);
    res.status(500).json({ error: "Failed to delete document" });
  }
};

// ✅ REPROCESS (mock)
export const reprocessDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await OCRResult.findById(id);

    if (!doc) return res.status(404).json({ error: "Document not found" });

    // Mock reprocessing - In production, you'd rerun Tesseract here.
    doc.text = doc.text + "\n\n(Reprocessed on " + new Date().toLocaleString() + ")";
    await doc.save();

    res.json({ success: true, message: "Reprocessed successfully", doc });
  } catch (error) {
    console.error("❌ Reprocess Error:", error);
    res.status(500).json({ error: "Failed to reprocess document" });
  }
};
