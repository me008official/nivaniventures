"use client";
import LoadingScreen from "@/component/home/LoadingScreen";
import { useQuery } from "@tanstack/react-query";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import {
  IoMdAdd,
  IoMdTrash,
  IoMdCreate,
  IoMdCheckmark,
  IoMdClose,
  IoMdImage,
} from "react-icons/io";
import { useDropzone } from "react-dropzone";

// Initial material dataset mirroring your showcase structure
const INITIAL_MATERIALS = [
  {
    id: "hemp",
    _id: "hemp",
    label: "Hemp",
    labelContent: "Hemp Fabric (NIVINI Hemp)",
    labelDesc:
      "Golden Fiber hemp is one of the strongest, most durable, and eco-friendly natural textiles on earth",
    sections: [
      {
        id: "durability",
        label: "Durability & Strength",
        description:
          "Golden Fiber hemp is one of the strongest, most durable, and eco-friendly natural textiles on earth.",
        image: "/landing-src/hemp.avif",
      },
      {
        id: "breathability",
        label: "Breathability & Thermoregulation",
        description:
          "Highly breathable with natural micro-pores, keeping you cool in summer and warm in winter.",
        image: "/landing-src/hemp.avif",
      },
      {
        id: "eco",
        label: "Eco-Footprint",
        description:
          "Requires minimal water to grow and naturally replenishes the soil, making it a zero-waste powerhouse.",
        image: "/landing-src/hemp.avif",
      },
    ],
  },
  {
    id: "bamboo",
    _id: "bamboo",
    label: "Bamboo",
    labelContent: "Bamboo Fabric (NIVINI Bamboo)",
    labelDesc:
      "Bamboo fibers possess a cashmere-like smooth texture that feels luxurious against sensitive skin.",
    sections: [
      {
        id: "softness",
        label: "Natural Softness",
        description:
          "Bamboo fibers possess a cashmere-like smooth texture that feels luxurious against sensitive skin.",
        image: "/landing-src/hemp.avif",
      },
      {
        id: "wicking",
        label: "Moisture Wicking",
        description:
          "Pulls moisture away from the body efficiently, ensuring absolute dryness and comfort.",
        image: "/landing-src/hemp.avif",
      },
    ],
  },
  {
    id: "organic-cotton",
    _id: "organic-cotton",
    label: "Organic Cotton",
    labelContent: "Organic Cotton Fabric (NIVINI Cotton)",
    labelDesc:
      "Grown without harmful synthetic pesticides or fertilizers, protecting biodiversity.",
    sections: [
      {
        id: "purity",
        label: "Chemical-Free Purity",
        description:
          "Grown without harmful synthetic pesticides or fertilizers, protecting both ecosystem biodiversity.",
        image: "/landing-src/hemp.avif",
      },
    ],
  },
  {
    id: "nepali-suruwal",
    _id: "nepali-suruwal",
    label: "Nepali Suruwal",
    labelContent: "Nepali Traditional Suruwal (NIVINI Traditional)",
    labelDesc:
      "Crafted using indigenous traditional handloom techniques passed down through generations.",
    sections: [
      {
        id: "heritage",
        label: "Heritage Weave",
        description:
          "Crafted using indigenous traditional handloom techniques passed down through Himalayan generations.",
        image: "/landing-src/hemp.avif",
      },
    ],
  },
];

