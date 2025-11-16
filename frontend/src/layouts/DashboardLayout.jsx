import React from "react";
import { Outlet } from "react-router-dom";
import Topbar from "../components/dashboard/Topbar";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* ✅ Always visible Topbar */}
      <Topbar />

      {/* ✅ Full-screen content */}
      <main className="flex-1 w-full p-6 sm:p-8 lg:p-10">
        <Outlet />
      </main>
    </div>
  );
}
