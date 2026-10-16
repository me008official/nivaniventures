"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useImageDropzone } from "@/services/imageDropzone/dropzoneService";

gsap.registerPlugin(ScrollTrigger);

export default function AddProduct() {
  const sectionRef = useRef(null);

  // Dynamic Database State fetched from backend category table
  const [DATABASE, setDATABASE] = useState(null);
  const [loadingDb, setLoadingDb] = useState(true);

  // Core Product Field States
  const [productTitle, setProductTitle] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  
  // Category Selection States
  const [activeCategory, setActiveCategory] = useState("");
  const [activeItemCategory, setActiveItemCategory] = useState("");
  const [activeGender, setActiveGender] = useState("");
  const [activeCollection, setActiveCollection] = useState("");

  // Product Variants Array (Sizes, Colors, Prices, SKUs, Stock)
  const [variants, setVariants] = useState([
    { sku: "", size: "M", color: "Natural", price: 0, compare_at_price: 0, stock: 10, image: "" }
  ]);

  // Gallery Image Array state
  const [images, setImages] = useState([]);

  // Use Dropzone Custom Service
  const {
    uploadedImage,
    getRootProps,
    getInputProps,
    isDragActive,
    removeImage,
  } = useImageDropzone();

  // Fetch Category structure from backend API on mount
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/v1/admin/product/category");
        const json = await res.json();
        if (json.success && Object.keys(json.DATABASE).length > 0) {
          const db = json.DATABASE;
          setDATABASE(db);
          
          const firstCat = Object.keys(db)[0];
          const firstItemCat = Object.keys(db[firstCat].itemCategories)[0];
          const firstItemData = db[firstCat].itemCategories[firstItemCat];

          setActiveCategory(firstCat);
          setActiveItemCategory(firstItemCat);
          setActiveGender(firstItemData.genders?.[0] || "Unisex");
          setActiveCollection(firstItemData.collections?.[0] || "");
        }
      } catch (err) {
        console.error("Failed to load category database matrix", err);
      } finally {
        setLoadingDb(false);
      }
    }
    fetchCategories();
  }, []);

  // GSAP Entrance Animation
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    gsap.fromTo(
      el,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 90%" },
      }
    );
  }, [loadingDb]);

  // Auto-add uploaded image to gallery/variants when dropzone fires
  useEffect(() => {
    if (uploadedImage) {
      const imgUrl = uploadedImage.path || uploadedImage.preview;
      if (!images.includes(imgUrl)) {
        setImages((prev) => [...prev, imgUrl]);
      }
    }
  }, [uploadedImage]);

  // Derived taxonomy options mapped straight from database structure
  const categories = DATABASE ? Object.keys(DATABASE) : [];
  const availableItemCategories = DATABASE && activeCategory ? Object.keys(DATABASE[activeCategory]?.itemCategories || {}) : [];
  const currentItemData = DATABASE && activeCategory && activeItemCategory ? DATABASE[activeCategory]?.itemCategories[activeItemCategory] || {} : {};
  const availableGenders = currentItemData.genders || [];
  const availableCollections = currentItemData.collections || [];

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    const firstItemCat = Object.keys(DATABASE[cat].itemCategories)[0];
    setActiveItemCategory(firstItemCat);
    const firstItemData = DATABASE[cat].itemCategories[firstItemCat];
    setActiveGender(firstItemData.genders?.[0] || "Unisex");
    setActiveCollection(firstItemData.collections?.[0] || "");
  };

  const handleItemCategoryChange = (itemCat) => {
    setActiveItemCategory(itemCat);
    const itemData = DATABASE[activeCategory].itemCategories[itemCat];
    setActiveGender(itemData.genders?.[0] || "Unisex");
    setActiveCollection(itemData.collections?.[0] || "");
  };

  // Variant Row Management Handlers
  const handleVariantChange = (index, field, value) => {
    const updatedVariants = [...variants];
    updatedVariants[index][field] = value;
    setVariants(updatedVariants);
  };

  const addVariantRow = () => {
    setVariants([
      ...variants,
      { sku: `SKU-${Date.now().toString().slice(-6)}`, size: "L", color: "Default", price: 0, compare_at_price: 0, stock: 10, image: "" }
    ]);
  };

  const removeVariantRow = (index) => {
    if (variants.length === 1) return;
    setVariants(variants.filter((_, i) => i !== index));
  };

  const removeImageFromGallery = (indexToRemove) => {
    setImages(images.filter((_, i) => i !== indexToRemove));
  };

  // Main Submit Handler to Backend Schema Route
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Process tags string into clean lowercase array
    const formattedTags = tagsInput
      ? tagsInput.split(",").map(t => t.trim().toLowerCase()).filter(Boolean)
      : [];

    const payload = {
      product_name: productTitle,
      description: productDescription,
      main_category: activeCategory,
      item_category: activeItemCategory,
      gender: activeGender,
      collection_type: activeCollection,
      variants: variants,
      images: images,
      tags: formattedTags,
    };

    try {
      const res = await fetch("/api/v1/admin/product/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        alert("Advanced Product published successfully to MongoDB database!");
      } else {
        alert(`Failed to save: ${data.error}`);
      }
    } catch (err) {
      console.error("Network submission error:", err);
    }
  };

  if (loadingDb) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm font-medium bg-neutral-50 text-neutral-500">
        Syncing admin category structural matrix...
      </div>
    );
  }

  return (
    <div className="min-h-screen text-neutral-900  bg-neutral-50/50" ref={sectionRef}>
      <main className=" mx-auto">
        {/* Minimal Header with Publish Controls */}
        <header className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between border-b border-neutral-200 pb-6 gap-4">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-neutral-900">Advanced Product Manager</h1>
            <p className="text-xs text-neutral-500 mt-0.5">Configure full schema inventory, variant matrix, and taxonomy attributes.</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="px-4 py-2 rounded-xl text-xs font-semibold border border-neutral-300 text-neutral-700 bg-white hover:bg-neutral-50 transition-colors"
            >
              Save Draft
            </button>
            <button
              onClick={handleSubmit}
              className="px-5 py-2 rounded-xl text-xs font-semibold bg-neutral-900 text-white hover:bg-neutral-800 transition-colors shadow-sm cursor-pointer"
            >
              Publish to Database
            </button>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Core Details, Taxonomy, and Variants */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* General Info Card */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200 shadow-2xs space-y-5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-400">1. Core Information</h2>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-2">Product Title</label>
                <input
                  type="text"
                  value={productTitle}
                  onChange={(e) => setProductTitle(e.target.value)}
                  placeholder="e.g. Himalayan Organic Hemp Relaxed Fit Shirt"
                  className="w-full py-2.5 px-4 rounded-xl text-sm font-medium bg-neutral-50 border border-neutral-200 focus:outline-neutral-900"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-2">Description</label>
                <textarea
                  rows={4}
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                  placeholder="Comprehensive details regarding fabric composition, weave style, and washing care..."
                  className="w-full py-2.5 px-4 rounded-xl text-sm font-medium bg-neutral-50 border border-neutral-200 focus:outline-neutral-900 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-2">Search Tags (Comma separated)</label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="e.g. hemp, sustainable, summer collection, organic shirt"
                  className="w-full py-2.5 px-4 rounded-xl text-sm font-medium bg-neutral-50 border border-neutral-200 focus:outline-neutral-900"
                />
              </div>
            </div>

            {/* Taxonomy Matrix Card */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200 shadow-2xs space-y-6">
              <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-400">2. Taxonomy Mapping (Filters System)</h2>
              
              {/* Material Category */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-2">Material Category (main_category)</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      type="button"
                      key={cat}
                      onClick={() => handleCategoryChange(cat)}
                      className={`py-2 px-4 rounded-xl text-xs font-semibold cursor-pointer border transition-all ${
                        activeCategory === cat ? "bg-neutral-900 text-white border-neutral-900 shadow-xs" : "bg-neutral-50 text-neutral-600 border-neutral-200 hover:border-neutral-400"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Item Category */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-2">Item Category (item_category)</label>
                <div className="flex flex-wrap gap-2">
                  {availableItemCategories.map((item) => (
                    <button
                      type="button"
                      key={item}
                      onClick={() => handleItemCategoryChange(item)}
                      className={`py-2 px-4 rounded-xl text-xs font-semibold cursor-pointer border transition-all ${
                        activeItemCategory === item ? "bg-neutral-900 text-white border-neutral-900 shadow-xs" : "bg-neutral-50 text-neutral-600 border-neutral-200 hover:border-neutral-400"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Demographic / Gender */}
              {availableGenders.length > 0 && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-2">Target Demographic (gender)</label>
                  <div className="flex flex-wrap gap-2">
                    {availableGenders.map((g) => (
                      <button
                        type="button"
                        key={g}
                        onClick={() => setActiveGender(g)}
                        className={`py-2 px-4 rounded-xl text-xs font-semibold cursor-pointer border transition-all ${
                          activeGender === g ? "bg-neutral-900 text-white border-neutral-900 shadow-xs" : "bg-neutral-50 text-neutral-600 border-neutral-200 hover:border-neutral-400"
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Collection Type */}
              {availableCollections.length > 0 && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-2">Collection Type (collection_type)</label>
                  <div className="flex flex-wrap gap-2">
                    {availableCollections.map((col) => (
                      <button
                        type="button"
                        key={col}
                        onClick={() => setActiveCollection(col)}
                        className={`py-2 px-4 rounded-xl text-xs font-semibold cursor-pointer border transition-all ${
                          activeCollection === col ? "bg-neutral-900 text-white border-neutral-900 shadow-xs" : "bg-neutral-50 text-neutral-600 border-neutral-200 hover:border-neutral-400"
                        }`}
                      >
                        {col}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Product Variants Configuration Card */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200 shadow-2xs space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-400">3. Variants Configuration Matrix</h2>
                  <p className="text-xs text-neutral-500 mt-0.5">Manage distinct SKUs, sizes, colors, and tier pricing.</p>
                </div>
                <button
                  type="button"
                  onClick={addVariantRow}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-neutral-100 text-neutral-900 hover:bg-neutral-200 transition-colors cursor-pointer"
                >
                  + Add Variant
                </button>
              </div>

              <div className="space-y-4">
                {variants.map((variant, index) => (
                  <div key={index} className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-3 relative group">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-neutral-500 mb-1">SKU Code</label>
                        <input
                          type="text"
                          value={variant.sku}
                          onChange={(e) => handleVariantChange(index, "sku", e.target.value)}
                          placeholder="HEMP-SH-01"
                          required
                          className="w-full py-1.5 px-3 rounded-lg text-xs bg-white border border-neutral-200 font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-neutral-500 mb-1">Size</label>
                        <input
                          type="text"
                          value={variant.size}
                          onChange={(e) => handleVariantChange(index, "size", e.target.value)}
                          placeholder="S, M, L, XL"
                          className="w-full py-1.5 px-3 rounded-lg text-xs bg-white border border-neutral-200 font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-neutral-500 mb-1">Color Style</label>
                        <input
                          type="text"
                          value={variant.color}
                          onChange={(e) => handleVariantChange(index, "color", e.target.value)}
                          placeholder="Natural / Sage"
                          className="w-full py-1.5 px-3 rounded-lg text-xs bg-white border border-neutral-200 font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-neutral-500 mb-1">Stock Count</label>
                        <input
                          type="number"
                          min="0"
                          value={variant.stock}
                          onChange={(e) => handleVariantChange(index, "stock", Number(e.target.value))}
                          className="w-full py-1.5 px-3 rounded-lg text-xs bg-white border border-neutral-200 font-medium"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-neutral-200/60">
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-neutral-500 mb-1">Selling Price ($)</label>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={variant.price}
                          onChange={(e) => handleVariantChange(index, "price", Number(e.target.value))}
                          placeholder="49.99"
                          required
                          className="w-full py-1.5 px-3 rounded-lg text-xs bg-white border border-neutral-200 font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-neutral-500 mb-1">Compare Price ($)</label>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={variant.compare_at_price}
                          onChange={(e) => handleVariantChange(index, "compare_at_price", Number(e.target.value))}
                          placeholder="69.99"
                          className="w-full py-1.5 px-3 rounded-lg text-xs bg-white border border-neutral-200 font-medium"
                        />
                      </div>
                      <div className="flex items-end justify-between">
                        <div className="w-full">
                          <label className="block text-[10px] font-bold uppercase text-neutral-500 mb-1">Variant Image URL</label>
                          <input
                            type="text"
                            value={variant.image}
                            onChange={(e) => handleVariantChange(index, "image", e.target.value)}
                            placeholder="Optional asset link"
                            className="w-full py-1.5 px-3 rounded-lg text-xs bg-white border border-neutral-200 font-medium"
                          />
                        </div>
                        {variants.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeVariantRow(index)}
                            className="ml-2 mb-0.5 p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                            title="Remove Variant"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Media Asset Dropzone & Gallery Management */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200 shadow-2xs flex flex-col items-center">
              <div className="w-full flex items-center justify-between mb-4">
                <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-400">4. Media Gallery</h2>
                <span className="text-xs text-neutral-500">{images.length} Attached</span>
              </div>

              {/* Dropzone Upload Box */}
              <div
                {...getRootProps()}
                className={`relative w-full h-[240px] rounded-2xl border-2 border-dashed transition-all duration-300 bg-neutral-50 flex flex-col items-center justify-center cursor-pointer overflow-hidden group ${
                  isDragActive ? "border-neutral-900 bg-neutral-100" : "border-neutral-300 hover:border-neutral-900"
                }`}
              >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center text-neutral-400 group-hover:text-neutral-600 transition-colors p-6 text-center">
                  <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-neutral-200 flex items-center justify-center mb-3 text-neutral-700">
                    <svg className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  </div>
                  <span className="text-xs font-semibold text-neutral-800">Drop asset or click to add</span>
                  <span className="text-[10px] text-neutral-400 mt-1">PNG, JPG, WEBP formats</span>
                </div>
              </div>

              {/* Uploaded Gallery Grid Preview */}
              {images.length > 0 && (
                <div className="w-full mt-6 grid grid-cols-3 gap-2">
                  {images.map((imgSrc, idx) => (
                    <div key={idx} className="relative group aspect-square rounded-xl overflow-hidden border border-neutral-200 bg-neutral-100">
                      <img src={imgSrc} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeImageFromGallery(idx)}
                        className="absolute top-1 right-1 bg-neutral-950/70 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Schema Payload Summary Info */}
            <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-2xs space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Schema Route Ready</h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                This form payload maps direct fields into your denormalized product table model optimized for instantaneous faceted filter queries and sub-variant stock tracking.
              </p>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}