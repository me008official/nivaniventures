"use client";
import React, { useEffect, useState } from "react";
import { CgFeed, CgMenu, CgShutterstock, CgWebsite } from "react-icons/cg";
import { FaRegClosedCaptioning, FaSeedling } from "react-icons/fa";
import { IoIosBuild } from "react-icons/io";
import Header from "./Header";
import PageAcees from "./PageAcees";
import { useButton } from "@/services/contextService/admin/buttonContextProvicer";

export default function Sidebar() {
  const navSection = [
    {
      id: 1,
      label: "Overview",
      target: "overview",
      icon: <CgFeed className="text-base shrink-0" />,
    },
    {
      id: 2,
      label: "Website",
      target: "website",
      icon: <CgWebsite className="text-base shrink-0" />,
    },
    {
      id: 3,
      label: "Product",
      target: "product",
      icon: <CgShutterstock className="text-base shrink-0" />,
    },
    {
      id: 4,
      label: "Customization",
      target: "customizetion",
      icon: <IoIosBuild className="text-base shrink-0" />,
    },
    {
      id: 5,
      label: "Review",
      target: "review",
      icon: <FaSeedling className="text-base shrink-0" />,
    },
    {
      id: 6,
      label: "Leads",
      target: "leads",
      icon: <FaRegClosedCaptioning className="text-base shrink-0" />,
    },
  ];

  const [active, setActive] = useState("Overview");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { handleAddProduct, globalAddproduct } = useButton();

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  const handleSidebarClick = (label) => {
    setActive(label);

    if (label === "Product") {
      handleAddProduct("Product");
      return;
    }

    handleAddProduct(null);
  };
  
  useEffect(() => {
    if (
      globalAddproduct === "Add" ||
      globalAddproduct === "Edit" ||
      globalAddproduct === "Product"
    ) {
      setActive("Product");
    }
  }, [globalAddproduct]);
  
  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans text-neutral-950 flex">
      {/* 1. Fixed Sidebar on the Left */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white border-r border-neutral-200 py-6 px-3 transition-all duration-300 ease-in-out flex flex-col justify-between z-40 ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        <div className="space-y-8">
          <div className="flex items-center justify-between px-2">
            {!isCollapsed && (
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                Admin Menu
              </span>
            )}
            <button
              onClick={toggleCollapse}
              aria-label="Toggle Sidebar"
              className="p-2 rounded-xl text-neutral-600 hover:bg-neutral-100 transition-colors cursor-pointer"
            >
              <CgMenu className="text-lg" />
            </button>
          </div>

          <nav className="space-y-1.5">
            {navSection.map((item) => {
              const isActive = active === item.label;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSidebarClick(item.label)}
                  title={isCollapsed ? item.label : undefined}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? "bg-neutral-900 text-white shadow-xs"
                      : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                  }`}
                >
                  {item.icon}
                  {!isCollapsed && (
                    <span className="truncate">{item.label}</span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {!isCollapsed && (
          <div className="px-2 pt-4 border-t border-neutral-100 text-[10px] text-neutral-400">
            System v2.4.0 <br /> Sustainable Engine
          </div>
        )}
      </aside>

      {/* 2. Main Right Wrapper (Adapts its left margin based on sidebar state) */}
      <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${
          isCollapsed ? "ml-20" : "ml-64"
        }`}
      >
        {/* Header is now locked seamlessly at the top right of the workspace */}
        <div className="sticky top-0 z-30 w-full bg-white">
          <Header />
        </div>

        {/* Dynamic Content Panel */}
        <main className="p-2 flex-1">
          <PageAcees active={active} />
        </main>
      </div>
    </div>
  );
}
