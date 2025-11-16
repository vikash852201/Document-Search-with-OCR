import React, { useEffect, useState } from "react";
import api from "../api";

const DashboardHome = () => {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [confirmAction, setConfirmAction] = useState(null); // "delete" | "reprocess"

  // ✅ Fetch documents
  const fetchDocs = async () => {
    try {
      const res = await api.get("/ocr/list");
      setDocs(res.data || []);
    } catch (err) {
      console.error("❌ Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  // ✅ Delete document
  const handleDelete = async (id) => {
    try {
      await api.delete(`/ocr/delete/${id}`);
      setDocs((prev) => prev.filter((d) => d._id !== id));
      setConfirmAction(null);
      alert("Document deleted successfully!");
    } catch (err) {
      console.error("❌ Delete Error:", err);
      alert("Failed to delete document");
    }
  };

  // ✅ Reprocess document
  const handleReprocess = async (id) => {
    try {
      const res = await api.put(`/ocr/reprocess/${id}`);
      setDocs((prev) =>
        prev.map((d) => (d._id === id ? res.data.doc : d))
      );
      setConfirmAction(null);
      alert("Document reprocessed successfully!");
    } catch (err) {
      console.error("❌ Reprocess Error:", err);
      alert("Failed to reprocess document");
    }
  };

  return (
    <div className="w-full px-2 sm:px-4 md:px-6">
      <div className="rounded-lg shadow-sm p-4 sm:p-6 bg-white">
        {loading ? (
          <p className="text-gray-500 text-center py-6">Loading documents...</p>
        ) : docs.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            <h3 className="mt-4 text-lg font-semibold text-gray-900">
              No documents yet
            </h3>
            <p className="mt-1 text-sm">
              Upload your first document to get started.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {docs.map((doc) => (
              <div
                key={doc._id}
                className="p-4 border border-gray-200 rounded-lg bg-gray-50 hover:bg-white transition"
              >
                <div className="flex justify-between items-start">
                  <div
                    onClick={() => setSelectedDoc(doc)}
                    className="cursor-pointer flex-1 pr-2"
                  >
                    <h4 className="font-medium text-gray-900 truncate">
                      {doc.filename}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                      {doc.text.slice(0, 180)}...
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(doc.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => setConfirmAction({ type: "reprocess", doc })}
                      className="text-indigo-600 border border-indigo-200 px-2 py-1 text-xs rounded hover:bg-indigo-50"
                    >
                      🔁
                    </button>
                    <button
                      onClick={() => setConfirmAction({ type: "delete", doc })}
                      className="text-red-600 border border-red-200 px-2 py-1 text-xs rounded hover:bg-red-50"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ✅ Document Preview Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 p-6 relative">
            <button
              onClick={() => setSelectedDoc(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
            >
              ×
            </button>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {selectedDoc.filename}
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              Uploaded on {new Date(selectedDoc.createdAt).toLocaleString()}
            </p>
            <div className="bg-gray-50 rounded-md p-4 h-80 overflow-y-auto text-sm text-gray-700 whitespace-pre-wrap">
              {selectedDoc.text}
            </div>
          </div>
        </div>
      )}

      {/* ✅ Confirmation Modal */}
      {confirmAction && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 sm:w-96 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {confirmAction.type === "delete"
                ? "Delete Document?"
                : "Reprocess Document?"}
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              {confirmAction.type === "delete"
                ? "This will permanently remove the document from the system."
                : "This will re-run OCR on the selected document."}
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() =>
                  confirmAction.type === "delete"
                    ? handleDelete(confirmAction.doc._id)
                    : handleReprocess(confirmAction.doc._id)
                }
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Confirm
              </button>
              <button
                onClick={() => setConfirmAction(null)}
                className="px-4 py-2 border rounded hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardHome;