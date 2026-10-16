"use client";
import React, { useEffect, useState } from "react";
import Hero from "./website-component/Hero";
import Productview from "./product/Productview";
import AddProduct from "./product/AddProduct";
import { useButton } from "@/services/contextService/admin/buttonContextProvicer";
import Categorypage from "./product/Categorypage";

export default function Product() {
  const tabs = [
    {
      id: 1,
      label: "Product's",
    },
    {
      id: 2,
      label: "Add",
    },
    {
      id: 3,
      label: "Category",
    },
    {
      id: 4,
      label: "Edit",
    },
  ];
  const { globalAddproduct, handleAddProduct } = useButton();
  const [active, setActive] = useState(
    globalAddproduct === "Add"
      ? "Add"
      : globalAddproduct === "Edit"
        ? "Edit"
        : "Product's",
  );

  useEffect(() => {
    if (globalAddproduct === "Add") {
      setActive("Add");
      return;
    }

    if (globalAddproduct === "Edit") {
      setActive("Edit");
      return;
    }

    if (globalAddproduct === "Product") {
      setActive("Product's");
    }
  }, [globalAddproduct]);

  const handelClickTab = (label) => {
    setActive(label);
    if (label === "Add") {
      handleAddProduct("Add");
      return;
    }

    if (label === "Edit") {
      handleAddProduct("Edit");
      return;
    }

    handleAddProduct("Product");
  };
  return (
    <div className="website-layout-container w-full">
      <div className="website-layout-main ">
        <div className="website-tab-section flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {tabs.map((data, index) => (
            <button
              onClick={(e) => handelClickTab(data.label)}
              className={`cursor-pointer px-4 py-2 rounded-full text-xs font-semibold shrink-0 transition-all duration-150 border  ${active === data.label ? "bg-neutral-900 text-white border-neutral-900 shadow-xs" : "bg-white text-neutral-700 hover:bg-neutral-100 border-neutral-200"}`}
              key={index}
            >
              {data.label}
            </button>
          ))}
        </div>
        <div className="tabs-section-page-render py-6 px-4 sm:px-6">
          {active === "Product's" && <Productview />}
          {active === "Add" && <AddProduct />}
          {active === "Category" && <Categorypage />}
        </div>
      </div>
    </div>
  );
}
