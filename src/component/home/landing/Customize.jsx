"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Comprehensive logical mapping database
const DATABASE = {
  Hemp: {
    itemCategories: {
      Cloth: {
        genders: ["Male", "Female"],
        collections: ["Shirt", "T-Shirt", "Pants", "Kurtas", "Jackets"],
      },
      "Caps & Hat": {
        genders: ["Unisex"],
        collections: ["Caps", "Hats"],
      },
      "Bag's": {
        genders: ["Unisex"],
        collections: ["Tote Bags", "Backpacks", "Duffel Bags"],
      },
      "Home Accessories": {
        genders: [], // No gender needed for home items
        collections: ["Curtains", "Cushion Covers", "Table Runners"],
      },
    },
  },
  Bamboo: {
    itemCategories: {
      Cloth: {
        genders: ["Male", "Female"],
        collections: ["T-Shirt", "Pants", "Loungewear"],
      },
      "Caps & Hat": {
        genders: ["Unisex"],
        collections: ["Soft Caps"],
      },
      "Home Accessories": {
        genders: [],
        collections: ["Bed Sheets", "Towels"],
      },
    },
  },
  Organic: {
    itemCategories: {
      Cloth: {
        genders: ["Male", "Female", "Kids"],
        collections: ["Organic Shirt", "Baby Rompers", "T-Shirt"],
      },
      "Bag's": {
        genders: ["Unisex"],
        collections: ["Cotton Tote"],
      },
    },
  },
  Traditional: {
    itemCategories: {
      Cloth: {
        genders: ["Male", "Female"],
        collections: ["Nepali Suruwal", "Ethnic Kurtas", "Traditional Jackets"],
      },
      "Caps & Hat": {
        genders: ["Unisex"],
        collections: ["Himalayan Topi"],
      },
    },
  },
};

