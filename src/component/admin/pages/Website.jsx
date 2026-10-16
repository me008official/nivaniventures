"use client";
import React, { useState } from "react";
import Hero from "./website-component/Hero";
import Quality from "./website-component/Quality";
import Services from "./website-component/Services";

export default function Website() {
  const tabs = [
    { id: 1, label: "Hero" },
    { id: 2, label: "Quality" },
    { id: 3, label: "Services" },
    { id: 4, label: "Feedback" },
    { id: 5, label: "Founder" },
  ];

  const [active, setActive] = useState("Hero");

  const handelClickTab = (label) => {
    setActive(label);
  };

  return (
    <div className="website-layout-container font-sans text-neutral-900">
      <div className="website-layout-main flex flex-col">
        {/* Sticky & Responsive Tab Section */}
        <div className="sticky top-0 lg:top-[0px] z-20border-b border-neutral-200  transition-all">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {tabs.map((data, index) => {
              const isActive = active === data.label;
              return (
                <button
                  key={index}
                  onClick={() => handelClickTab(data.label)}
                  className={`cursor-pointer px-4 py-2 rounded-full text-xs font-semibold shrink-0 transition-all duration-150 border ${
                    isActive
                      ? "bg-neutral-900 text-white border-neutral-900 shadow-xs"
                      : "bg-white text-neutral-700 hover:bg-neutral-100 border-neutral-200"
                  }`}
                >
                  {data.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Component Content Renderer */}
        <div className="tabs-section-page-render py-6 px-4 sm:px-6">
          {active === "Hero" && <Hero />}
          {active === "Quality" && <Quality />}
          {active === "Services" && <Services />}
          {active === "Feedback" && (
            <div className="flex min-h-[40vh] items-center justify-center text-neutral-400 text-xs font-semibold uppercase tracking-wider">
              Feedback Component Coming Soon
            </div>
          )}
          {active === "Founder" && (
            <div className="flex min-h-[40vh] items-center justify-center text-neutral-400 text-xs font-semibold uppercase tracking-wider">
              Founder Component Coming Soon
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
