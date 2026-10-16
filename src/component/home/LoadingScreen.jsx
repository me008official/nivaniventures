"use client";

import React, { useState } from 'react';

export default function LoadingScreen({ isLoading = true }) {
  const [shouldRender, setShouldRender] = useState(true);

  // If you want to trigger the fade out later, you can pass `isLoading={false}` from a parent component
  React.useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => setShouldRender(false), 400);
      return () => clearTimeout(timer);
    } else {
      setShouldRender(true);
    }
  }, [isLoading]);

  if (!shouldRender) return null;

  return (
    <div
      className={`absolute inset-0 sticky top-[50%] z-10 h-full flex items-center justify-center duration-400 ease-in-out ${
        isLoading ? 'opacity-100' : 'opacity-50 pointer-events-none'
      }`}
    >
      <div className="flex flex-col  items-center gap-4">
        {/* Minimalist Spinner */}
        <div className="w-10 h-10 border-3 border-black/10 border-t-black rounded-full animate-spin [animation-duration:0.8s]" />
        
        {/* Pulsing Minimal Text */}
        <p className="text-white text-xs font-medium tracking-[0.2em] uppercase animate-pulse">
          Loading
        </p>
      </div>
    </div>
  );
}