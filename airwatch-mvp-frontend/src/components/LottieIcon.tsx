"use client";

import React from "react";

// Lightweight placeholder component for the Lottie area.
// To enable animations, install `lottie-react` and update this component
// to dynamically import and render the animation JSON from the public folder.
export default function LottieIcon({ src, size = 40 }: { src: string; size?: number }) {
  return (
    <div
      style={{ width: size, height: size, display: "flex", alignItems: "center", justifyContent: "center" }}
      data-src={src}
    >
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" fill="#D1FAE5" />
        <path d="M8 12c1.333-2 2.667-3 4-3s2.667 1 4 3" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
