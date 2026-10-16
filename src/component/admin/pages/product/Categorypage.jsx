"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { 
  IoMdAdd, 
  IoMdCheckmark, 
  IoMdTrash, 
  IoMdLayers, 
  IoMdAlert 
} from "react-icons/io";

export default function Categorypage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Form State matching your Mongoose schema
  const [formData, setFormData] = useState({
    main_category: "Hemp",
    item_category: "",
    genders: ["Male", "Female"],
    collections: ["Shirt", "T-Shirt"],
    is_active: true,
  });

  // Temporary inputs for array values management
  const [tempGender, setTempGender] = useState("");
  const [tempCollection, setTempCollection] = useState("");

  // Fetch categories on mount
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/v1/admin/product/category?type=view");
      const result = await res.data
      console.log(result)
      if (result.success) {
        setCategories(result.data);
      }
    } catch (err) {
      console.error("Failed to load categories:", err);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(()=>{
  //   fetchCategories()
  // },[])
  const {data} = useQuery({
    queryKey: ["category"],
    queryFn:fetchCategories,
  })
  // Handlers for dynamic array inputs
  const addGenderTag = () => {
    if (tempGender && !formData.genders.includes(tempGender)) {
      setFormData({ ...formData, genders: [...formData.genders, tempGender] });
      setTempGender("");
    }
  };

  const removeGenderTag = (tag) => {
    setFormData({ ...formData, genders: formData.genders.filter(g => g !== tag) });
  };

  const addCollectionTag = () => {
    if (tempCollection && !formData.collections.includes(tempCollection)) {
      setFormData({ ...formData, collections: [...formData.collections, tempCollection] });
      setTempCollection("");
    }
  };

  const removeCollectionTag = (tag) => {
    setFormData({ ...formData, collections: formData.collections.filter(c => c !== tag) });
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!formData.item_category.trim()) {
      setErrorMsg("Item category name is required.");
      return;
    }

    try {
      setSubmitting(true);
      const res = await axios.post("/api/v1/admin/product/category", formData);

      if (res.status >= 400) {
        throw new Error(res.data?.error || "Failed to create category");
      }

      setSuccessMsg("Category created successfully!");
      setFormData({
        main_category: "Hemp",
        item_category: "",
        genders: ["Male", "Female"],
        collections: ["Shirt", "T-Shirt"],
        is_active: true,
      });
      fetchCategories(); // Refresh list
    } catch (err) {
      setErrorMsg(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 font-sans">
      
      {/* Header Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200 shadow-2xs">
        <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Database Structure</span>
        <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-neutral-900 mt-1">
          Category Manager 🗂️
        </h1>
        <p className="text-xs text-neutral-500 mt-1">
          Create and manage primary product classifications, targeted genders, and active collection arrays.
        </p>
      </div>

      {/* Grid Layout: Add Form & Existing Categories List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Add Category Form (Span 5) */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200 shadow-2xs">
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 border-b border-neutral-100 pb-3 mb-5">
            Add New Category Schema
          </h3>

          {errorMsg && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
              <IoMdAlert className="text-base shrink-0" /> {errorMsg}
            </div>
          )}

          {successMsg && (
            <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-xl flex items-center gap-2">
              <IoMdCheckmark className="text-base shrink-0" /> {successMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Main Category Enum Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-700">Main Category (Enum)</label>
              <select
                value={formData.main_category}
                onChange={(e) => setFormData({ ...formData, main_category: e.target.value })}
                className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 transition-all cursor-pointer"
              >
                <option value="Hemp">Hemp</option>
                <option value="Bamboo">Bamboo</option>
                <option value="Organic">Organic</option>
                <option value="Traditional">Traditional</option>
              </select>
            </div>

            {/* Item Category Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-700">Item Category Name</label>
              <input
                type="text"
                placeholder="e.g., Cloth, Caps & Hat, Footwear"
                value={formData.item_category}
                onChange={(e) => setFormData({ ...formData, item_category: e.target.value })}
                className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 transition-all"
              />
            </div>

            {/* Genders Array Builder */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-700">Target Genders Array</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. Male, Female, Kids"
                  value={tempGender}
                  onChange={(e) => setTempGender(e.target.value)}
                  className="flex-1 px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={addGenderTag}
                  className="px-3 py-2 bg-neutral-900 text-white rounded-xl text-xs font-semibold hover:bg-neutral-800 cursor-pointer"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {formData.genders.map((g, i) => (
                  <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 bg-neutral-100 rounded-lg text-[11px] font-medium text-neutral-800">
                    {g}
                    <button type="button" onClick={() => removeGenderTag(g)} className="text-neutral-400 hover:text-red-500">×</button>
                  </span>
                ))}
              </div>
            </div>

            {/* Collections Array Builder */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-700">Collections Array</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. Shirt, Jacket, Pants"
                  value={tempCollection}
                  onChange={(e) => setTempCollection(e.target.value)}
                  className="flex-1 px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={addCollectionTag}
                  className="px-3 py-2 bg-neutral-900 text-white rounded-xl text-xs font-semibold hover:bg-neutral-800 cursor-pointer"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {formData.collections.map((c, i) => (
                  <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 bg-neutral-100 rounded-lg text-[11px] font-medium text-neutral-800">
                    {c}
                    <button type="button" onClick={() => removeCollectionTag(c)} className="text-neutral-400 hover:text-red-500">×</button>
                  </span>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-semibold bg-neutral-900 text-white hover:bg-neutral-800 transition-all shadow-sm cursor-pointer disabled:opacity-50"
            >
              <IoMdAdd className="text-sm" />
              {submitting ? "Saving Category..." : "Save Category Record"}
            </button>

          </form>
        </div>

        {/* Existing Categories List Table (Span 7) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200 shadow-2xs space-y-6">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                Already Available Categories
              </h3>
              <p className="text-xs text-neutral-400 mt-0.5">Fetched live from MongoDB database collections.</p>
            </div>
            <span className="text-xs font-mono bg-neutral-100 px-2.5 py-1 rounded-md text-neutral-600">
              {categories.length} Total
            </span>
          </div>

          {loading ? (
            <div className="py-12 text-center text-xs text-neutral-400">Loading categories from database...</div>
          ) : categories.length > 0 ? (
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
              {categories.map((cat) => (
                <div key={cat._id} className="p-4 rounded-xl border border-neutral-200 bg-neutral-50/50 space-y-3 hover:border-neutral-300 transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 bg-neutral-900 text-white text-[10px] font-semibold rounded-md">
                        {cat.main_category}
                      </span>
                      <h4 className="font-bold text-neutral-900 text-sm">{cat.item_category}</h4>
                    </div>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${cat.is_active ? "bg-emerald-50 text-emerald-700" : "bg-neutral-200 text-neutral-600"}`}>
                      {cat.is_active ? "Active" : "Inactive"}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-2 border-t border-neutral-200/60">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">Genders:</span>
                      <div className="flex flex-wrap gap-1">
                        {cat.genders?.map((g, idx) => (
                          <span key={idx} className="px-2 py-0.5 bg-white border border-neutral-200 rounded text-[10px] text-neutral-700">{g}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">Collections:</span>
                      <div className="flex flex-wrap gap-1">
                        {cat.collections?.map((c, idx) => (
                          <span key={idx} className="px-2 py-0.5 bg-white border border-neutral-200 rounded text-[10px] text-neutral-700">{c}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-16 text-center text-xs text-neutral-400">
              No category records found in the database. Use the form to add one.
            </div>
          )}
        </div>

      </div>

    </div>
  );
}