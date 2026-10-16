"use client";
import LoadingScreen from "@/component/home/LoadingScreen";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import React, { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function Hero() {
  const queryClient = useQueryClient();
  const [loading, setLoadin] = useState(false);

  // Initialized with realistic fallback data so the UI never renders blank
  const [heroData, setHeroData] = useState({
    heroBg: "/landing-src/hemp.avif",
    titles: [
      { id: 1, label: "First Section", content: "Wear" },
      { id: 2, label: "Second Section", content: "Nature" },
      { id: 3, label: "Third Section", content: "Create Better" },
      { id: 4, label: "Fourth Section", content: "Life Sustainably" },
    ],
    buttons: [
      {
        id: 1,
        label: "Button 1",
        btnName: "Explore Product",
        target: "",
        is_active: true,
      },
      {
        id: 2,
        label: "Button 2",
        btnName: "Customize Your Product",
        target: "",
        is_active: false,
      },
    ],
    cards: [
      {
        id: 1,
        label: "Cloths",
        title: "Eco Organic T-Shirt",
        price: "$45.00",
        feturesrc: "/landing-src/transparent-clothes.png",
      },
      {
        id: 2,
        label: "Bag's",
        title: "Nivini Mountain Backpack",
        price: "$89.00",
        feturesrc: "/landing-src/bambo-bag.png",
      },
      {
        id: 3,
        label: "Jacket",
        title: "Sustainable Winter Jacket",
        price: "$120.00",
        feturesrc: "/landing-src/transparent-clothes.png",
      },
    ],
  });

  // Fetch Hero Data from Database
  const { data, isLoading } = useQuery({
    queryKey: ["hero"],
    queryFn: async () => {
      const res = await axios.get("/api/v1/admin/website/hero");
      return res.data.data;
    },
  });

  // If database has data, override the fallback state
  useEffect(() => {
    if (data && data.titles && data.titles.length > 0) {
      setHeroData(data);
    }
  }, [data]);

  // Save / Upsert Mutation
  const saveMutation = useMutation({
    mutationFn: async (updatedData) => {
      const res = await axios.put("/api/v1/admin/website/hero", updatedData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["hero"]);
      alert("Hero component configurations successfully saved!");
    },
    onError: (err) => {
      alert("Failed to save: " + err.message);
    },
  });

  // Dropzone setup for Background Asset Upload (Fixed function & cleanup)
  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setLoadin(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const uploadRes = await axios.post("/api/v1/admin/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setHeroData((prev) => ({ ...prev, heroBg: uploadRes.data.url }));
    } catch (err) {
      // Fallback local preview URL if upload API isn't set up yet
      const localUrl = URL.createObjectURL(file);
      setHeroData((prev) => ({ ...prev, heroBg: localUrl }));
    } finally {
      setLoadin(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  const handleTitleChange = (index, newContent) => {
    const updatedTitles = [...heroData.titles];
    updatedTitles[index].content = newContent;
    setHeroData({ ...heroData, titles: updatedTitles });
  };

  const handleButtonToggle = (index) => {
    const updatedButtons = [...heroData.buttons];
    updatedButtons[index].is_active = !updatedButtons[index].is_active;
    setHeroData({ ...heroData, buttons: updatedButtons });
  };

  const handleButtonNameChange = (index, newName) => {
    const updatedButtons = [...heroData.buttons];
    updatedButtons[index].btnName = newName;
    setHeroData({ ...heroData, buttons: updatedButtons });
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    saveMutation.mutate(heroData);
  };

  if (isLoading)
    return (
      <div className="min-h-screen text-neutral-900 font-sans relative">
        <LoadingScreen />
      </div>
    );

  return (
    <div className="min-h-screen text-neutral-900 font-sans relative">
      {loading && <LoadingScreen isLoading={loading} />}
      <div className="mx-auto space-y-8">
        {/* Page Header */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-neutral-200 pb-6 gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 mt-1">
              Hero Section Customization
            </h1>
          </div>
          <button
            onClick={handleSaveChanges}
            disabled={saveMutation.isPending}
            className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-neutral-900 text-white hover:bg-neutral-800 transition-all shadow-sm cursor-pointer self-start sm:self-auto disabled:opacity-50"
          >
            {saveMutation.isPending ? "Saving..." : "Save Changes"}
          </button>
        </header>

        {/* Main Form Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Interactive Settings */}
          <div className="lg:col-span-8 space-y-6">
            {/* Section 1: Hero Titles */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200 shadow-2xs space-y-5">
              <div className="border-b border-neutral-100 pb-4">
                <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Hero Typography Sequence
                </h2>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Modify the core headline sequence phrases.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {heroData?.titles?.map((data, index) => (
                  <div
                    key={data.id || index}
                    className="bg-neutral-50 p-4 rounded-xl border border-neutral-200 space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-[11px] font-bold text-neutral-600">
                        {data.label}
                      </span>
                      <span className="text-[10px] text-neutral-400 font-mono">
                        #{data.id || index + 1}
                      </span>
                    </div>
                    <input
                      type="text"
                      value={data.content || ""}
                      onChange={(e) => handleTitleChange(index, e.target.value)}
                      className="w-full px-3 py-2 text-xs font-medium bg-white border border-neutral-200 rounded-lg focus:outline-neutral-900 transition-all"
                      placeholder="Enter phrase..."
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Section 2: Hero Call-to-Actions (CTA) */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200 shadow-2xs space-y-5">
              <div className="border-b border-neutral-100 pb-4">
                <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Action Triggers & Buttons
                </h2>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Manage button labels and toggle active view state.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {heroData?.buttons?.map((data, index) => (
                  <div
                    key={data.id || index}
                    className="bg-neutral-50 p-4 rounded-xl border border-neutral-200 space-y-3"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-[11px] font-bold text-neutral-600">
                        {data.label}
                      </span>
                      {/* Modern switch toggle */}
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={data.is_active ?? true}
                          onChange={() => handleButtonToggle(index)}
                          className="sr-only peer"
                        />
                        <div className="w-8 h-4 bg-neutral-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-neutral-900"></div>
                      </label>
                    </div>

                    <input
                      type="text"
                      value={data.btnName || ""}
                      onChange={(e) =>
                        handleButtonNameChange(index, e.target.value)
                      }
                      className="w-full px-3 py-2 text-xs font-medium bg-white border border-neutral-200 rounded-lg focus:outline-neutral-900 transition-all"
                      placeholder="Button text..."
                    />

                    <div className="flex items-center justify-between text-[10px] text-neutral-400 pt-1">
                      <span>Status:</span>
                      <span
                        className={`font-semibold ${data.is_active ? "text-emerald-600" : "text-neutral-400"}`}
                      >
                        {data.is_active ? "Active & Visible" : "Hidden"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Background Asset Preview & Dropzone */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-2xs space-y-4">
              <div className="border-b border-neutral-100 pb-3 flex justify-between items-center">
                <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Hero Background Asset
                </h2>
                <span className="text-[10px] bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded font-mono">
                  1920x1080
                </span>
              </div>

              {/* Active Image Preview */}
              <div className="relative w-full h-[220px] rounded-xl overflow-hidden border border-neutral-200 group bg-neutral-100">
                {heroData?.heroBg && (
                  <Image
                    src={heroData.heroBg}
                    alt="Hero Background Preview"
                    fill
                    unoptimized={true}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-white text-[11px] font-medium">
                    Active Background Preview
                  </span>
                </div>
              </div>

              {/* React Dropzone Upload Container */}
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all ${
                  isDragActive
                    ? "border-neutral-900 bg-neutral-50"
                    : "border-neutral-200 hover:border-neutral-400 bg-neutral-50/50"
                }`}
              >
                <input {...getInputProps()} />
                <div className="space-y-1">
                  <p className="text-[11px] font-semibold text-neutral-700">
                    {isDragActive
                      ? "Drop the image here..."
                      : "Drag & drop background image here"}
                  </p>
                  <p className="text-[10px] text-neutral-400">
                    or click to browse from your device
                  </p>
                </div>
              </div>
            </div>

            {/* Micro Feature Context Widget */}
            <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-2xs space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                Active Component Cards
              </h3>
              <p className="text-[11px] text-neutral-400">
                Listed featured cards mapped onto this layout:
              </p>
              <div className="space-y-2 pt-1">
                {heroData?.cards?.map((card, idx) => (
                  <div
                    key={card._id || idx}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-neutral-50 border border-neutral-100 text-xs"
                  >
                    <span className="font-semibold text-neutral-700">
                      {card.title}
                    </span>
                    <span className="text-neutral-500 font-mono">
                      {card.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
