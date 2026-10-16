"use client";
import React from "react";
import Overview from "../pages/Overview";
import Website from "../pages/Website";
import Product from "../pages/Product";
import { useButton } from "@/services/contextService/admin/buttonContextProvicer";

export default function PageAcees({ active }) {
  const { globalAddproduct } = useButton();
  return (
    <div className="px-4 py-2">
      {active === "Overview" && <Overview />}
      {active === "Website" && <Website />}
      {active === "Product" || globalAddproduct === "Product" || globalAddproduct === "Add" || globalAddproduct === "Edit" ? (
        <Product />
      ) : (
        ""
      )}
      {/* {globalAddproduct === "Product" && <Product />} */}
    </div>
  );
}
