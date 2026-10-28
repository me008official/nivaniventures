"use client";
import LoadingScreen from "@/component/home/LoadingScreen";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useCallback, useState } from "react";
import axios from "axios";
import { IoMdCheckmark } from "react-icons/io";
import { useDropzone } from "react-dropzone";

const DEFAULT_VENTURES = [
  {
    service_id: "default-1",
    label: "Eco Tourism",
    title: "Eco Tourism",
    description:
      "That Nivini is deeply rooted in its local Himalayan ecosystem, promoting mindful travel rather than mass tourism.",
    bgImage: "/landing-src/pexels-basnetsurendra7-10753291.jpg",
    cards: [
      {
        id: 1,
        src: "/landing-src/pexels-aj-negi0004-20052370.jpg",
        alt: "Himalayan Trekking",
      },
      {
        id: 2,
        src: "/landing-src/pexels-anuj-yadav-34803963-8735480.jpg",
        alt: "Nature Photography",
      },
      {
        id: 3,
        src: "/landing-src/pexels-yogendras31-31947312.jpg",
        alt: "Sustainable Transport",
      },
    ],
  },
];

// Reusable Dropzone Component
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

export default function Services() {
  const queryClient = useQueryClient();
  const [successMessage, setSuccessMessage] = useState("");
  const [ventures, setVentures] = useState(DEFAULT_VENTURES);
  const [activeTabId, setActiveTabId] = useState(DEFAULT_VENTURES[0].service_id);

  const { isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const res = await axios.get("/api/v1/admin/website/services");
      const responseData = res.data?.data ?? [];

      if (Array.isArray(responseData) && responseData.length > 0) {
        setVentures(responseData);
        setActiveTabId((prev) =>
          responseData.some((v) => v.service_id === prev) ? prev : responseData[0].service_id,
        );
      }
      return responseData;
    },
  });

  const activeVenture =
    ventures?.find((v) => v.service_id === activeTabId) ||
    ventures?.[0] ||
    DEFAULT_VENTURES[0];

  const handleFieldChange = (field, value) => {
    setVentures((prev) =>
      prev.map((item) =>
        item.service_id === activeTabId ? { ...item, [field]: value } : item,
      ),
    );
  };

  const handleCardIndexChange = (cardIndex, field, value) => {
    setVentures((prev) =>
      prev.map((item) => {
        if (item.service_id !== activeTabId) return item;
        const updatedCards = [...item.cards];
        updatedCards[cardIndex] = {
          ...updatedCards[cardIndex],
          [field]: value,
        };
        return { ...item, cards: updatedCards };
      }),
    );
  };

  const mutation = useMutation({
    mutationFn: async (updatedVentures) => {
      const res = await axios.put("/api/v1/admin/website/services", {
        ventures: updatedVentures,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      setSuccessMessage("Services content updated successfully!");
      setTimeout(() => setSuccessMessage(""), 3500);
    },
    onError: (error) => {
      alert("Failed to save: " + error.message);
    },
  });

  const handleSave = () => {
    mutation.mutate(ventures);
  };

  if (isLoading && !ventures) return <LoadingScreen />;

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-neutral-200 shadow-2xs">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
            Website Customization
          </span>
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-neutral-900 mt-1">
            Manage Services & Ventures Section 🚀
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Edit text content, background headers, and overlapping sub-card
            images shown on the landing page.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={mutation.isPending}
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-neutral-900 text-white hover:bg-neutral-800 transition-all shadow-sm cursor-pointer shrink-0 disabled:opacity-50"
        >
          <IoMdCheckmark className="text-sm" />
          {mutation.isPending ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {successMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2">
          <IoMdCheckmark className="text-base" /> {successMessage}
        </div>
      )}

      <div className="flex items-center gap-2 overflow-x-auto bg-white p-3 rounded-2xl border border-neutral-200 shadow-2xs">
        {ventures?.map((venture) => (
          <button
            key={venture.service_id}
            onClick={() => setActiveTabId(venture.service_id)}
            className={`cursor-pointer px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeTabId === venture.service_id
                ? "bg-neutral-900 text-white shadow-xs"
                : "bg-neutral-50 text-neutral-600 hover:bg-neutral-100 border border-neutral-200"
            }`}
          >
            {venture.label}
          </button>
        ))}
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200 shadow-2xs space-y-6">
        <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 border-b border-neutral-100 pb-3">
          Editing:{" "}
          <span className="text-neutral-900 font-semibold">
            {activeVenture?.label}
          </span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-700">
              Venture Title / Label
            </label>
            <input
              type="text"
              value={activeVenture?.title || ""}
              onChange={(e) => {
                handleFieldChange("title", e.target.value);
                handleFieldChange("label", e.target.value);
              }}
              className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-700">
              Background Image
            </label>
            <ImageDropzone
              value={activeVenture?.bgImage}
              onChange={(url) => handleFieldChange("bgImage", url)}
              placeholder="Drag & drop background image here"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-neutral-700">
            Venture Description
          </label>
          <textarea
            rows={3}
            value={activeVenture?.description || ""}
            onChange={(e) => handleFieldChange("description", e.target.value)}
            className="w-full p-4 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 transition-all leading-relaxed"
          />
        </div>

        <div className="pt-4 border-t border-neutral-100 space-y-4">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              Floating Sub-Cards (3 Grid Items)
            </h4>
            <p className="text-xs text-neutral-400 mt-0.5">
              Modify the images and caption text for the overlapping bottom
              cards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {activeVenture?.cards?.map((card, index) => (
              <div
                key={card.service_id || card.id || index}
                className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase text-neutral-400">
                    Card Item #{index + 1}
                  </span>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-neutral-600">
                    Caption Title (alt)
                  </label>
                  <input
                    type="text"
                    value={card.alt || ""}
                    onChange={(e) =>
                      handleCardIndexChange(index, "alt", e.target.value)
                    }
                    className="w-full px-3 py-2 bg-white border border-neutral-200 rounded-lg text-xs text-neutral-900 focus:outline-none focus:border-neutral-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-neutral-600">
                    Card Image Upload
                  </label>
                  <ImageDropzone
                    value={card.src}
                    onChange={(url) => handleCardIndexChange(index, "src", url)}
                    placeholder="Drag & drop card image"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}