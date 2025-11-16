import React from "react";
import { Link } from "react-router-dom";

export default function Topbar() {
  return (
    <header className="w-full sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-3">
        <h1 className="text-xl font-semibold text-indigo-600">📄 DocuSearch</h1>

        <nav className="flex items-center gap-6 text-gray-700 text-sm font-medium">
          <Link to="/">Documents</Link>
          <Link to="/upload">Upload</Link>
          <Link to="/search">Search</Link>
        </nav>
      </div>
    </header>
  );
}
