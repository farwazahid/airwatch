"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";

export default function HeaderBar() {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Dashboard", path: "/dashboard" },
    { label: "Map", path: "/map" },
    { label: "Forecast", path: "/forecast" },
  ];

  const handleNavClick = (path: string) => {
    router.push(path);
  };

  return (
    <header className="w-full fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-white/60 border-b border-white/30 shadow-lg h-16">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-full px-8">
        {/* Logo and Branding - Clickable */}
        <button 
          onClick={() => handleNavClick("/")}
          className="flex items-center gap-2.5 hover:opacity-80 transition-opacity duration-200"
        >
          {/* AirWatch Custom Logo */}
          <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg shadow-md">
            <svg 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
            >
              {/* Wind/Air icon */}
              <path 
                d="M3 8h10a2 2 0 100-4 2 2 0 00-2 2M3 12h14a2 2 0 110 4 2 2 0 01-2-2M3 16h6a2 2 0 110 4 2 2 0 01-2-2" 
                stroke="white" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              {/* Leaf accent */}
              <circle cx="18" cy="6" r="2" fill="#86efac" />
            </svg>
          </div>
          
          {/* AirWatch Branding */}
          <div className="flex flex-col text-left">
            <div className="flex items-center gap-2 pt-1">
              <h1 
                className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#0b3b16] to-[#16a34a] tracking-tight leading-none drop-shadow-sm" 
                style={{ 
                  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  letterSpacing: '-0.02em'
                }}
              >
                AirWatch
              </h1>
              <span className="px-2 py-0.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-[11px] font-bold rounded-md flex items-center leading-none shadow-sm translate-y-[-1px]">
                2025
              </span>
            </div>
            <p className="text-[9px] text-gray-600 font-medium mt-0.5 tracking-wide">
              Powered by NASA Space Apps Challenge
            </p>
          </div>
        </button>

        {/* Navigation Links */}
        <nav className="flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavClick(item.path)}
              className={`px-4 py-1 rounded-lg text-sm font-semibold transition-all duration-200 ${
                pathname === item.path
                  ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md"
                  : "text-gray-700 hover:bg-white/40 hover:text-green-700"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
