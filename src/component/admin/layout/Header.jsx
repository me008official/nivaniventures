"use client";
import React, { useState } from "react";
import { IoIosNotifications, IoMdSearch } from "react-icons/io";

export default function Header() {
  const [hasNotifications, setHasNotifications] = useState(true);

  return (
    <header className="bg-white border-b border-neutral-200 sticky z-30 top-0 w-full font-sans">
      <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between gap-4">
        
        {/* Left Section: Search Shortcuts */}
        <div className="flex-1 max-w-xl">
          <div className="relative flex items-center">
            <IoMdSearch className="absolute left-4 text-neutral-400 text-base pointer-events-none" />
            <input
              type="text"
              className="w-full pl-11 pr-4 py-2 text-xs font-medium bg-neutral-50 border border-neutral-200 rounded-full focus:outline-neutral-900 transition-all placeholder:text-neutral-400"
              placeholder="Search shortcuts, products, or sections..."
            />
            <span className="hidden sm:inline-block absolute right-3 text-[10px] bg-neutral-200/70 text-neutral-500 px-1.5 py-0.5 rounded font-mono">
              ⌘K
            </span>
          </div>
        </div>

        {/* Right Section: Notification & Admin Profile Control */}
        <div className="flex items-center gap-3">
          {/* Notification Button with indicator */}
          <button
            onClick={() => setHasNotifications(false)}
            aria-label="View notifications"
            className="relative p-2.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-all cursor-pointer"
          >
            <IoIosNotifications className="text-base" />
            {hasNotifications && (
              <span className="absolute top-2 right-2 w-2 h-2 bg-neutral-900 rounded-full ring-2 ring-white"></span>
            )}
          </button>

          {/* Admin Avatar Profile Pill */}
          <div className="hidden sm:flex items-center gap-2.5 pl-2 border-l border-neutral-200">
            <div className="w-8 h-8 rounded-full bg-neutral-900 text-white font-semibold text-xs flex items-center justify-center">
              AD
            </div>
            <div className="text-left">
              <p className="text-xs font-semibold text-neutral-800 leading-none">Admin User</p>
              <p className="text-[10px] text-neutral-400 mt-0.5">Manager</p>
            </div>
          </div>
        </div>

      </div>
    </header>
  );
}