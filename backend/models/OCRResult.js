import mongoose from "mongoose";

const OCRResultSchema = new mongoose.Schema(
  {
    filename: { type: String, required: true },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

// Optional: improve search performance with a text index
OCRResultSchema.index({ text: "text" });

const OCRResult = mongoose.model("OCRResult", OCRResultSchema);
export default OCRResult;
