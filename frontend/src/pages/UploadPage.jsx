import React, { useState, useRef } from "react";
import api from "../api";

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dropRef = useRef(null);

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) setFile(selectedFile);
  };

  // ✅ Handle drag & drop events
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) setFile(droppedFile);
  };

  // ✅ Upload function
  const handleUpload = async () => {
    if (!file) return alert("Please select or drop a file first.");

    const fd = new FormData();
    fd.append("file", file);

    setLoading(true);
    try {
      await api.post("/ocr/upload", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("✅ File uploaded successfully and OCR completed!");
      setFile(null);
    } catch (err) {
      console.error("❌ Upload Error:", err);
      alert("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-70px)] flex flex-col items-center justify-center bg-gray-50 px-6 py-10">
      <h2 className="text-3xl font-semibold text-gray-800 mb-8">
        Upload Document for OCR
      </h2>

      {/* Upload Box */}
      <div
        ref={dropRef}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`w-full max-w-3xl border-2 border-dashed rounded-lg p-10 text-center transition-all duration-200 cursor-pointer ${
          isDragging
            ? "border-indigo-500 bg-indigo-50"
            : "border-gray-300 bg-white"
        }`}
      >
        <input
          type="file"
          id="fileInput"
          className="hidden"
          onChange={handleFileSelect}
        />

        <label htmlFor="fileInput" className="cursor-pointer flex flex-col items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-14 w-14 text-indigo-500 mb-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5V18a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021 18v-1.5M7.5 12l4.5-4.5m0 0L16.5 12m-4.5-4.5V18"
            />
          </svg>

          <p className="text-gray-600">
            {isDragging ? (
              <span className="text-indigo-600 font-semibold">
                Drop your file here 👇
              </span>
            ) : (
              <>
                <span className="font-semibold text-indigo-600">
                  Click to upload
                </span>{" "}
                or drag and drop
              </>
            )}
          </p>

          {file && (
            <p className="mt-4 text-sm text-gray-700 break-all">
              📄 <strong>{file.name}</strong>
            </p>
          )}
        </label>
      </div>

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={loading}
        className={`mt-8 w-full max-w-3xl py-3 rounded-md text-white font-medium text-lg shadow transition ${
          loading
            ? "bg-indigo-300 cursor-not-allowed"
            : "bg-indigo-600 hover:bg-indigo-700"
        }`}
      >
        {loading ? "Uploading..." : "Upload & Process"}
      </button>
    </div>
  );
};

export default UploadPage;
