import mongoose from "mongoose";

const pageSchema = new mongoose.Schema({
  pageNumber: Number,
  text: String,
  confidence: Number,
  status: {
    type: String,
    enum: ["done", "failed"],
    default: "done"
  }
});

const documentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    uploader: { type: String, default: "Anonymous" },
    tags: [String],
    language: { type: String, default: "eng" },
    uploadDate: { type: Date, default: Date.now },
    pages: [pageSchema]
  },
  { timestamps: true }
);

export default mongoose.model("Document", documentSchema);