// Reusable Dropzone Component placed outside the main component
function ImageDropzone({ value, onChange, placeholder }) {
  const onDrop = useCallback(
    async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);

      try {
        const uploadRes = await axios.post("/api/v1/admin/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        onChange(uploadRes.data.url);
      } catch (err) {
        const localUrl = URL.createObjectURL(file);
        onChange(localUrl);
      }
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-xl p-2.5 text-center cursor-pointer transition-all ${
        isDragActive
          ? "border-neutral-900 bg-neutral-50"
          : "border-neutral-200 hover:border-neutral-400 bg-white"
      }`}
    >
      <input {...getInputProps()} />
      <p className="text-[11px] font-semibold text-neutral-700 truncate">
        {isDragActive
          ? "Drop the image here..."
          : value
          ? `Current: ${value.split("/").pop()}`
          : placeholder}
      </p>
    </div>
  );
}

export default function Quality() {
  const [materials, setMaterials] = useState(INITIAL_MATERIALS);
  const [activeMaterialId, setActiveMaterialId] = useState(
    INITIAL_MATERIALS[0]._id
  );
  const [isSaving, setIsSaving] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["quality"],
    queryFn: async () => {
      const res = await axios.get("/api/v1/admin/website/quality");
      return res.data.data;
    },
  });

  useEffect(() => {
    if (data) {
      const formattedData = Array.isArray(data) ? data : [data];
      if (formattedData.length > 0 && formattedData[0].label) {
        setMaterials(formattedData);
        setActiveMaterialId(formattedData[0]._id || formattedData[0].id);
      }
    }
  }, [data]);

  // Modal states for editing material metadata or sections
  const [isEditMaterialModalOpen, setIsEditMaterialModalOpen] = useState(false);
  const [materialFormData, setMaterialFormData] = useState({
    label: "",
    labelContent: "",
    labelDesc: "",
  });

  const [isSectionModalOpen, setIsSectionModalOpen] = useState(false);
  const [editingSectionIndex, setEditingSectionIndex] = useState(null);
  const [sectionFormData, setSectionFormData] = useState({
    label: "",
    description: "",
    image: "",
  });

  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const currentMaterial =
    materials.find((m) => (m._id || m.id) === activeMaterialId) || materials[0];

  const handleOpenEditMaterial = () => {
    setMaterialFormData({
      label: currentMaterial.label,
      labelContent: currentMaterial.labelContent,
      labelDesc: currentMaterial.labelDesc,
    });
    setIsEditMaterialModalOpen(true);
  };

  const handleSaveMaterial = (e) => {
    e.preventDefault();
    setMaterials(
      materials.map((m) => {
        if ((m._id || m.id) === activeMaterialId) {
          return {
            ...m,
            label: materialFormData.label,
            labelContent: materialFormData.labelContent,
            labelDesc: materialFormData.labelDesc,
          };
        }
        return m;
      })
    );
    setIsEditMaterialModalOpen(false);
    showToast("Material header information updated successfully!");
  };

  const handleOpenAddSection = () => {
    setEditingSectionIndex(null);
    setSectionFormData({
      label: "",
      description: "",
      image: "/landing-src/hemp.avif",
    });
    setIsSectionModalOpen(true);
  };

  const handleOpenEditSection = (index) => {
    setEditingSectionIndex(index);
    const sec = currentMaterial.sections[index];
    setSectionFormData({
      label: sec.label,
      description: sec.description,
      image: sec.image,
    });
    setIsSectionModalOpen(true);
  };

  const handleSaveSection = (e) => {
    e.preventDefault();
    const updatedSections = [...(currentMaterial.sections || [])];
    const newSectionId = sectionFormData.label
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-");

    if (editingSectionIndex !== null) {
      updatedSections[editingSectionIndex] = {
        ...updatedSections[editingSectionIndex],
        label: sectionFormData.label,
        description: sectionFormData.description,
        image: sectionFormData.image,
      };
    } else {
      updatedSections.push({
        id: newSectionId,
        label: sectionFormData.label,
        description: sectionFormData.description,
        image: sectionFormData.image,
      });
    }

    setMaterials(
      materials.map((m) => {
        if ((m._id || m.id) === activeMaterialId) {
          return { ...m, sections: updatedSections };
        }
        return m;
      })
    );

    setIsSectionModalOpen(false);
    showToast(
      editingSectionIndex !== null
        ? "Section updated successfully!"
        : "New quality section added!"
    );
  };

  const handleDeleteSection = (index) => {
    if (currentMaterial.sections.length <= 1) {
      showToast("Error: Each material must have at least one feature section.");
      return;
    }
    const updatedSections = currentMaterial.sections.filter(
      (_, i) => i !== index
    );
    setMaterials(
      materials.map((m) => {
        if ((m._id || m.id) === activeMaterialId) {
          return { ...m, sections: updatedSections };
        }
        return m;
      })
    );
    showToast("Section removed.");
  };

  const handlePublishChanges = async () => {
    try {
      setIsSaving(true);
      await axios.put("/api/v1/admin/website/quality", currentMaterial);
      showToast("All structural changes synced with live showcase.");
    } catch (error) {
      showToast("Failed to sync changes with server.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading)
    return (
      <div className="min-h-screen text-neutral-900 font-sans relative">
        <LoadingScreen />
      </div>
    );

  return (
    <div className="space-y-8 font-sans mx-auto pb-20">
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-white px-5 py-3 rounded-2xl text-xs font-semibold shadow-xl flex items-center gap-2 animate-bounce">
          <IoMdCheckmark className="text-emerald-400 text-base" />
          {toastMessage}
        </div>
      )}

      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200 shadow-2xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
            Content Management System
          </span>
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-neutral-900 mt-1">
            Hero Quality & Material Showcase Manager
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Modify fabric features, descriptions, and multimedia content
            displayed dynamically on your landing hero.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handlePublishChanges}
            disabled={isSaving}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-neutral-900 text-white hover:bg-neutral-800 transition-all shadow-sm cursor-pointer disabled:opacity-50"
          >
            {isSaving ? "Publishing..." : "Publish Changes"}
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-3xl border border-neutral-200 shadow-2xs flex items-center justify-between overflow-x-auto gap-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 px-3 hidden md:inline-block">
            Select Material:
          </span>
          {materials.map((mat) => {
            const matKey = mat._id || mat.id;
            const isActive = matKey === activeMaterialId;
            return (
              <button
                key={matKey}
                onClick={() => setActiveMaterialId(matKey)}
                className={`cursor-pointer px-5 py-2.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-neutral-900 text-white shadow-xs"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                }`}
              >
                {mat.label}
              </button>
            );
          })}
        </div>
        <div className="text-xs font-mono text-neutral-400 px-3 hidden lg:block">
          ID: {currentMaterial.id || currentMaterial._id}
        </div>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200 shadow-2xs relative space-y-4">
        <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#779076]">
              Active Material Metadata
            </span>
            <h2 className="text-lg font-bold text-neutral-900 mt-0.5">
              {currentMaterial.labelContent}
            </h2>
          </div>
          <button
            onClick={handleOpenEditMaterial}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-neutral-100 hover:bg-neutral-200 text-neutral-800 transition-all cursor-pointer"
          >
            <IoMdCreate className="text-sm" />
            Edit Material Title & Desc
          </button>
        </div>

        <p className="text-xs text-[#779076] leading-relaxed max-w-2xl font-medium">
          {currentMaterial.labelDesc}
        </p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200 shadow-2xs space-y-6">
        <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              Hero Scroll Sections ({(currentMaterial.sections || []).length})
            </h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              Manage individual feature breakpoints for this material.
            </p>
          </div>
          <button
            onClick={handleOpenAddSection}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#779076] text-white hover:bg-[#637962] transition-all cursor-pointer shadow-xs"
          >
            <IoMdAdd className="text-sm" />
            Add New Section
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(currentMaterial.sections || []).map((section, index) => (
            <div
              key={section.id || index}
              className="p-5 rounded-2xl border border-neutral-200 bg-neutral-50/50 flex flex-col justify-between space-y-4 hover:border-neutral-300 transition-all"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono bg-neutral-200 text-neutral-700 px-2 py-0.5 rounded">
                    Step 0{index + 1}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEditSection(index)}
                      aria-label="Edit Section"
                      className="p-1.5 rounded-lg bg-white border border-neutral-200 hover:bg-neutral-100 text-neutral-700 transition-colors cursor-pointer"
                    >
                      <IoMdCreate className="text-xs" />
                    </button>
                    <button
                      onClick={() => handleDeleteSection(index)}
                      aria-label="Delete Section"
                      className="p-1.5 rounded-lg bg-white border border-red-200 hover:bg-red-50 text-red-600 transition-colors cursor-pointer"
                    >
                      <IoMdTrash className="text-xs" />
                    </button>
                  </div>
                </div>

                <h4 className="text-sm font-bold text-neutral-900">
                  {section.label}
                </h4>
                <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                  {section.description}
                </p>
              </div>

              <div className="pt-3 border-t border-neutral-200/60 flex items-center justify-between text-[11px] text-neutral-400">
                <span className="flex items-center gap-1 truncate">
                  <IoMdImage className="text-neutral-500 shrink-0" />{" "}
                  {section.image}
                </span>
                <span className="font-mono text-[10px] text-neutral-500">
                  ID: {section.id}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isEditMaterialModalOpen && (
        <div className="fixed inset-0 z-50 bg-neutral-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border border-neutral-200 space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
                Edit Material: {currentMaterial.label}
              </h3>
              <button
                onClick={() => setIsEditMaterialModalOpen(false)}
                className="p-2 rounded-full hover:bg-neutral-100 text-neutral-500 cursor-pointer"
              >
                <IoMdClose className="text-lg" />
              </button>
            </div>

            <form onSubmit={handleSaveMaterial} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Tab Button Label
                </label>
                <input
                  type="text"
                  required
                  value={materialFormData.label}
                  onChange={(e) =>
                    setMaterialFormData({
                      ...materialFormData,
                      label: e.target.value,
                    })
                  }
                  className="w-full border border-neutral-200 bg-neutral-50 px-4 py-2.5 rounded-xl text-xs font-medium focus:outline-neutral-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Heading Title (`labelContent`)
                </label>
                <input
                  type="text"
                  required
                  value={materialFormData.labelContent}
                  onChange={(e) =>
                    setMaterialFormData({
                      ...materialFormData,
                      labelContent: e.target.value,
                    })
                  }
                  className="w-full border border-neutral-200 bg-neutral-50 px-4 py-2.5 rounded-xl text-xs font-medium focus:outline-neutral-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Subtitle Description (`labelDesc`)
                </label>
                <textarea
                  rows={3}
                  required
                  value={materialFormData.labelDesc}
                  onChange={(e) =>
                    setMaterialFormData({
                      ...materialFormData,
                      labelDesc: e.target.value,
                    })
                  }
                  className="w-full border border-neutral-200 bg-neutral-50 px-4 py-2.5 rounded-xl text-xs font-medium focus:outline-neutral-900"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setIsEditMaterialModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-600 hover:bg-neutral-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-semibold bg-neutral-900 text-white hover:bg-neutral-800 cursor-pointer shadow-sm"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isSectionModalOpen && (
        <div className="fixed inset-0 z-50 bg-neutral-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border border-neutral-200 space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
                {editingSectionIndex !== null
                  ? "Edit Feature Section"
                  : "Add New Feature Section"}
              </h3>
              <button
                onClick={() => setIsSectionModalOpen(false)}
                className="p-2 rounded-full hover:bg-neutral-100 text-neutral-500 cursor-pointer"
              >
                <IoMdClose className="text-lg" />
              </button>
            </div>

            <form onSubmit={handleSaveSection} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Section Label / Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Thermal Regulation"
                  value={sectionFormData.label}
                  onChange={(e) =>
                    setSectionFormData({
                      ...sectionFormData,
                      label: e.target.value,
                    })
                  }
                  className="w-full border border-neutral-200 bg-neutral-50 px-4 py-2.5 rounded-xl text-xs font-medium focus:outline-neutral-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Detailed Description
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe the fabric property or quality..."
                  value={sectionFormData.description}
                  onChange={(e) =>
                    setSectionFormData({
                      ...sectionFormData,
                      description: e.target.value,
                    })
                  }
                  className="w-full border border-neutral-200 bg-neutral-50 px-4 py-2.5 rounded-xl text-xs font-medium focus:outline-neutral-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Image Asset Path
                </label>
                <ImageDropzone
                  value={sectionFormData.image}
                  onChange={(url) =>
                    setSectionFormData({ ...sectionFormData, image: url })
                  }
                  placeholder="Drag & drop feature image"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setIsSectionModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-600 hover:bg-neutral-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-semibold bg-[#779076] text-white hover:bg-[#637962] cursor-pointer shadow-sm"
                >
                  {editingSectionIndex !== null
                    ? "Update Section"
                    : "Create Section"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}