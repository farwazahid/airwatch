"use client";

import React from "react";
import HeaderBar from "./HeaderBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 text-[#0b3b16]">
      <HeaderBar />
      <main className="w-full py-6 px-8 page-container mt-16">{children}</main>
    </div>
  );
}
