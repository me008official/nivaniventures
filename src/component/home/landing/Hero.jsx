"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Hero() {
  const [ftactive, SetFtActive] = useState(1);
  const [ftsrc, setFtsrc] = useState("");
  // Track direction: 1 for right-to-left, -1 for left-to-right
  const [[page, direction], setPage] = useState([1, 0]);

  const feature = [
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
  ];

  useEffect(() => {
    if (feature[0]?.feturesrc) {
      setFtsrc(feature[0].feturesrc);
    }
  }, []);

  const handelShift = (id, src) => {
    const newDirection = id > ftactive ? 1 : -1;
    SetFtActive(id);
    setFtsrc(src);
    setPage([id, newDirection]);
  };

  // Find current active product data for the card layout
  const currentProduct = feature.find((f) => f.id === ftactive) || feature[0];

  // Slide Variants for Framer Motion (Unchanged)
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 150 : -150,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 150 : -150,
      opacity: 0,
      scale: 0.9,
    }),
  };

  return (
    <section className="hero-container rounded-t-[30px] md:rounded-t-[50px] mt-[75px] relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden py-12 lg:py-0">
      {/* Background Image Setup */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/landing-src/nivini-mountain-bg.jpg"
          alt="Nivini Mountain Background"
          fill
          priority
          className="object-cover object-center"
        />
        {/* <div className="absolute inset-0 bg-black/30" /> */}
      </div>

      <div className="hero-main flex flex-col  lg:flex-row justify-between items-center relative z-10 max-w-[1300px] w-full px-4 md:px-8 text-start text-white gap-10 lg:gap-6">
        
        {/* Left Text Content */}
        <div className="hero-dt max-w-xxl">
          <h1 className="bricolage-text text-3xl sm:text-4xl md:text-6xl mb-6 tracking-tight leading-tight">
            <span> Weare <span className="playwrite-text">Nature</span> Create Better</span>
            <span className="block mt-1">Life Sustainably</span>
          </h1>
          <div className="header-action-bt flex flex-wrap gap-4">
            <div className="explore-b">
              <button className="bg-black border border-black text-white py-3 px-6 rounded-full cursor-pointer hover:bg-neutral-800 transition-colors">
                Explore Product
              </button>
            </div>
            <div className="custome-b">
              <button className="bg-transparent border border-white text-white py-3 px-6 rounded-full cursor-pointer hover:bg-white/10 transition-colors">
                Customize Your Product
              </button>
            </div>
          </div>
        </div>

        {/* Right Feature Card with Shopping Product UI & Motion Animation */}
        <div className="hero-feture w-full sm:w-fit h-fit flex flex-col justify-center items-center gap-4">
          <div className="hero-ft-section w-full sm:w-[280px] h-[380px] sm:h-[350px] bg-[#ffffff75] rounded-2xl overflow-hidden relative border border-white/10 backdrop-blur-3xl shadow-xl flex items-center justify-center">
            <AnimatePresence mode="popLayout" custom={direction}>
              {ftsrc && (
                <motion.div
                  key={ftactive}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                  className="absolute inset-0 w-full h-full flex flex-col justify-between p-4 text-neutral-900"
                >
                  {/* Product Image Area */}
                  <div className="relative w-full h-[65%] bg-neutral-100 rounded-xl overflow-hidden flex items-center justify-center p-2">
                    <Image
                      src={ftsrc}
                      alt={currentProduct.title}
                      className="object-contain rounded-sm"
                      fill
                      sizes="280px"
                    />
                    <span className="absolute top-3 left-3 bg-black/70 text-white text-[10px] font-medium px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {currentProduct.label}
                    </span>
                  </div>

                  {/* Product Details Area */}
                  <div className="flex flex-col justify-between h-[30%] pt-2">
                    <div>
                      <h3 className="font-bold text-base text-neutral-900 truncate">
                        {currentProduct.title}
                      </h3>
                      <p className="text-xs text-neutral-500 mt-0.5">
                        Eco-friendly & sustainable collection
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-lg text-black">
                        {currentProduct.price}
                      </span>
                      <button className="bg-black text-white text-xs font-medium py-2 px-4 rounded-full hover:bg-neutral-800 transition-colors cursor-pointer">
                        View Product
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Feature Selector Buttons */}
          <div className="feature-action-bt bg-[#ffffff70] backdrop-blur-[500px] p-2 rounded-full w-fit flex flex-wrap justify-center gap-2 text-sm">
            {feature.map((ft) => (
              <button
                key={ft.id}
                className={`py-2 px-4 rounded-full cursor-pointer transition-all duration-300 ${
                  ftactive === ft.id
                    ? "bg-black text-white shadow-md"
                    : "bg-white text-black hover:bg-neutral-200"
                }`}
                onClick={() => handelShift(ft.id, ft.feturesrc)}
              >
                {ft.label}
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}