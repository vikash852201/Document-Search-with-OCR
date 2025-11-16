import React, { useState } from "react";
import api from "../api";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Function to highlight matched text
  const highlightText = (text, keyword) => {
    if (!keyword) return text;
    const regex = new RegExp(`(${keyword})`, "gi");
    return text.split(regex).map((part, i) =>
      part.toLowerCase() === keyword.toLowerCase() ? (
        <mark key={i} className="bg-yellow-300 text-black font-semibold px-0.5 rounded-sm">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  const doSearch = async () => {
    if (!query) return alert("Enter something to search!");
    setLoading(true);
    try {
      const res = await api.post("/ocr/search", { query });
      setResults(res.data || []);
    } catch (err) {
      console.error(err);
      alert("Search failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-70px)] flex flex-col bg-white px-6 py-10">
      <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
        Search Documents
      </h2>

      {/* Search bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-10 w-full max-w-4xl mx-auto">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search here..."
          className="flex-1 border border-gray-300 rounded-md px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
        />
        <button
          onClick={doSearch}
          disabled={loading}
          className={`px-6 py-3 rounded-md text-white font-medium ${
            loading
              ? "bg-indigo-300 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-8">
        {results.length === 0 ? (
          <div className="col-span-full text-center text-gray-400">
            No results yet
          </div>
        ) : (
          results.map((doc) => (
            <div
              key={doc._id}
              className="p-5 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition bg-gray-50"
            >
              <h4 className="font-semibold text-gray-800 truncate">
                {doc.filename}
              </h4>
              <p className="text-sm text-gray-700 mt-2 line-clamp-3">
                {highlightText(doc.text.slice(0, 300), query)}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchPage;