export default function Customize() {
  const sectionRef = useRef(null);

  // Main Top Mode
  const [activeMainTab, setActiveMainTab] = useState(1);

  // Filter States
  const [activeCategory, setActiveCategory] = useState("Hemp");
  const [activeItemCategory, setActiveItemCategory] = useState("Cloth");
  const [activeGender, setActiveGender] = useState("Male");
  const [activeCollection, setActiveCollection] = useState("Shirt");
  const [quantity, setQuantity] = useState(500);
  const [uploadedImage, setUploadedImage] = useState(null);

  // Available options based on logic tree
  const categories = Object.keys(DATABASE);
  const availableItemCategories = Object.keys(DATABASE[activeCategory]?.itemCategories || {});
  const currentItemData = DATABASE[activeCategory]?.itemCategories[activeItemCategory] || {};
  const availableGenders = currentItemData.genders || [];
  const availableCollections = currentItemData.collections || [];

  // Handle Category Change -> Reset child filters to valid defaults
  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    const firstItemCat = Object.keys(DATABASE[cat].itemCategories)[0];
    setActiveItemCategory(firstItemCat);
    
    const firstItemData = DATABASE[cat].itemCategories[firstItemCat];
    setActiveGender(firstItemData.genders?.[0] || "");
    setActiveCollection(firstItemData.collections?.[0] || "");
  };

  // Handle Item Category Change -> Reset gender & collection safely
  const handleItemCategoryChange = (itemCat) => {
    setActiveItemCategory(itemCat);
    const itemData = DATABASE[activeCategory].itemCategories[itemCat];
    setActiveGender(itemData.genders?.[0] || "");
    setActiveCollection(itemData.collections?.[0] || "");
  };

  // GSAP entrance animation
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedImage(URL.createObjectURL(file));
    }
  };

  return (
    <section ref={sectionRef} className="w-full py-16 px-4 md:px-12 bg-white text-neutral-900">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Header */}
        <div className="text-center max-w-xl mb-8">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">
            <span className="playwrite-text text-neutral-900">Customization</span> & Bulk
          </h2>
          <p className="text-sm md:text-base text-emerald-800/80 font-medium leading-relaxed">
            We give you more Feature to use for make own product and Bulk Order
          </p>
        </div>

        {/* Top Mode Switcher */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {[
            { id: 1, label: "Customize Your Choice" },
            { id: 2, label: "Learn Bulk order" },
            { id: 3, label: "Request Custom Quotation" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveMainTab(tab.id)}
              className={`py-2.5 px-6 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer border ${
                activeMainTab === tab.id
                  ? "bg-black text-white border-black shadow-md scale-105"
                  : "bg-white text-neutral-800 border-neutral-300 hover:border-black"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeMainTab === 1 ? (
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* LEFT SIDE: Dynamic Filters & Order Control */}
            <div className="lg:col-span-7 flex flex-col gap-8">
              
              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-neutral-800 mb-3">Category</label>
                <div className="flex flex-wrap gap-2.5">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleCategoryChange(cat)}
                      className={`py-2 px-5 rounded-full text-sm font-medium transition-all cursor-pointer border ${
                        activeCategory === cat
                          ? "bg-black text-white border-black shadow"
                          : "bg-white text-neutral-700 border-neutral-200 hover:border-black"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Item Category */}
              <div>
                <label className="block text-sm font-semibold text-neutral-800 mb-3">Item Category</label>
                <div className="flex flex-wrap gap-2.5">
                  {availableItemCategories.map((item) => (
                    <button
                      key={item}
                      onClick={() => handleItemCategoryChange(item)}
                      className={`py-2 px-5 rounded-full text-sm font-medium transition-all cursor-pointer border ${
                        activeItemCategory === item
                          ? "bg-black text-white border-black shadow"
                          : "bg-white text-neutral-700 border-neutral-200 hover:border-black"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Gender (Conditionally Rendered: Hidden if item category doesn't require gender like home accessories) */}
              {availableGenders.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <label className="block text-sm font-semibold text-neutral-800 mb-3">Gender</label>
                  <div className="flex flex-wrap gap-2.5">
                    {availableGenders.map((g) => (
                      <button
                        key={g}
                        onClick={() => setActiveGender(g)}
                        className={`py-2 px-5 rounded-full text-sm font-medium transition-all cursor-pointer border ${
                          activeGender === g
                            ? "bg-black text-white border-black shadow"
                            : "bg-white text-neutral-700 border-neutral-200 hover:border-black"
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Collection (Conditionally Rendered based on available items) */}
              {availableCollections.length > 0 && (
                <div>
                  <label className="block text-sm font-semibold text-neutral-800 mb-3">Collection</label>
                  <div className="flex flex-wrap gap-2.5">
                    {availableCollections.map((col) => (
                      <button
                        key={col}
                        onClick={() => setActiveCollection(col)}
                        className={`py-2 px-5 rounded-full text-sm font-medium transition-all cursor-pointer border ${
                          activeCollection === col
                            ? "bg-black text-white border-black shadow"
                            : "bg-white text-neutral-700 border-neutral-200 hover:border-black"
                        }`}
                      >
                        {col}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Order Quantity & Submit */}
              <div className="pt-4 border-t border-neutral-100 flex flex-wrap items-center gap-6">
                <div>
                  <label className="block text-sm font-semibold text-neutral-800 mb-2">Order Quantity</label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-36 py-2.5 px-4 rounded-full border border-neutral-300 text-center text-emerald-800 font-medium focus:outline-black"
                  />
                </div>
                <div className="self-end">
                  <button className="bg-black text-white py-3 px-8 rounded-full font-medium text-sm hover:bg-neutral-800 transition-colors cursor-pointer shadow-md">
                    Order Now
                  </button>
                </div>
              </div>

            </div>

            {/* RIGHT SIDE: Interactive Drag & Drop / Image Upload Box */}
            <div className="lg:col-span-5 flex justify-center">
              <label className="relative w-full max-w-[420px] h-[420px] rounded-[36px] border-2 border-dashed border-neutral-300 hover:border-black transition-colors bg-neutral-50 flex flex-col items-center justify-center cursor-pointer overflow-hidden group shadow-sm">
                
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer z-10"
                  onChange={handleImageUpload}
                />

                {uploadedImage ? (
                  <div className="absolute inset-0 w-full h-full">
                    <img src={uploadedImage} alt="Uploaded Design" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-sm font-medium">
                      Click or Drop to Change Image
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-neutral-400 group-hover:text-neutral-600 transition-colors p-6 text-center">
                    <svg
                      className="w-12 h-12 mb-3 stroke-current"
                      fill="none"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-sm font-medium">
                      Drag & Drop or Click To Upload Your Image
                    </span>
                  </div>
                )}

              </label>
            </div>

          </div>
        ) : activeMainTab === 2 ? (
          <div className="w-full max-w-3xl text-center py-12 bg-neutral-50 rounded-3xl border border-neutral-200">
            <h3 className="text-2xl font-bold mb-4">Learn About Bulk Orders</h3>
            <p className="text-neutral-600 text-sm md:text-base leading-relaxed px-6">
              We provide streamlined manufacturing and high-volume customization pipelines for sustainable hemp, bamboo, and eco-friendly garments. Contact our supply team to scale your inventory effortlessly.
            </p>
          </div>
        ) : (
          <div className="w-full max-w-xl bg-neutral-50 p-8 rounded-3xl border border-neutral-200 shadow-sm">
            <h3 className="text-xl font-bold mb-6 text-center">Request Custom Quotation</h3>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Your Full Name"
                className="w-full py-3 px-4 rounded-xl border border-neutral-300 text-sm focus:outline-black bg-white"
                required
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full py-3 px-4 rounded-xl border border-neutral-300 text-sm focus:outline-black bg-white"
                required
              />
              <textarea
                placeholder="Describe your custom requirements..."
                rows={4}
                className="w-full py-3 px-4 rounded-xl border border-neutral-300 text-sm focus:outline-black bg-white resize-none"
                required
              ></textarea>
              <button
                type="submit"
                className="w-full py-3 bg-black text-white rounded-full font-medium text-sm hover:bg-neutral-800 transition-colors cursor-pointer mt-2"
              >
                Submit Quotation Request
              </button>
            </form>
          </div>
        )}

      </div>
    </section>
  );
}