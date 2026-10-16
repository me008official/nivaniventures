"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import {
  IoMdSearch,
  IoMdAdd,
  IoIosMore,
  IoMdTrash,
  IoMdCreate,
  IoMdFilter,
  IoMdCheckmarkCircle,
  IoMdTime,
} from "react-icons/io";

export default function Productview() {
  // Mock dataset matching your sustainable store types
  // const [products, setProducts] = useState([]);
  const fetchProduct = async () => {
    const res = await axios.get("/api/v1/admin/product/view");
    return res.data?.data ?? [];
  };

  const { data: products = [], isLoading: isProductsLoading } = useQuery({
    queryKey: ["product"],
    queryFn: fetchProduct,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filtering logic based on search input and category selection
  const filteredProducts = (products ?? []).filter((product) => {
    const productName = product?.product_name ?? "";
    const productId = product?.id ?? product?._id ?? "";
    const matchesSearch =
      productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      productId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || product?.main_category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Simple delete handler
  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
      alert(`Delete product: ${id}`);
    }
  };

  const fetchCatagory = async () => {
    const res = await axios.get("/api/v1/admin/product/category?type=viewonly");
    return res.data?.data ?? [];
  };

  const { data: categories = [] } = useQuery({
    queryKey: ["category"],
    queryFn: fetchCatagory,
  });

  return (
    <div className="space-y-6 font-sans">
      {/* Top Header & Action Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-neutral-200 shadow-2xs">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
            Inventory Management
          </span>
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-neutral-900 mt-1">
            All Listed Products 📦
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Manage your catalog variants, pricing, tracking status, and
            inventory level.
          </p>
        </div>

        <button
          onClick={() => alert("Open Add Product Modal/Form here!")}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-neutral-900 text-white hover:bg-neutral-800 transition-all shadow-sm cursor-pointer shrink-0"
        >
          <IoMdAdd className="text-sm" />
          Add New Product
        </button>
      </div>

      {/* Filter and Search Bar Section */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-neutral-200 shadow-2xs">
        {/* Search Field */}
        <div className="relative w-full sm:w-80">
          <IoMdSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 text-base" />
          <input
            type="text"
            placeholder="Search by name or product ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-neutral-900 transition-all"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {categories?.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category?.main_category)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === category?.main_category
                  ? "bg-neutral-900 text-white"
                  : "bg-neutral-50 text-neutral-600 hover:bg-neutral-100 border border-neutral-200"
              }`}
            >
              {category?.main_category}
            </button>
          ))}
        </div>
      </div>

      {/* Products Table Container */}
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-neutral-100 bg-neutral-50/70 text-neutral-400 uppercase font-semibold text-[10px]">
                <th className="py-3 px-6 font-semibold">Product Details</th>
                <th className="py-3 px-4 font-semibold">Category</th>
                <th className="py-3 px-4 font-semibold">Price</th>
                <th className="py-3 px-4 font-semibold">Stock</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-6 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {isProductsLoading ? (
                <tr><td colSpan="6" className="py-12 text-center text-neutral-400">Loading products...</td></tr>
              ) : filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-neutral-50/50 transition-colors"
                  >
                    {/* Product Name & Image */}
                    <td className="py-4 px-6 flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-neutral-100 overflow-hidden relative shrink-0 border border-neutral-200">
                        <img
                          src={product.image}
                          alt={product.product_name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-neutral-900">
                          {product.product_name}
                        </p>
                        <span className="font-mono text-[10px] text-neutral-400">
                          {product.id}
                        </span>
                      </div>
                    </td>

                    {/* Category Label */}
                    <td className="py-4 px-4 text-neutral-600 font-medium">
                      <span className="px-2.5 py-1 bg-neutral-100 rounded-md text-[11px]">
                        {product.main_category}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="py-4 px-4 font-semibold text-neutral-900">
                      {product.price}
                    </td>

                    {/* Stock Value */}
                    <td className="py-4 px-4 text-neutral-600 font-medium font-mono">
                      {product.stock} units
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold ${
                          product.status === "Active"
                            ? "bg-emerald-50 text-emerald-700"
                            : product.status === "Low Stock"
                              ? "bg-amber-50 text-amber-700"
                              : "bg-red-50 text-red-700"
                        }`}
                      >
                        {product.is_active === true && (
                          <IoMdCheckmarkCircle className="text-xs" />
                        )}
                        {product.is_active === false && (
                          <IoMdTime className="text-xs" />
                        )}
                        {product.is_active}
                      </span>
                    </td>

                    {/* Action Buttons */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          title="Edit Product"
                          onClick={() => alert(`Edit product: ${product.id}`)}
                          className="p-2 rounded-lg text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 transition-colors cursor-pointer"
                        >
                          <IoMdCreate className="text-sm" />
                        </button>
                        <button
                          title="Delete Product"
                          onClick={() => handleDelete(product.id)}
                          className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                        >
                          <IoMdTrash className="text-sm" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="py-12 text-center text-neutral-400"
                  >
                    No products found matching your search term.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer Summary */}
        <div className="px-6 py-4 border-t border-neutral-100 bg-neutral-50/50 flex items-center justify-between text-xs text-neutral-500">
          <span>
            Showing{" "}
            <strong className="text-neutral-900">
              {filteredProducts.length}
            </strong>{" "}
            of {products.length} entries
          </span>
          <span className="text-[11px] text-neutral-400">
            Catalog Version v2.4
          </span>
        </div>
      </div>
    </div>
  );
}
